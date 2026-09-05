# Contenido del sitio

Todo el texto editable del sitio vive en esta carpeta, separado de los
componentes visuales — para cambiar un texto no hace falta tocar ningún
archivo `.tsx`, solo el `.ts` correspondiente de aquí. Son archivos
TypeScript (no JSON suelto) a propósito: si borras una coma o dejas un
campo obligatorio vacío, el proyecto avisa al compilar (`npm run build`) en
vez de fallar en silencio ya publicado.

| Archivo | Qué contiene | Se usa en |
|---|---|---|
| `faq.ts` | Preguntas frecuentes, agrupadas por categoría | `/preguntas-frecuentes` |
| `galeria.ts` | Fichas de trabajos de la galería | `/galeria` |
| `tallas.ts` | Tablas de tallas por tipo de prenda | `/guia-de-tallas` |
| `tejidos.ts` | Comparativa de tejidos y ubicaciones de bordado | `/guia-de-tallas` |
| `clientes.ts` | Logos de clientes reales | `/clientes` y el inicio |
| `blog.ts` y `blogExpansion.ts` | Artículos de bordado, estampado, sublimación y confección | `/blog` |
| `products.ts` | Ya existía — productos del carrusel del inicio | Inicio |
| `catalog.ts` | Ya existía — catálogo de productos | `/catalogo` |
| `legal.ts` | Ya existía — términos, privacidad, cookies | `/legal` |

## Cómo agregar una pregunta a las FAQ

Abre `faq.ts`, busca el array `FAQ_CATEGORIES`, entra a la categoría que
corresponda y agrega un objeto nuevo a su `items`:

```ts
{
  id: 'un-id-unico-en-minusculas-con-guiones',
  question: '¿Tu pregunta?',
  answer: 'Tu respuesta completa.',
}
```

El `id` se vuelve la URL directa a esa pregunta
(`/preguntas-frecuentes#un-id-unico...`), así que evita cambiarlo una vez
publicado si ya lo compartiste en algún lado.

## Cómo agregar un trabajo a la galería

En `galeria.ts`, agrega un objeto al array `GALLERY_PIECES` con el mismo
formato que los que ya existen. El campo `fotoReal` debe quedar en `false`
hasta que subas la foto real con el nombre exacto indicado en
`imagenPendienteNombre` (ver `imagenes-pendientes.md` en la raíz del
proyecto) — ahí sí, cambia `fotoReal` a `true`.

## Cómo agregar un artículo al blog

En `blog.ts`, agrega un objeto al array `BLOG_POSTS`. El `cuerpo` es una
lista de bloques — usa los que ya usan los artículos existentes como
plantilla:

- `{ type: 'p', text: '...' }` — un párrafo.
- `{ type: 'h2', text: '...', id: '...' }` — un subtítulo (aparece también
  en el índice flotante del artículo).
- `{ type: 'ul', items: ['...', '...'] }` — una lista.
- `{ type: 'callout', kind: 'consejo' | 'advertencia' | 'dato', text: '...' }`
  — un bloque destacado de aviso.
- `{ type: 'table', headers: [...], rows: [[...], [...]] }` — una tabla.
- `{ type: 'link', label: '...', description: '...', href: '/ruta' }` — un
  enlace destacado hacia otra sección del sitio.

No olvides sumar la nueva URL a `public/sitemap.xml` (una línea, mismo
formato que las que ya están).

## Cómo aprobar/rechazar un comentario (testimonio)

Los comentarios NO se editan aquí — viven en Firestore, no en el código.
Entra a la consola de Firebase → Firestore Database → colección
`comentarios`. Cada uno tiene `status: "pendiente"` al llegar. Cámbialo a
`"aprobado"` para que se publique (aparece automáticamente en el inicio y
en `/clientes`); si es spam o inapropiado, simplemente no lo apruebes o
bórralo.
