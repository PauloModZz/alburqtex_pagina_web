# Pendientes antes de publicar

Todo lo que sigue está marcado en el código con `{{DATO_PENDIENTE: ...}}` (en
textos visibles) o `pendienteRevision: true` / `es_ejemplo` (en archivos de
datos) — nada de esto se inventó, y nada de esto bloquea que el sitio
funcione hoy: donde falta un dato, el texto explica que se confirma por
WhatsApp, o el bloque simplemente no se muestra (como los testimonios, que
no aparecen hasta que haya comentarios reales aprobados).

## 1. Urgente — afecta lo que un cliente real puede leer hoy

- **Medidas de tallas y ubicaciones de bordado**
  Archivos: `src/data/tallas.ts`, `src/data/tejidos.ts` (campo `medidaMaxima`
  en `UBICACIONES_BORDADO`).
  Sembré valores estándar de la industria (tallas S–XXL típicas, medidas
  máximas de bordado usuales) para que la página no esté vacía, pero
  **debes confirmarlas contra tus prendas y proveedor reales** antes de que
  alguien pida una talla basándose en esta tabla. Busca `pendienteRevision`
  para encontrar cada bloque exacto.

## 2. Importante — fortalece la página pero no rompe nada mientras falte

- **Fotos reales de trabajos terminados**
  Ver `imagenes-pendientes.md` — 14 fotos, con nombre de archivo exacto y
  qué debe mostrar cada una. La más importante de todas es la de "macro de
  puntada" (primer plano bien cerca de una puntada), es la que más
  diferencia a un taller bueno en la percepción de alguien que nunca te ha
  visto trabajar.

- **Cifras de confianza y casos de éxito**
  Archivo: `src/components/clients/ClientsPage.tsx` (bloque de estadísticas
  y sección "Casos de éxito"). Años de experiencia, prendas bordadas al
  año, % de clientes recurrentes, y 1–3 casos reales con estructura
  "reto → qué hicimos → resultado". No se inventó ningún número.

- **Testimonios reales**
  No hace falta tocar ningún archivo — en cuanto apruebes comentarios desde
  la consola de Firebase (colección `comentarios`, cambiar `status` de
  `pendiente` a `aprobado`), aparecen solos tanto en el inicio como en
  `/clientes`, con su calificación promedio.

## 3. Cuando tengas tiempo — pulido, no bloquea nada

- **Horario de atención y teléfono público**
  No se usó en ningún lado porque no estaba confirmado. Si quieres que
  aparezca (por ejemplo en el JSON-LD de `index.html`, que ayuda a que
  Google muestre horario/teléfono en el buscador), dime el dato y lo agrego.

- **Dominio propio**
  Todo el sitio usa por ahora `https://alburqtex-web.web.app` (tu URL real
  de Firebase Hosting) como dirección "oficial" para SEO. Cuando compres un
  dominio propio, se actualiza en un solo lugar: la constante `SITE_URL` en
  `src/lib/seo.ts`, más las URLs de `index.html` y `public/sitemap.xml`.

- **`public/sitemap.xml` es un archivo fijo, no automático**
  Si agregas un artículo nuevo al blog más adelante, hay que sumarle una
  línea a mano (o pedírmelo). No pasa nada si se te olvida — el sitio sigue
  funcionando igual, solo que Google tarda un poco más en encontrar esa
  página nueva por su cuenta.

## 4. Explícitamente fuera de esta pasada

- **Carta de hilos y colores** (sección 3.3 del encargo original) — la
  dejaste fuera a propósito ("eso te lo paso después"). No se creó
  `/carta-de-hilos` ni ningún archivo de datos de hilos.
