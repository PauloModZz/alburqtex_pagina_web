# Mejoras — revisión completa del sitio (modo /loop autónomo)

> El dueño pidió: "revisa toda la página, qué se puede mejorar/agregar/
> cambiar, ponte en los zapatos de los clientes, agrega efectos, organiza
> bien" — mientras dure el presupuesto de esta sesión. Este archivo es la
> lista viva entre vueltas del loop (por si el contexto se compacta).

## Cómo retomar
Lee este archivo, toma el primer bloque con casillas sin marcar, hazlo
completo (código + verificación en navegador), márcalo, sigue al siguiente.
Si todo está marcado, haz una pasada nueva de revisión visual y agrega
bloques nuevos aquí antes de implementarlos.

## Iteración 1 — efectos de entrada + navegación consistente ✅ HECHO

- [x] `src/lib/useInView.ts` + `src/components/layout/Reveal.tsx` (fade+up
      al entrar en viewport), respeta `prefers-reduced-motion`, sin
      librería nueva (IntersectionObserver nativo).
- [x] Aplicado a: `AboutSection` (stats y técnicas, escalonado),
      `ClientsSection`, `CommentsSection` (tarjetas escalonadas),
      tarjetas de `/galeria`, `/blog` (destacado + grilla), `/clientes`
      (logos + testimonios). `/guia-de-tallas` se dejó sin animar a
      propósito — es una herramienta de consulta rápida, el movimiento
      estorbaría más de lo que ayuda.
- [x] `SiteNav` (botón fijo ☰ arriba a la derecha) agregado también a
      `CartPage`, `AccountPage`, `AuthPage` — sin choque, esas pantallas no
      tenían nada en esa esquina.
- [x] `CatalogPage` recibió una versión **integrada** del mismo menú
      (`InlineNavMenu`, mismos 6 enlaces desde `src/data/navLinks.ts`) en
      vez del botón flotante, para no chocar con los íconos de cuenta/
      carrito que ya tenía ahí — verificado con captura, sin superposición.
- [x] `tsc -b` limpio, `oxlint` sin advertencias nuevas, verificado en
      navegador (scroll real, menú de catálogo abre/cierra/navega bien).

## Iteración 2 — accesibilidad de teclado + móvil + fricción del camino real

- [ ] Revisar estados de foco visibles (accesibilidad teclado) en botones
      nuevos: `SiteNav`, `InlineNavMenu`, acordeón FAQ, lightbox de
      galería, selector cm/pulgadas.
- [ ] Revisar consistencia de hover en tarjetas de todas las secciones
      (nuevas y viejas) — que todas dupliquen el mismo lenguaje visual.
- [ ] Revisar experiencia móvil real (viewport 360–390px) de las 5
      secciones nuevas + `SiteNav`/`InlineNavMenu`: ¿el panel del menú se
      sale de la pantalla en móvil angosto? ¿el botón flotante de
      WhatsApp choca con `SiteNav` en alguna página?
- [ ] Recorrido real de cliente: Inicio → Catálogo → Agregar al pedido →
      Carrito → Login/Registro → Confirmar pedido. Anotar cualquier paso
      que se sienta lento, confuso, o con muy poco feedback visual.
- [ ] Revisar si el bloque "Casos de éxito" de `/clientes` (que hoy es
      puro `{{DATO_PENDIENTE}}`) necesita un tratamiento visual mejor
      mientras no hay contenido real, similar al arreglo que ya se le hizo
      al bloque de cifras.

## Iteración 3 (a definir tras iteración 2)

## Ideas capturadas para más adelante (evaluar antes de implementar)
- Animar los bloques de texto largo del blog al hacer scroll — **con
  cautela**: en lectura larga el movimiento puede estorbar más que ayudar,
  se dejó fuera a propósito en esta pasada por la misma razón que
  `/guia-de-tallas`.
- `InlineNavMenu` (en `CatalogPage.tsx`) duplica la lógica de apertura/
  cierre de `SiteNav.tsx` — si en el futuro aparece un tercer caso así,
  vale la pena extraer un hook compartido (`useDropdown`) en vez de seguir
  copiando el patrón.
