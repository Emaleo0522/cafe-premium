import type { CSSProperties } from 'react'

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  /** Fondo semántico de la sección — usa las utilidades .bg-* del design system */
  bg?: 'hero' | 'productos' | 'diff' | 'historia' | 'proceso' | 'social' | 'cta' | 'footer'
  /** Aplica la textura de grano artesanal (para secciones oscuras) */
  grain?: boolean
  /** Tag HTML semántico — section por defecto */
  as?: 'section' | 'div' | 'article' | 'aside'
}

/**
 * SectionWrapper — contenedor estándar para secciones del landing.
 *
 * Aplica:
 * - padding vertical generoso (80px mobile → 120px desktop via --section-padding-y)
 * - max-width centrado con padding horizontal responsive
 * - id para anchor nav
 * - clases de fondo semántico
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  style,
  bg,
  grain = false,
  as: Tag = 'section',
}: SectionWrapperProps) {
  const bgClass = bg ? `bg-${bg}` : ''
  const grainClass = grain ? 'grain-overlay' : ''

  return (
    <Tag
      id={id}
      className={[bgClass, grainClass, className].filter(Boolean).join(' ')}
      style={{ paddingBlock: 'var(--section-padding-y)', ...style }}
    >
      <div
        style={{
          maxWidth: 'var(--container-xl)',
          marginInline: 'auto',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {children}
      </div>
    </Tag>
  )
}

export type { SectionWrapperProps }
