# Decisiones tomadas de forma autónoma

## Lo que se detectó al iniciar

- Stack: Vite + React 19 + TypeScript + Tailwind v4. Sin router, sin CMS, sin MDX.
  Estado de "vista" manejado a mano en `App.tsx` (un `useState<View>`).
- Contenido existente vive en `src/data/*.ts` (arrays tipados: `legal.ts`,
  `products.ts`, `catalog.ts`), no en una carpeta `/content/` aparte.
- Diseño: fondo crema `#FAF7F2`, negro `#141414`, dorado `#C9973F`, Anton para
  títulos, Inter para el resto, tarjetas `rounded-2xl` con borde suave,
  botones `rounded-full`. Patrón de encabezado con "Volver" ya establecido
  en `LegalPage.tsx`.
- No hay menú de navegación superior fijo — el patrón real del sitio es que
  el **Footer hace de navegación** (enlaces a legal) más botones "Volver" por
  página. Las secciones nuevas se enlazan ahí, no en una barra que no existe.
- Firebase Hosting ya tiene el rewrite `"source": "**" -> "/index.html"`
  configurado, así que rutas reales del lado del cliente van a funcionar bien
  incluso con recarga directa o enlace compartido.

## Decisiones de arquitectura

1. **Se agregó `react-router-dom`.** Es infraestructura de navegación, no una
   librería de interfaz — y sin URLs reales, la mitad del SEO que pide el
   encargo (canonical, sitemap, enlaces compartibles a preguntas puntuales,
   filtros de galería en la URL) es imposible de cumplir honestamente.
2. **Ninguna página existente se tocó por dentro.** `AppShell` (inicio,
   catálogo, carrito, cuenta, auth, legal) se montó completo bajo la ruta
   comodín `/*`, exactamente con el mismo comportamiento de antes. Las 5
   secciones nuevas son rutas reales y separadas: `/preguntas-frecuentes`,
   `/galeria`, `/guia-de-tallas`, `/clientes`, `/blog` y `/blog/:slug`.
3. Se agregó además `/legal` como puerta de entrada real por URL a la
   `LegalPage` que ya existía (sin modificarla), para que el Footer de las
   páginas nuevas pueda enlazar a los términos con una URL de verdad.
4. **Contenido en `src/data/`**, no en una carpeta `/content/` nueva —
   por consistencia con `legal.ts`/`products.ts`/`catalog.ts` que ya existen
   así. Son archivos `.ts` tipados (no `.json` suelto) para que un error de
   estructura truene en compilación, no en producción silenciosamente.
5. **No se instaló MDX ni un parser de Markdown.** El blog no existía en
   ningún formato antes; para no sumar una dependencia de build nueva solo
   para el blog, el contenido de cada artículo se escribe como bloques
   tipados (`{ type: 'p' | 'h2' | 'ul' | 'callout', ... }`) en
   `src/data/blog.ts`, documentado en `src/data/README.md`. Editar texto no
   requiere tocar componentes.
6. **SEO por página sin librería de metadata:** no hay Next/Remix con head
   por ruta, así que `src/lib/seo.ts` pone/quita a mano `<title>`,
   `description`, canonical y Open Graph al montar/desmontar cada página
   nueva, y `useJsonLd` inyecta/retira el `<script type="application/ld+json">`
   correspondiente.
7. **`SITE_URL` = `https://alburqtex-web.web.app`** (el dominio real y ya
   activo de Firebase Hosting de este proyecto), no un dominio inventado —
   el campo `DOMINIO` de los datos del negocio quedó como "estamos en eso".
   Cuando compren dominio propio, ese es el único valor que hay que cambiar
   (ver PENDIENTES.md).
8. **Carta de hilos y colores (sección 3.3) — excluida de esta pasada**, por
   instrucción explícita del dueño ("eso te lo paso después, no lo pongas
   ahora"). No se creó `/carta-de-hilos` ni `src/data/hilos.json`.
9. **Sección "Clientes y testimonios" reutiliza lo que ya existía**, no lo
   duplica: los logos de clientes reales de `ClientsSection.tsx` (Armada del
   Ecuador, Ejército, colegios, etc.) se reusan como la franja de logos, y el
   sistema de comentarios con moderación (`CommentsSection.tsx`,
   colección `comentarios` en Firestore) que ya se había construido en esta
   misma conversación se reutiliza como la fuente de testimonios reales
   ya aprobados — no se inventó una segunda estructura de datos de reseñas.
10. `lang="en"` → `lang="es"` en `index.html` (el sitio es 100% en español;
    esto es correcto para accesibilidad/SEO y no es un rediseño).
