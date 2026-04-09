/**
 * testimonials.ts — Datos tipados para la sección de prueba social.
 * Cafe-premium / TORRË — Tarea 8
 */

export interface Testimonial {
  id: string
  quote: string
  name: string
  city: string
}

export interface Metric {
  id: string
  /** Valor numérico final para el counter animado */
  value: number
  /** Texto que aparece antes del número, ej. "+" */
  prefix?: string
  /** Texto que aparece después del número, ej. "/5" o "%" */
  suffix?: string
  /** Etiqueta debajo del número */
  label: string
  /** Decimales a mostrar durante la animación */
  decimals?: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Desde que probé TORRË no puedo volver al café de supermercado. El Huila Supremo es otra cosa — lo sentís desde que abrís la bolsa.',
    name: 'María L.',
    city: 'Buenos Aires',
  },
  {
    id: 't2',
    quote:
      'Pedí el pack de degustación para la oficina y ahora todo el equipo está enganchado. El envío llegó en un día.',
    name: 'Tomás R.',
    city: 'Córdoba',
  },
  {
    id: 't3',
    quote:
      'Me encanta que puedo comprar cuando quiero sin estar atada a una suscripción. Y la frescura se nota en cada taza.',
    name: 'Laura S.',
    city: 'Rosario',
  },
]

export const metrics: Metric[] = [
  {
    id: 'm1',
    value: 3200,
    prefix: '+',
    label: 'clientes',
  },
  {
    id: 'm2',
    value: 7,
    label: 'orígenes',
  },
  {
    id: 'm3',
    value: 4.9,
    suffix: '/5',
    label: 'rating',
    decimals: 1,
  },
  {
    id: 'm4',
    value: 2019,
    label: 'desde',
  },
]
