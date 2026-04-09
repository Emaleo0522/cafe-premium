import { useRef, useEffect } from 'react'
import { useMotionValue, useInView, animate } from 'framer-motion'
import type { Metric } from '../data/testimonials'

interface MetricCounterProps {
  metric: Metric
  /** Índice para stagger delay */
  index: number
}

/**
 * MetricCounter — número grande animado de 0 al valor final cuando entra en viewport.
 * Usa Framer Motion useMotionValue + animate + useInView.
 * Número en Playfair Display, label en DM Sans pequeño.
 */
export default function MetricCounter({ metric, index }: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const count = useMotionValue(0)
  const displayRef = useRef<HTMLSpanElement>(null)

  const decimals = metric.decimals ?? 0

  // Formatea el número con separador de miles y decimales
  function formatValue(val: number): string {
    if (decimals > 0) {
      return val.toFixed(decimals)
    }
    // Miles: "3200" → "3.200"
    return Math.round(val).toLocaleString('es-AR')
  }

  useEffect(() => {
    if (!isInView) return

    const delay = index * 0.12 * 1000 // stagger en ms

    const timer = setTimeout(() => {
      const controls = animate(count, metric.value, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate(latest) {
          if (displayRef.current) {
            displayRef.current.textContent = formatValue(latest)
          }
        },
        onComplete() {
          if (displayRef.current) {
            displayRef.current.textContent = formatValue(metric.value)
          }
        },
      })
      return () => controls.stop()
    }, delay)

    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-2)',
        textAlign: 'center',
      }}
    >
      {/* Número grande */}
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 'var(--font-bold)',
          fontSize: 'clamp(2.5rem, 4vw, 3.75rem)',
          lineHeight: 1,
          color: 'var(--color-dorado)',
          letterSpacing: 'var(--tracking-tight)',
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.1em',
        }}
      >
        {metric.prefix && (
          <span
            style={{
              fontSize: '0.65em',
              fontWeight: 'var(--font-regular)',
              color: 'var(--color-cobre-light)',
            }}
            aria-hidden="true"
          >
            {metric.prefix}
          </span>
        )}
        <span ref={displayRef} aria-live="off">
          {formatValue(0)}
        </span>
        {metric.suffix && (
          <span
            style={{
              fontSize: '0.5em',
              fontWeight: 'var(--font-regular)',
              color: 'var(--color-crema-muted)',
              opacity: 0.7,
            }}
            aria-hidden="true"
          >
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--font-regular)',
          fontSize: 'var(--text-xs)',
          color: 'rgba(245, 240, 235, 0.55)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
        }}
      >
        {metric.label}
      </span>
    </div>
  )
}

export type { MetricCounterProps }
