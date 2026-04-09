import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionWrapper, Heading } from '../components'

/* ─── Animation variants ──────────────────────────────────────────────────── */

const textVariants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

const textChild = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.2,
    },
  },
}

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.55,
    },
  },
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <SectionWrapper id="historia" bg="historia" grain>
      <div ref={sectionRef} className="historia-layout">
        <div className="grid-historia">

          {/* ── Columna texto (izquierda en desktop, abajo en mobile) ── */}
          <motion.div
            className="historia-layout__texto"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ order: 2 }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={textChild}
              className="eyebrow"
              style={{ marginBottom: 'var(--space-5)' }}
            >
              Nuestra historia
            </motion.p>

            {/* H2 */}
            <motion.div variants={textChild} style={{ marginBottom: 'var(--space-7)' }}>
              <Heading
                as="h2"
                style={{
                  color: 'var(--color-crema)',
                  lineHeight: 'var(--leading-tight)',
                  letterSpacing: 'var(--tracking-snug)',
                }}
              >
                Empezamos con una bolsa y una obsesión
              </Heading>
            </motion.div>

            {/* Párrafos */}
            <motion.p
              variants={textChild}
              className="body-lg"
              style={{
                color: 'rgba(245, 240, 235, 0.82)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-6)',
              }}
            >
              En 2019, después de años comprando café de supermercado, descubrimos
              lo que una bolsa recién tostada podía hacer. Ese primer sorbo de un
              Huila lavado, a tres días del tueste, cambió todo.
            </motion.p>

            <motion.p
              variants={textChild}
              className="body-lg"
              style={{
                color: 'rgba(245, 240, 235, 0.82)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Hoy trabajamos directamente con productores en Colombia, Etiopía y
              Guatemala. Cada lote se tuesta en nuestro taller de Buenos Aires con
              perfiles diseñados para resaltar lo mejor de cada origen.
            </motion.p>

            <motion.p
              variants={textChild}
              className="body-lg"
              style={{
                color: 'rgba(245, 240, 235, 0.82)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-10)',
              }}
            >
              No somos una cadena. Somos un equipo chico, obsesionado con que cada
              bolsa que sale de acá sea la mejor que probaste.
            </motion.p>

            {/* Dato numérico destacado */}
            <motion.div
              variants={statVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-8)',
                borderTop: '1px solid var(--border-color-strong)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1,
                  color: 'var(--color-dorado)',
                  letterSpacing: '-0.02em',
                }}
              >
                12.000+
              </span>
              <span
                className="body-md"
                style={{
                  color: 'var(--body-tertiary-color)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                bolsas entregadas
                <br />
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-cobre)',
                    fontFamily: 'var(--font-accent)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Desde 2019
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* ── Columna imagen (derecha en desktop, arriba en mobile) ── */}
          <motion.div
            className="historia-layout__imagen"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ order: 1 }}
          >
            <div
              style={{
                aspectRatio: '4 / 5',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src="/images/story.png"
                alt="Taller de tostado artesanal TORRË en Buenos Aires"
                width={686}
                height={858}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Línea accent dorada — detalle visual */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '18%',
                  bottom: '18%',
                  width: '3px',
                  background:
                    'linear-gradient(to bottom, transparent, var(--color-cobre) 20%, var(--color-dorado) 60%, transparent)',
                  borderRadius: '0 2px 2px 0',
                }}
              />

              {/* Label sobre imagen */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-6)',
                  left: 'var(--space-6)',
                  right: 'var(--space-6)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(201, 169, 110, 0.7)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    margin: 0,
                    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                  }}
                >
                  Taller de tueste — Buenos Aires
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  )
}
