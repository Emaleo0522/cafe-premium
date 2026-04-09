import { motion } from 'framer-motion'
import { SectionWrapper, Heading } from '../components'
import PillarCard from '../components/PillarCard'

/* ─── SVG íconos inline ───────────────────────────────────────────────── */

const IconGlobe = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.6" />
    {/* Ecuador */}
    <ellipse cx="20" cy="20" rx="7" ry="14" stroke="currentColor" strokeWidth="1.6" />
    {/* Paralelo superior */}
    <path
      d="M8 15.5 Q20 11 32 15.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Paralelo inferior */}
    <path
      d="M8 24.5 Q20 29 32 24.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    {/* Pin de ubicación */}
    <circle cx="26" cy="13" r="2.5" fill="currentColor" />
    <line x1="26" y1="15.5" x2="26" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const IconFlame = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Llama principal */}
    <path
      d="M20 34 C12 34 8 28 8 22 C8 16 14 12 16 8 C16 8 17 14 20 15 C20 15 18 10 22 6 C22 6 24 16 28 18 C30 20 32 24 32 26 C32 31 26 34 20 34 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Llama interior */}
    <path
      d="M20 30 C17 30 15 27 15 24 C15 21 18 19 20 17 C20 17 21 21 23 22 C25 23 26 26 26 28 C26 29.5 23 30 20 30 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      fill="none"
      opacity="0.55"
    />
  </svg>
)

const IconBox = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Cara frontal */}
    <path
      d="M8 15 L20 9 L32 15 L32 29 L20 35 L8 29 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Arista vertical */}
    <line x1="20" y1="9" x2="20" y2="35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    {/* Arista horizontal */}
    <line x1="8" y1="15" x2="32" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    {/* Flecha envío */}
    <path
      d="M23 21 L27 21 M25 19 L27 21 L25 23"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

const IconUnlock = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Cuerpo del candado */}
    <rect
      x="10"
      y="19"
      width="20"
      height="14"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
    />
    {/* Arco abierto — desplazado a la derecha */}
    <path
      d="M14 19 L14 13 C14 9.5 17 7 20 7 C23 7 26 9 26 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Ojo del candado */}
    <circle cx="20" cy="26" r="2.5" fill="currentColor" />
    <line x1="20" y1="28.5" x2="20" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/* ─── Datos de los pilares ────────────────────────────────────────────── */

const PILLARS = [
  {
    icon: <IconGlobe />,
    title: 'Origen directo',
    description: 'Trabajamos con fincas en Huila, Nariño y Etiopía. Sin intermediarios.',
  },
  {
    icon: <IconFlame />,
    title: 'Tostado semanal',
    description: 'Cada lote se tuesta el mismo día que lo pedís. Frescura real.',
  },
  {
    icon: <IconBox />,
    title: 'Envío en 48h',
    description: 'De nuestro tostador a tu puerta en dos días hábiles.',
  },
  {
    icon: <IconUnlock />,
    title: 'Sin ataduras',
    description: 'Comprá cuando quieras. Sin suscripción obligatoria.',
  },
] as const

/* ─── Sección ─────────────────────────────────────────────────────────── */

export default function Differentiators() {
  return (
    <SectionWrapper id="diferenciadores" bg="diff">
      {/* Cabecera */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}
      >
        <p
          className="eyebrow eyebrow--light"
          style={{ marginBottom: 'var(--space-3)' }}
        >
          Por qué elegirnos
        </p>
        <Heading
          as="h2"
          style={{ color: 'var(--color-negro)' }}
        >
          Por qué TORRË
        </Heading>
      </motion.div>

      {/* Grid 2×2 — 1 col mobile, 2 col ≥768px */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: 'var(--space-5)',
        }}
        className="pillars-grid"
      >
        {PILLARS.map((pillar, i) => (
          <PillarCard
            key={pillar.title}
            icon={pillar.icon}
            title={pillar.title}
            description={pillar.description}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
