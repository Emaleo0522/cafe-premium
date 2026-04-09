import { motion } from 'framer-motion'
import type { Testimonial } from '../data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  /** Índice para el stagger delay */
  index: number
}

/**
 * TestimonialCard — card con comilla decorativa serif en opacity baja,
 * cita en Playfair Display italic, nombre/ciudad en DM Sans.
 * Fondo oscuro sobre --section-social-bg (#2C1810).
 */
export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: 'relative',
        backgroundColor: 'rgba(26, 26, 16, 0.45)',
        border: '1px solid rgba(245, 240, 235, 0.10)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
      }}
    >
      {/* Comilla decorativa — serif, opacity baja, posición absoluta */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0.5rem',
          left: '1.25rem',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(5rem, 6vw, 8rem)',
          lineHeight: 1,
          color: 'var(--color-dorado)',
          opacity: 0.15,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        &ldquo;
      </span>

      {/* Cita */}
      <blockquote
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontWeight: 'var(--font-regular)',
          fontSize: 'var(--text-lg)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--color-crema)',
          margin: 0,
          paddingTop: 'var(--space-6)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {testimonial.quote}
      </blockquote>

      {/* Divisor decorativo */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, var(--color-cobre), transparent)',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* Autor */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-1)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-medium)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-crema)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          {testimonial.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--font-regular)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-dorado)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
          }}
        >
          {testimonial.city}
        </span>
      </footer>
    </motion.article>
  )
}

export type { TestimonialCardProps }
