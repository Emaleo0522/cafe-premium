import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Badge, Button, Heading } from '../components'
import { useParallax } from '../hooks/useParallax'

/* ─── Scroll util ─────────────────────────────────────────────────────────── */

function scrollToSection(href: string) {
  const target = document.querySelector(href)
  if (!target) return
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
    10
  )
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight
  window.scrollTo({ top, behavior: 'smooth' })
}

/* ─── Animation variants ──────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const fadeUpSlow = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function Hero() {
  const imgRef = useParallax<HTMLImageElement>(0.4)

  const handlePrimary = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('#productos')
  }, [])

  const handleSecondary = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('#historia')
  }, [])

  return (
    <section
      id="hero"
      aria-label="Hero — Café de origen"
      data-parallax-section
      className="section-hero grain-overlay"
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
        backgroundColor: 'var(--section-hero-bg)',
      }}
    >
      {/* ── Imagen de fondo con parallax ── */}
      <div
        className="hero-layout__bg"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        {/* Overlay gradient — legibilidad del texto */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(26,26,26,0.30) 0%, rgba(26,26,26,0.65) 55%, rgba(26,26,26,0.92) 100%)',
            zIndex: 1,
          }}
        />
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/hero-mobile.png"
            width={768}
            height={1024}
          />
          <img
            ref={imgRef}
            src="/images/hero.png"
            alt=""
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            style={{
              width: '100%',
              height: '115%',      /* over-size to allow yPercent travel */
              objectFit: 'cover',
              objectPosition: 'center 30%',
              willChange: 'transform',
            }}
          />
        </picture>
      </div>

      {/* ── Contenido — ancla inferior-izquierdo ── */}
      <div
        className="hero-layout"
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 'clamp(3rem, 6vw, 6rem)',
          paddingInline: 'var(--container-padding)',
          maxWidth: 'var(--container-xl)',
          marginInline: 'auto',
          width: '100%',
        }}
      >
        <motion.div
          className="hero-layout__text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            width: '100%',
          }}
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-5)' }}>
            <Badge variant="copper">Café de Origen</Badge>
          </motion.div>

          {/* H1 — Playfair Display 900 */}
          <motion.div variants={fadeUp}>
            <Heading
              as="h1"
              size="display"
              style={{
                color: 'var(--color-crema)',
                marginBottom: 'var(--space-6)',
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-snug)',
              }}
            >
              Café de origen,
              <br />
              tostado para vos.
            </Heading>
          </motion.div>

          {/* Subtítulo */}
          <motion.p
            variants={fadeUpSlow}
            className="body-lg"
            style={{
              color: 'rgba(245, 240, 235, 0.82)',
              maxWidth: '38rem',
              marginBottom: 'var(--space-10)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Tostamos cada semana. Enviamos en 48&nbsp;h. Desde la finca hasta tu
            taza&nbsp;— sin escalas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpSlow}
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="primary"
              size="lg"
              as="a"
              href="#productos"
              onClick={handlePrimary}
            >
              Explorar variedades
            </Button>
            <Button
              variant="ghost"
              size="lg"
              as="a"
              href="#historia"
              onClick={handleSecondary}
            >
              Nuestra historia
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.375rem',
        }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '1.5px',
            height: '2.5rem',
            background:
              'linear-gradient(to bottom, transparent, rgba(201,169,110,0.7))',
            display: 'block',
          }}
        />
      </motion.div>
    </section>
  )
}
