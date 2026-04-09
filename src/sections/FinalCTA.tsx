import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import Heading from '../components/Heading'
import Button from '../components/Button'

/**
 * FinalCTA — Sección de cierre del landing de TORRË
 *
 * id="contacto" — anclaje de la navbar
 * Fondo: #1A1A1A (.bg-cta) con textura CSS noise
 * El CTA hace scroll hacia #productos
 *
 * Anti-convergencia: fondo diferenciado con gradiente atmosférico
 * encima del noise, no un bloque plano. Whitespace generoso.
 */

const EASE_EXPRESSIVE = [0.16, 1, 0.3, 1] as const

/** Desplazamiento suave hacia #productos respetando la navbar fija */
function scrollToProductos() {
  const target = document.getElementById('productos')
  if (!target) return

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
    10,
  )

  const top = target.getBoundingClientRect().top + window.scrollY - navHeight
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function FinalCTA() {
  return (
    <SectionWrapper
      id="contacto"
      bg="cta"
      grain
      style={{
        /* Padding vertical extra para que la sección respire */
        paddingBlock: 'clamp(6rem, 14vw, 10rem)',
        /* Gradiente atmosférico: profundidad marrón → negro puro */
        background: `
          radial-gradient(
            ellipse 80% 60% at 50% 40%,
            rgba(44, 24, 16, 0.55) 0%,
            transparent 70%
          ),
          #1A1A1A
        `,
      }}
    >
      {/* Contenido centrado */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-6)',
        }}
      >
        {/* Línea decorativa cobre — firma visual antes del título */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_EXPRESSIVE }}
          aria-hidden="true"
          style={{
            width: '3rem',
            height: '2px',
            background: 'var(--color-cobre)',
            transformOrigin: 'center',
          }}
        />

        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE_EXPRESSIVE, delay: 0.05 }}
          style={{ marginBottom: 0 }}
        >
          Tu café, tu decisión
        </motion.p>

        {/* Título principal — Playfair Display grande */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_EXPRESSIVE, delay: 0.12 }}
          style={{ maxWidth: '720px' }}
        >
          <Heading
            as="h2"
            size="display"
            style={{
              color: 'var(--color-crema)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Tu próximo café favorito{' '}
            <em
              style={{
                fontStyle: 'italic',
                color: 'var(--color-dorado)',
              }}
            >
              está a un click.
            </em>
          </Heading>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE_EXPRESSIVE, delay: 0.2 }}
          style={{
            color: 'var(--body-secondary-color)',
            fontSize: 'var(--text-lg)',
            lineHeight: 1.65,
            maxWidth: '500px',
            margin: 0,
          }}
        >
          Primera compra con envío gratis.{' '}
          <span style={{ color: 'var(--body-tertiary-color)' }}>
            Sin suscripción, sin compromiso.
          </span>
        </motion.p>

        {/* CTA button — con animación de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE_EXPRESSIVE, delay: 0.3 }}
          style={{ marginTop: 'var(--space-2)' }}
        >
          <Button
            size="lg"
            variant="primary"
            onClick={scrollToProductos}
            aria-label="Ir a la sección de productos para elegir tu café"
          >
            Elegir mi café
          </Button>
        </motion.div>

        {/* Trust signal — texto de garantía */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.45 }}
          style={{
            color: 'var(--body-tertiary-color)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          Tostado fresco · Envío en 48&nbsp;h · Devolucion sin preguntas
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
