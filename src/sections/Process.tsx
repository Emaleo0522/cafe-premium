import { motion } from 'framer-motion'
import { SectionWrapper, Heading } from '../components'
import ProcessStep from '../components/ProcessStep'

/* ─── Datos de los pasos ──────────────────────────────────────────────── */

const STEPS = [
  {
    number: '01',
    title: 'Selección en origen',
    description: 'Elegimos granos de fincas con puntaje SCA +84.',
  },
  {
    number: '02',
    title: 'Tostado artesanal',
    description: 'Perfiles de tueste diseñados para cada origen.',
  },
  {
    number: '03',
    title: 'Empaque al vacío',
    description: 'Sellado el mismo día para preservar aromas.',
  },
  {
    number: '04',
    title: 'En tu puerta',
    description: 'Envío express. Abrís la bolsa y sentís la diferencia.',
  },
] as const

/* ─── Sección ─────────────────────────────────────────────────────────── */

export default function Process() {
  return (
    <SectionWrapper id="proceso" bg="proceso">
      {/* ── Cabecera ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginBottom: 'var(--space-16)',
          textAlign: 'center',
        }}
      >
        <p
          className="eyebrow eyebrow--light"
          style={{ marginBottom: 'var(--space-3)' }}
        >
          Transparencia total
        </p>
        <Heading
          as="h2"
          style={{ color: 'var(--color-negro)' }}
        >
          Del grano a tu taza
        </Heading>
      </motion.div>

      {/* ── Timeline wrapper ── */}
      <div className="process-timeline">
        {/* Línea de fondo: horizontal en desktop, vertical en mobile */}
        <div className="process-timeline__track" aria-hidden="true" />

        {/* Pasos */}
        {STEPS.map((step, i) => (
          <ProcessStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
