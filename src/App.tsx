import { Layout, ScrollToTop } from './components'
import SEOHead from './components/SEOHead'
import Hero from './sections/Hero'
import Products from './sections/Products'
import Differentiators from './sections/Differentiators'
import Story from './sections/Story'
import Process from './sections/Process'
import SocialProof from './sections/SocialProof'
import FinalCTA from './sections/FinalCTA'
import { useActiveSection } from './hooks/useActiveSection'

/**
 * IDs de todas las secciones en orden de aparición en el DOM.
 * useActiveSection los observa para detectar cuál está visible.
 */
const SECTION_IDS = [
  'hero',
  'productos',
  'diferenciadores',
  'historia',
  'proceso',
  'testimonios',
  'contacto',
  'pie-de-pagina',
]

function App() {
  const activeSectionId = useActiveSection(SECTION_IDS)

  return (
    <>
      <SEOHead />

      <Layout activeSectionId={activeSectionId}>
        {/* Hero — Tarea 3 */}
        <Hero />

        {/* Productos — Tarea 4 */}
        <Products />

        {/* Diferenciadores — Tarea 5 */}
        <Differentiators />

        {/* Historia — Tarea 6 */}
        <Story />

        {/* Proceso — Tarea 7 */}
        <Process />

        {/* Testimonios + Métricas — Tarea 8 */}
        <SocialProof />

        {/* CTA Final — Tarea 9 */}
        <FinalCTA />
      </Layout>

      {/* ScrollToTop — flotante, fuera del Layout para z-index limpio */}
      <ScrollToTop />
    </>
  )
}

export default App
