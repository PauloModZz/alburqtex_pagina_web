# Guía de configuración — Alburqtex

Este proyecto tiene dos partes:

1. **La página pública** (hero, catálogo, nosotros, ubicación, legal): ya funciona
   completa, sin configuración adicional. Puedes iniciarla con `npm run dev`.
2. **Cuentas de usuario y pedidos** (registro, login, "Agregar al pedido", "Mi
   cuenta"): necesitan que conectes un proyecto gratuito de
   [Firebase](https://firebase.google.com) (autenticación + base de datos).
   Sin este paso, esas pantallas muestran un aviso de "todavía no está
   conectado" en vez de romperse.

**Importante:** este proyecto debe usar un **proyecto de Firebase nuevo y
separado** del que ya usa tu Cotizador (`pagina-web-59681`) — así los
pedidos de clientes de la web pública nunca quedan mezclados con tu Caja,
Clientes ni Pedidos internos. Si más adelante quieres conectarlos (por
ejemplo, que un pedido de la web aparezca directo en tu Dashboard), avísame
y lo planeamos con cuidado — hoy las reglas de tu proyecto interno permiten
que cualquier usuario logueado lea/escriba todo, lo cual no es seguro para
clientes públicos sin antes reescribir esas reglas.

Sigue estos pasos en orden.

## 1. Crear el proyecto en Firebase

1. Entra a la [consola de Firebase](https://console.firebase.google.com) y
   haz clic en "Agregar proyecto". Ponle un nombre distinto al que ya usas
   (ej. `alburqtex-web`).
2. Cuando te pregunte por Google Analytics, puedes desactivarlo (no hace
   falta para este sitio).
3. Dentro del proyecto: ícono `</>` ("Agregar app" → Web) → ponle un
   apodo (ej. "alburqtex-web") → **no** hace falta marcar Firebase Hosting
   todavía → Registrar app. Te va a mostrar un bloque `firebaseConfig`.

## 2. Copiar tus llaves al proyecto

1. Copia los valores del `firebaseConfig` que te mostró Firebase.
2. En la carpeta del proyecto, copia `.env.example` a un archivo nuevo
   llamado `.env` y pega ahí los valores (cada campo del `firebaseConfig`
   corresponde a una variable):

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=alburqtex-web.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=alburqtex-web
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

3. Reinicia `npm run dev` si ya lo tenías corriendo (las variables de
   entorno solo se leen al arrancar).

**Nunca subas el archivo `.env`** a git ni lo compartas — ya está en
`.gitignore`.

## 3. Activar Authentication

En la consola de Firebase → **Build → Authentication → Get started**:

- **Email/contraseña**: actívalo (pestaña "Sign-in method") → activa el
  switch → Guardar. Es el proveedor principal — el registro pide usuario,
  correo y teléfono, y la persona puede iniciar sesión con cualquiera de
  los tres (por dentro, los tres siempre usan el correo + contraseña de
  Firebase; usuario/teléfono son solo "atajos" que la propia web resuelve
  antes de entrar). La web ya valida que la contraseña tenga mínimo 8
  caracteres con letra y número.
- **Google** (opcional): actívalo igual, elige un correo de soporte,
  Guardar. El botón "Continuar con Google" ya está en la web y funciona en
  cuanto lo actives aquí — no requiere nada más.

## 4. Crear la base de datos (Firestore)

1. **Build → Firestore Database → Create database** → modo producción →
   elige una región (ej. `us-central` o la más cercana disponible).

**Nota sobre los logos:** Firebase Storage (para guardar archivos subidos)
ahora exige activar el plan de pago Blaze incluso para uso gratuito, así que
esta web **no sube archivos** — el cliente solo marca "quiero logo
personalizado" al hacer su pedido, y el archivo se coordina directo por
WhatsApp contigo. Cero costo, cero plan de pago necesario.

2. Instala la herramienta de línea de comandos de Firebase (una sola vez en
   tu computadora):

```
npm install -g firebase-tools
firebase login
```

3. Desde la carpeta de este proyecto, conéctalo a tu proyecto de Firebase:

```
firebase use --add
```

Elige el proyecto que creaste (`alburqtex-web` o como lo hayas llamado).

4. Publica las reglas de seguridad y los índices que ya están en este
   proyecto (`firestore.rules`, `firestore.indexes.json`):

```
firebase deploy --only firestore:rules,firestore:indexes
```

Esto es lo que hace que cada cliente solo pueda ver y crear sus propios
pedidos — nadie más.

## 5. Protección anti-bots (App Check + captcha visible)

1. En la consola de Firebase → **Build → App Check** → registra tu app web
   → proveedor **reCAPTCHA v3** → te pedirá una site key de
   [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create)
   (crea una ahí, tipo v3, con tu dominio).
2. Pega esa site key en tu `.env`:

```
VITE_RECAPTCHA_SITE_KEY=6Lc...
```

Con esto, Firebase protege automáticamente el login/registro/pedidos
contra bots, sin que el usuario vea nada raro (funciona en segundo plano).

3. Para el aviso visible que pediste ("captcha a partir del 3er intento
   fallido de login"), crea también una cuenta gratis en
   [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile),
   "Add site" → copia el **Site Key** y pégalo en tu `.env`:

```
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAA...
```

Sin este paso, el login funciona igual, solo que sin ese aviso adicional.
Firebase Authentication ya aplica por su cuenta límites y demoras
progresivas ante intentos repetidos de una misma IP, aunque no configures
esto.

**Protección por intentos fallidos (ya integrada, se activa con el paso 4):**
al equivocarse la contraseña, la web cuenta los intentos por cuenta
(guardado en Firestore, colección `loginAttempts` — ya incluida en
`firestore.rules`):
- **3 intentos** → pide completar el captcha visible de arriba.
- **5 intentos** → bloquea esa cuenta 5 minutos.
- **10 intentos** → bloquea 15 minutos y envía automáticamente un correo
  para restablecer la contraseña.

Mientras no hayas creado la base de datos de Firestore (paso 4), esta
protección extra simplemente no aplica — el login sigue funcionando normal,
solo sin este nivel adicional, así nunca se queda "colgado" esperando algo
que no existe todavía.

## 6. Aviso por correo de pedidos nuevos

Cada vez que alguien completa un pedido en la web, te llega un correo a
**paulo.abad10200@gmail.com** con el nombre, correo, teléfono de contacto y
el detalle del pedido. Esto usa [EmailJS](https://www.emailjs.com) (gratis
hasta 200 correos/mes), que envía el correo directo desde el navegador del
cliente — no necesita servidor propio.

1. Crea una cuenta gratis en [emailjs.com](https://www.emailjs.com).
2. **Email Services → Add New Service** → conecta tu Gmail
   (`paulo.abad10200@gmail.com`) → esto es de **donde** salen los correos.
3. **Email Templates → Create New Template**. En el campo **"To Email"**
   pon `paulo.abad10200@gmail.com` (así es como se asegura que SIEMPRE
   llega a tu correo, sin importar quién hizo el pedido). En el cuerpo del
   mensaje usa estas variables (haz clic para insertarlas o escríbelas
   así):

```
Nuevo pedido de {{client_name}} ({{client_username}})
Correo: {{client_email}}
Teléfono: {{client_phone}}
Fecha: {{order_date}}

Productos:
{{order_items}}

Notas del cliente:
{{order_notes}}

Total estimado: {{order_total}}
```

4. Guarda la plantilla y copia su **Template ID**.
5. Ve a **Account → General** y copia tu **Public Key**.
6. Copia el **Service ID** (de tu servicio de Gmail creado en el paso 2).
7. Pega los tres en tu `.env`:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

Sin este paso, los pedidos se guardan igual de bien — solo no te llega el
aviso por correo hasta que lo configures.

### 6.1 Confirmación por correo AL CLIENTE (opcional)

Además del aviso que te llega a ti, puedes activar un segundo correo que se
le envía automáticamente al cliente confirmándole que su pedido fue
recibido. Es una **plantilla nueva y separada** en el mismo EmailJS (mismo
servicio de Gmail del paso 2), con un tono distinto: mensaje de
confirmación para el cliente, no aviso interno para ti.

1. **Email Templates → Create New Template** (una segunda, aparte de la del
   paso 6).
2. En el campo **"To Email"** esta vez pon `{{client_email}}` (con llaves,
   tal cual) en vez de tu correo — así cada plantilla le llega a quien hizo
   ese pedido, no a ti.
3. Cuerpo sugerido (mismas variables que la plantilla del paso 6):

```
Hola {{client_name}},

¡Gracias por tu pedido en Alburqtex! Ya lo recibimos y lo estamos revisando.

Resumen de tu pedido ({{order_date}}):
{{order_items}}

Notas: {{order_notes}}
Total estimado: {{order_total}}

Nos pondremos en contacto contigo al {{client_phone}} o por WhatsApp para
coordinar el pago (abono del 50% para iniciar producción) y los detalles
finales.

— Alburqtex
```

4. Guarda la plantilla y copia su **Template ID** (será distinto al del
   paso 6).
5. Pégalo en tu `.env`:

```
VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_yyyyyyy
```

Sin este paso, todo sigue funcionando igual — solo que el cliente no recibe
su propia copia de confirmación, únicamente tú.

## 7. Publicar la página (hosting)

Como ya estás en el ecosistema de Firebase, lo más simple es usar
**Firebase Hosting** (gratis para este tipo de sitio):

```
npm run build
firebase deploy --only hosting
```

Te da una URL gratis tipo `alburqtex-web.web.app`. Si compras un dominio
propio (ej. en [NIC.EC](https://www.nic.ec/) para `.ec`, o Namecheap/GoDaddy
para `.com`), lo conectas en la consola de Firebase → Hosting → "Agregar
dominio personalizado".

Recuerda que **cada vez que cambies algo del sitio** hay que repetir
`npm run build` + `firebase deploy --only hosting` para publicar la nueva
versión (el `npm run dev` de siempre solo sirve para verlo en tu
computadora mientras trabajas).

## Resumen de lo que ya funciona sin hacer nada

- Hero, catálogo completo, "Sobre nosotros", clientes, ubicación con mapa,
  cotizar por WhatsApp, y toda la sección legal.

## Resumen de lo que necesita los pasos de arriba

- Registro (usuario, correo, teléfono, contraseña) e inicio de sesión con
  cualquiera de los tres.
- "Agregar al pedido" con talla, nombre, aviso de logo personalizado y notas.
- "Mi cuenta" con historial de pedidos y cambio de contraseña.
- Aviso por correo a paulo.abad10200@gmail.com de cada pedido nuevo (paso 6).
- Correo de confirmación al cliente que hizo el pedido (paso 6.1, opcional).
