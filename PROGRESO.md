# Progreso — 5 secciones nuevas

> La sección "Carta de hilos y colores" (3.3 del encargo original) se excluyó
> a pedido explícito del dueño ("eso te lo paso después"). No aparece abajo.

## 0. Base técnica
- [x] `react-router-dom` instalado, `App.tsx` con rutas nuevas sin tocar `AppShell`
- [x] `/legal` como URL real hacia la página legal existente
- [x] `src/lib/seo.ts` (title/description/canonical/OG por página) y JSON-LD
- [x] `DECISIONES.md`, `PROGRESO.md`
- [x] `lang="es"` + JSON-LD `LocalBusiness` global en `index.html`

## 1. Preguntas frecuentes — `/preguntas-frecuentes`
- [x] Datos: `src/data/faq.ts` (20 preguntas reales en 6 categorías; 4 con `{{DATO_PENDIENTE}}` puntual donde solo el dueño tiene la respuesta)
- [x] Buscador en vivo (filtra pregunta+respuesta)
- [x] Acordeón accesible por categorías (`<details>/<summary>` nativo, una abierta por defecto)
- [x] Anclas por pregunta + botón "copiar enlace" + auto-abre si llegas con #hash
- [x] JSON-LD `FAQPage` generado desde `FAQ_ALL_ITEMS`, no escrito a mano
- [x] CTA final a WhatsApp + botón flotante con mensaje propio de esta página

## 2. Galería de trabajos — `/galeria`
- [x] Datos: `src/data/galeria.ts`, 12 fichas variadas (prenda/técnica/sector) + macro
- [x] Placeholder propio inline (mismo patrón "Foto próximamente" que ya usa CatalogPage, sin bancos externos)
- [x] Grid masonry con filtros (prenda / técnica / sector) combinables y sincronizados a `?prenda=&tecnica=&sector=`
- [x] Lightbox accesible (flechas teclado, Esc, foco atrapado y devuelto al cerrar)
- [x] Bloque de macro de puntada
- [x] Comparador antes/después (pointer events = ratón+dedo, flechas/Home/End en teclado)
- [ ] `src/data/imagenes-pendientes.md` — se arma al final con todas las secciones juntas
- [x] JSON-LD `ImageGallery`/`ImageObject` (solo con los resultados filtrados visibles)

## 3. Guía de tallas y tipos de prenda — `/guia-de-tallas`
- [x] Datos: `src/data/tallas.ts` (9 prendas), `src/data/tejidos.ts`
- [x] Tabla por prenda, selector cm/pulgadas (pulgadas calculadas, no duplicadas), tarjetas en móvil
- [x] Diagrama SVG esquemático propio por prenda (3 siluetas base: camisa/gorra/mandil, con cotas por prenda)
- [x] "Cómo medirte bien" con JSON-LD `HowTo`
- [x] Comparativa de 8 tejidos (receptividad, gramaje, entretela, advertencias)
- [x] Mapa de 8 ubicaciones de bordado con medida máxima
- [x] Todas las medidas con `pendienteRevision: true` — ver PENDIENTES.md

## 4. Clientes y testimonios — `/clientes`
- [x] `src/data/clientes.ts` extraído de `ClientsSection` (mismo componente ahora lo importa de ahí, sin cambiar su comportamiento) + agrupado por sector con contador
- [x] `src/lib/useApprovedComments.ts` factorizado y reusado por `CommentsSection` y `ClientsPage` — testimonios 100% reales, cero estructura de datos falsa
- [x] Estado vacío elegante si todavía no hay comentarios aprobados
- [x] Casos de éxito y cifras de confianza como `{{DATO_PENDIENTE}}` explícito, nada inventado
- [x] JSON-LD `Review`/`AggregateRating` solo se inyecta si `comments.length > 0`

## 5. Blog — `/blog`, `/blog/:slug`
- [x] Datos: `src/data/blog.ts` (bloques tipados h2/p/ul/callout/table, sin MDX)
- [x] 8 artículos completos y reales (ver lista en el informe final)
- [x] Índice con filtro por categoría + destacado + "ver más"
- [x] Plantilla de artículo: TOC flotante desde los `h2`, callouts, CTA a mitad y al final, relacionados, compartir (WhatsApp + copiar enlace)
- [x] JSON-LD `Article` por artículo
- [x] Enlazado cruzado entre artículos vía `relacionados`
- [x] Enlaces reales (bloque `link`, no solo texto) entre blog↔FAQ, blog↔galería, blog↔tallas, blog↔clientes

## Transversal
- [x] `public/sitemap.xml` con las 15 rutas reales (nota: es estático — hay que sumarle la línea a mano si se agrega un artículo nuevo, ver PENDIENTES.md)
- [x] `public/robots.txt`
- [x] Botón flotante de WhatsApp con mensaje distinto por página (5 mensajes distintos)
- [x] CTA final distinto por sección (ninguna frase repetida literal)
- [x] Footer con columna "Explora" → las 5 secciones nuevas, en las páginas viejas y nuevas por igual

## Cierre
- [x] `tsc -b` limpio (verificado después de cada sección + al final)
- [x] `oxlint` sin advertencias nuevas (las 2 que salen son preexistentes, de antes de este trabajo)
- [x] `npm run build` de producción exitoso, con code-splitting por ruta para las 6 páginas nuevas
- [x] Recorrido real en navegador (Playwright) de las 8 rutas: título/h1/JSON-LD válido en cada una
- [x] Interacciones probadas: búsqueda y acordeón de FAQ, filtros+lightbox+Escape de galería, selector cm/pulgadas, enlaces cruzados FAQ↔blog↔galería↔tallas↔clientes
- [x] `PENDIENTES.md` e `imagenes-pendientes.md` completos, en la raíz del proyecto
- [x] Confirmado que Inicio/Catálogo/Carrito/Cuenta/Legal cargan y funcionan igual que antes
