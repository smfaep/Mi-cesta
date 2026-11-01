/* Service worker de La Cesta Familiar: permite abrir la app sin conexión.
   Sube el número de VERSION cada vez que cambies archivos para que los móviles se actualicen. */
const VERSION = "la-cesta-v2";
const SHELL = ["./", "index.html", "firebase-config.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon.png"];
const CDN = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  // La base de datos y el inicio de sesión siempre van directos a Google.
  if (!sameOrigin && !CDN.includes(url.hostname)) return;
  if (sameOrigin && url.pathname.includes("/__/")) return;

  if (sameOrigin && (req.mode === "navigate" || url.pathname.endsWith("firebase-config.js"))) {
    // Primero la red (para recibir actualizaciones); si no hay conexión, la copia guardada.
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  // Resto: la copia guardada al momento y se refresca por detrás.
  e.respondWith(caches.match(req).then(cached => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; })
      .catch(() => cached);
    return cached || net;
  }));
});
