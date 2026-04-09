import SkipNav from './SkipNav'
import Navbar from './Navbar'
import Footer from '../sections/Footer'

interface LayoutProps {
  children: React.ReactNode
  /** ID de la sección activa para destacar en la Navbar */
  activeSectionId?: string
}

/**
 * Layout — estructura semántica del documento.
 *
 * ┌─────────────────────────────────┐
 * │  SkipNav (visible en focus)     │
 * │  <header> → Navbar sticky       │
 * │  <main id="main-content">       │
 * │    {children}                   │
 * │  </main>                        │
 * │  <footer>                       │
 * └─────────────────────────────────┘
 *
 * El padding-top de main compensa la navbar fija (--nav-height).
 * La primera sección hero usa margin-top negativo para quedar
 * bajo la navbar transparente (definido en main.css).
 */
export default function Layout({ children, activeSectionId }: LayoutProps) {
  return (
    <>
      {/* Skip nav — WCAG 2.4.1, primer hijo del documento */}
      <SkipNav />

      {/* Navbar sticky — fija en top:0, glass effect al scroll */}
      <Navbar activeSectionId={activeSectionId} />

      {/* Contenido principal — padding-top compensa navbar */}
      <main id="main-content">
        {children}
      </main>

      {/* Footer — Tarea 10 */}
      <Footer />
    </>
  )
}
