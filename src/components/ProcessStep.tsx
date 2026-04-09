import { motion } from 'framer-motion'

interface ProcessStepProps {
  number: string
  title: string
  description: string
  index: number
  isLast?: boolean
}

/**
 * ProcessStep — nodo individual del timeline de proceso.
 *
 * Desktop: columna vertical con número grande + conector horizontal entre pasos.
 * Mobile: fila con línea vertical izquierda continua.
 * Animación: whileInView con stagger (delay por index).
 */
export default function ProcessStep({
  number,
  title,
  description,
  index,
  isLast = false,
}: ProcessStepProps) {
  return (
    <motion.div
      className="process-step"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
      }}
    >
      {/* Número grande estilizado */}
      <div
        className="process-step__number"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(3.5rem, 2rem + 4vw, 5.5rem)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'var(--color-cobre)',
          marginBottom: 'var(--space-5)',
          userSelect: 'none',
        }}
      >
        {number}
      </div>

      {/* Nodo conector — círculo copper sobre la línea */}
      <div
        className="process-step__node"
        aria-hidden="true"
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'var(--color-cobre)',
          flexShrink: 0,
          marginBottom: 'var(--space-5)',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Contenido textual */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-negro)',
            marginBottom: 'var(--space-3)',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {title}
        </h3>
        <p
          className="body-md"
          style={{
            color: 'var(--body-light-tertiary-color)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {description}
        </p>
      </div>

      {/* Línea horizontal conectora entre pasos (solo desktop, solo si no es el último) */}
      {!isLast && (
        <div
          className="process-step__connector"
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}

export type { ProcessStepProps }
