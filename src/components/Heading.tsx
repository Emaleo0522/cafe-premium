import type { CSSProperties } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm'

interface HeadingProps {
  as?: HeadingLevel
  size?: HeadingSize
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  id?: string
}

/**
 * Heading — h1-h6 con Playfair Display.
 * El `as` define la semántica HTML, `size` define el tamaño visual.
 * Por defecto: h2 xl para flexibilidad de composición.
 */
export default function Heading({
  as: Tag = 'h2',
  size,
  children,
  className = '',
  style,
  id,
}: HeadingProps) {
  // Mapa de nivel semántico a tamaño visual por defecto
  const defaultSize: Record<HeadingLevel, HeadingSize> = {
    h1: 'display',
    h2: 'xl',
    h3: 'lg',
    h4: 'md',
    h5: 'sm',
    h6: 'sm',
  }

  const resolvedSize = size ?? defaultSize[Tag]

  const sizeClass: Record<HeadingSize, string> = {
    display: 'heading-display',
    xl: 'heading-xl',
    lg: 'heading-lg',
    md: 'heading-md',
    sm: 'heading-sm',
  }

  return (
    <Tag
      id={id}
      className={`${sizeClass[resolvedSize]} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  )
}

export type { HeadingLevel, HeadingSize, HeadingProps }
