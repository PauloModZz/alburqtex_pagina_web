import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Todavía no hay dominio propio comprado (ver PENDIENTES.md) — se usa la URL
// real y ya activa de Firebase Hosting para este proyecto
// (alburqtex-web), no un dominio inventado. Cuando compren un dominio
// propio, este es el único lugar que hay que actualizar.
const SITE_URL = 'https://alburqtex-web.web.app';
const SITE_NAME = 'Alburqtex';

export interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

/**
 * No hay librería de metadata (ni Next/Remix con head por ruta), así que esto
 * pone/quita a mano lo mínimo real de SEO por página: title, description,
 * canonical y Open Graph/Twitter. Se limpia solo al desmontar para no dejar
 * restos de una página en la siguiente.
 */
export function useSeo({ title, description, path, image }: SeoOptions) {
  const { isEnglish } = useLanguage();

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    const spanishPath = path.replace(/^\/en(?=\/|$)/, '') || '/';
    const englishPath = `/en${spanishPath === '/' ? '' : spanishPath}`;
    const url = `${SITE_URL}${isEnglish ? englishPath : spanishPath}`;
    const prevTitle = document.title;
    document.title = fullTitle;

    const tags: { selector: string; attrs: Record<string, string> }[] = [
      { selector: 'meta[name="description"]', attrs: { name: 'description', content: description } },
      { selector: 'link[rel="canonical"]', attrs: { rel: 'canonical', href: url } },
      { selector: 'meta[property="og:title"]', attrs: { property: 'og:title', content: fullTitle } },
      { selector: 'meta[property="og:description"]', attrs: { property: 'og:description', content: description } },
      { selector: 'meta[property="og:url"]', attrs: { property: 'og:url', content: url } },
      { selector: 'meta[property="og:type"]', attrs: { property: 'og:type', content: 'website' } },
      { selector: 'meta[property="og:locale"]', attrs: { property: 'og:locale', content: isEnglish ? 'en_US' : 'es_EC' } },
      { selector: 'link[rel="alternate"][hreflang="es"]', attrs: { rel: 'alternate', hreflang: 'es', href: `${SITE_URL}${spanishPath}` } },
      { selector: 'link[rel="alternate"][hreflang="en"]', attrs: { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}${englishPath}` } },
      { selector: 'link[rel="alternate"][hreflang="x-default"]', attrs: { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}${spanishPath}` } },
      { selector: 'meta[name="twitter:card"]', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { selector: 'meta[name="twitter:title"]', attrs: { name: 'twitter:title', content: fullTitle } },
      { selector: 'meta[name="twitter:description"]', attrs: { name: 'twitter:description', content: description } },
    ];
    if (image) {
      tags.push({ selector: 'meta[property="og:image"]', attrs: { property: 'og:image', content: image } });
      tags.push({ selector: 'meta[name="twitter:image"]', attrs: { name: 'twitter:image', content: image } });
    }

    const created: HTMLElement[] = [];
    const previousValues = new Map<string, string | null>();

    for (const { selector, attrs } of tags) {
      let el = document.head.querySelector<HTMLElement>(selector);
      if (!el) {
        el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
        document.head.appendChild(el);
        created.push(el);
      } else {
        const attrName = Object.keys(attrs)[0];
        previousValues.set(selector, el.getAttribute(attrName === 'rel' ? 'href' : 'content'));
      }
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    }

    return () => {
      document.title = prevTitle;
      created.forEach((el) => el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, isEnglish]);
}

/** Inyecta un bloque JSON-LD mientras el componente está montado y lo retira al salir. */
export function useJsonLd(id: string, data: object | null) {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [id, data]);
}

export { SITE_URL, SITE_NAME };
