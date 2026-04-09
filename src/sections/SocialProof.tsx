import { motion } from 'framer-motion'
import { SectionWrapper, Heading } from '../components'
import TestimonialCard from '../components/TestimonialCard'
import MetricCounter from '../components/MetricCounter'
import { testimonials, metrics } from '../data/testimonials'

/**
 * SocialProof — Sección "Lo que dicen nuestros clientes"
 * Fondo: --section-social-bg (#2C1810)
 * Layout: métricas arriba (4 cols) + testimonios debajo (3 cols)
 * Tarea 8 — cafe-premium
 */
export default function SocialProof() {
  return (
    <SectionWrapper id="testimonios" bg="social" grain>
      {/* Eyebrow */}
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'var(--space-3)' }}
      >
        Prueba social
      </motion.p>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'var(--space-16)' }}
      >
        <Heading
          as="h2"
          style={{ color: 'var(--color-crema)' }}
        >
          Lo que dicen nuestros clientes
        </Heading>
      </motion.div>

      {/* Métricas — 4 columnas desktop / 2 columnas mobile */}
      <div
        role="list"
        aria-label="Métricas de TORRË"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-8) var(--space-6)',
          marginBottom: 'var(--space-20)',
        }}
        className="metrics-grid"
      >
        {metrics.map((metric, i) => (
          <div key={metric.id} role="listitem">
            <MetricCounter metric={metric} index={i} />
          </div>
        ))}
      </div>

      {/* Divisor decorativo entre métricas y testimonios */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, transparent, var(--color-cobre), var(--color-dorado), var(--color-cobre), transparent)',
          marginBottom: 'var(--space-16)',
          transformOrigin: 'left center',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* Testimonios — 3 columnas desktop / 1 columna mobile */}
      <div
        role="list"
        aria-label="Testimonios de clientes"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--space-6)',
        }}
        className="testimonials-grid"
      >
        {testimonials.map((t, i) => (
          <div key={t.id} role="listitem">
            <TestimonialCard testimonial={t} index={i} />
          </div>
        ))}
      </div>

      {/* CSS responsive vía style tag — evita importar otro archivo CSS */}
      <style>{`
        @media (min-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </SectionWrapper>
  )
}
