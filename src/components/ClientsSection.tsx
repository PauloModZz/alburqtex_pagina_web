import { CLIENTS } from '../data/clientes';
import Reveal from './layout/Reveal';

export default function ClientsSection() {
  return (
    <section
      className="w-full border-t"
      style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(0,0,0,0.06)', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <p
          className="text-xs font-semibold uppercase text-black/40 text-center mb-8"
          style={{ letterSpacing: '0.18em' }}
        >
          Confían en nosotros
        </p>
        <Reveal className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              title={client.name}
              className="flex items-center justify-center bg-white rounded-xl border p-3.5 transition-transform duration-200 hover:scale-105"
              style={{ borderColor: 'rgba(0,0,0,0.06)', width: 128, height: 128 }}
            >
              <img
                src={client.img}
                alt={client.name}
                loading="lazy"
                className="max-w-full max-h-full object-contain rounded-md"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
