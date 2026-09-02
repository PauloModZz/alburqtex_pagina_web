import { useEffect, useRef, useState } from 'react';

/** Se activa una sola vez cuando el elemento entra en el viewport — no se re-oculta al salir. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // Se observa una sola vez al montar — `options` es config fija por
    // llamada, no un valor reactivo que deba re-crear el observer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
