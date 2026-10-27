# La Cesta Familiar · cómo publicarla

Son tres partes: **Firebase** (guarda las listas y gestiona las cuentas), **GitHub** (aloja la web gratis) y **el móvil** (instalarla como app). Tardarás unos 20 minutos la primera vez. Todo es gratuito.

Archivos de esta carpeta:

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app |
| `firebase-config.js` | **El único que tienes que editar**: los datos de tu proyecto de Firebase |
| `firestore.rules` | Reglas de seguridad para copiar en Firebase |
| `manifest.webmanifest`, `sw.js`, `icons/` | Lo que permite instalarla en el móvil y abrirla sin conexión |

---

## 1. Firebase

### 1.1 Crear el proyecto
1. Entra en **https://console.firebase.google.com** con tu cuenta de Google.
2. Pulsa **«Crear un proyecto»**, ponle de nombre `la-cesta` y continúa. Puedes desactivar Google Analytics, no hace falta.

### 1.2 Registrar la app web
1. En la página del proyecto, pulsa el icono **`</>`** («Web»).
2. Ponle de apodo `La Cesta` y pulsa **«Registrar app»**. No marques Firebase Hosting.
3. Aparecerá un bloque de código con `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`. Cópialo.
4. Abre `firebase-config.js` con cualquier editor de texto (el Bloc de notas sirve) y sustituye los valores de ejemplo por los tuyos. Debe quedar así, con tus datos:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIzaSy…",
  authDomain: "la-cesta-xxxxx.firebaseapp.com",
  projectId: "la-cesta-xxxxx",
  storageBucket: "la-cesta-xxxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef…"
};
```

> Estos datos **no son secretos**: cualquier web de Firebase los lleva a la vista. Lo que protege vuestras listas son las reglas del paso 1.4.

### 1.3 Activar el inicio de sesión
1. Menú de la izquierda: **Compilación › Authentication › Comenzar**.
2. Pestaña **«Método de inicio de sesión»**:
   - **Google** → Habilitar → elige tu correo como «correo de asistencia» → Guardar.
   - **Correo electrónico/contraseña** → Habilitar (solo la primera opción) → Guardar.

### 1.4 Crear la base de datos y poner las reglas
1. Menú: **Compilación › Firestore Database › Crear base de datos**.
2. Ubicación: elige una de Europa, por ejemplo **`eur3 (Europe)`** o **`europe-west1 (Bélgica)`**. *No se puede cambiar después.*
3. Elige **«Iniciar en modo de producción»** y crea la base de datos.
4. Ve a la pestaña **«Reglas»**, borra todo lo que haya, pega el contenido completo de `firestore.rules` y pulsa **«Publicar»**.

---

## 2. GitHub Pages

### 2.1 Subir los archivos
1. Crea una cuenta en **https://github.com** si no tienes.
2. Arriba a la derecha, **«+» › New repository**:
   - Nombre: `la-cesta`
   - Visibilidad: **Public** (GitHub Pages gratis necesita repositorio público; tus datos no están ahí, están en Firebase).
   - Pulsa **«Create repository»**.
3. En la página del repositorio, pulsa **«uploading an existing file»** (o **Add file › Upload files**).
4. Arrastra **todo el contenido de esta carpeta** (no la carpeta en sí ni el .zip): `index.html`, `firebase-config.js` ya editado, `sw.js`, `manifest.webmanifest`, `firestore.rules`, `LEEME.md`, `.nojekyll` y la carpeta `icons`.
   - Si `.nojekyll` no aparece al arrastrar, no pasa nada.
5. Abajo, pulsa **«Commit changes»**.

### 2.2 Activar la web
1. En el repositorio: **Settings › Pages**.
2. En «Build and deployment», **Source: Deploy from a branch**, rama **`main`** y carpeta **`/ (root)`** → **Save**.
3. Espera 1 o 2 minutos y recarga: arriba aparecerá la dirección, del tipo
   **`https://TU-USUARIO.github.io/la-cesta/`**

### 2.3 Autorizar esa dirección en Firebase (imprescindible para entrar)
1. Firebase › **Authentication › Configuración › Dominios autorizados › Añadir dominio**.
2. Escribe **`TU-USUARIO.github.io`** (solo eso, sin `https://` ni `/la-cesta`) y añádelo.

Abre tu dirección, entra con Google y crea tu primer espacio. 🎉

---

## 3. Instalarla en el móvil

**Android (Chrome):** abre la dirección → menú **⋮** → **«Instalar aplicación»** (o «Añadir a pantalla de inicio»). También puedes usar el aviso «Instálala en el móvil» dentro de la app.

**iPhone (Safari):** abre la dirección **en Safari** → botón **Compartir** (cuadrado con flecha) → **«Añadir a pantalla de inicio»**.

> En iPhone, si al entrar con Google desde la app instalada se queda en blanco o no vuelve, usa **«Crear una cuenta nueva»** con correo y contraseña. Funciona siempre.

### Invitar a la familia
Dentro de un espacio, pulsa **Invitar** y mándales el enlace por WhatsApp. Al abrirlo entran con su cuenta (de Google o con correo) y quedan unidos a ese espacio. Cada uno puede instalarla en su móvil igual que tú.

---

## Cambios y actualizaciones
- Si me pides cambios, te daré un `index.html` nuevo. Súbelo a GitHub igual que antes (Add file › Upload files, sustituye el anterior).
- Después, abre `sw.js` en GitHub (icono del lápiz) y **sube el número de versión** (`la-cesta-v1` → `la-cesta-v2`). Así los móviles que la tienen instalada se actualizan solos la próxima vez que la abran.

## Seguridad y límites
- Cada espacio solo lo pueden ver y modificar sus miembros. Para entrar hace falta el código de invitación de ese espacio.
- Si alguien deja de ser de confianza: quien creó el espacio puede borrarlo y crear otro con un código nuevo.
- El plan gratuito de Firebase (Spark) permite unas 50.000 lecturas y 20.000 escrituras al día y 1 GB de datos: de sobra para una familia.
- Lo que hiciste en el **modo prueba** se quedó en el navegador donde lo probaste y no pasa a Firebase.

## Si algo no funciona
| Lo que ves | Qué hacer |
|---|---|
| «Modo prueba… todavía no está conectada a Firebase» | `firebase-config.js` sigue con los datos de ejemplo o no se ha subido. |
| «Esta web no está autorizada en Firebase» | Falta el paso 2.3. |
| «Este método de entrada no está activado» | Falta activar Google o Correo en el paso 1.3. |
| «No se pueden cargar los espacios» o no se guarda nada | Revisa que publicaste las reglas (paso 1.4). |
| Ves la versión antigua en el móvil | Sube el número de versión de `sw.js` y cierra y abre la app. |
