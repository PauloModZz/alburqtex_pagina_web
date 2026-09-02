import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../lib/useInView';

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

interface RevealProps {
  children: ReactNode;
  /** Milisegundos de retraso — útil para escalonar tarjetas en una grilla. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Aparición suave al entrar en pantalla (fade + subir 16px). Sin librería
 * nueva — IntersectionObserver nativo. Respeta prefers-reduced-motion: si
 * está activado, el contenido aparece directo, sin animar.
 */
export default function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const show = inView || prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        transition: prefersReducedMotion
          ? undefined
          : `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
