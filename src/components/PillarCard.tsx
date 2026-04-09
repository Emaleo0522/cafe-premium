import { motion } from 'framer-motion'

export interface PillarCardProps {
  icon: React.ReactNode
  title: string
  description: string
  /** Índice para stagger — lo pasa el padre */
  index?: number
}

/**
 * PillarCard — tarjeta de pilar diferenciador.
 *
 * Recibe el ícono como SVG inline (React.ReactNode) para mantener
 * el color via currentColor y evitar peticiones de imagen.
 *
 * La animación whileInView fade-up se define aquí; el stagger
 * se coordina con el padre pasando `index` como delay.
 */
export default function PillarCard({ icon, title, description, index = 0 }: PillarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-8) var(--space-6)',
        borderRadius: '2px',
        background: 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(184,115,51,0.12)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        transition: 'border-color 0.25s ease, background 0.25s ease',
      }}
      whileHover={{
        borderColor: 'rgba(184,115,51,0.35)',
        backgroundColor: 'rgba(255,255,255,0.75)',
      }}
      aria-label={title}
    >
      {/* Ícono SVG — hereda color cobre via wrapper */}
      <div
        aria-hidden="true"
        style={{
          color: 'var(--color-cobre)',
          width: 40,
          height: 40,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {icon}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <h3
          className="heading-md"
          style={{
            color: 'var(--color-negro)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          className="body-md"
          style={{
            color: 'var(--color-negro)',
            opacity: 0.65,
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      </div>
    </motion.article>
  )
}
