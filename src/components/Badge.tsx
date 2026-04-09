import type { CSSProperties } from 'react'

type BadgeVariant = 'copper' | 'gold'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
  style?: CSSProperties
}

/**
 * Badge — etiqueta compacta para "Bestseller", "Nuevo", "Origen: Etiopía", etc.
 * Usa JetBrains Mono en mayúsculas. Dos variantes de color de marca.
 */
export default function Badge({
  children,
  variant = 'copper',
  className = '',
  style,
}: BadgeProps) {
  const variantClass = variant === 'gold' ? 'badge badge-gold' : 'badge badge-copper'
  return (
    <span className={`${variantClass} ${className}`.trim()} style={style}>
      {children}
    </span>
  )
}

export type { BadgeVariant, BadgeProps }
