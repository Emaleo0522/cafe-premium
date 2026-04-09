'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import CartDrawer from './CartDrawer'
import { useCartStore, selectTotalItems } from '../store/cartStore'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Productos', href: '#productos' },
  { label: 'Por qué TORRË', href: '#diferenciadores' },
  { label: 'Historia', href: '#historia' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Reseñas', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

/** Framer Motion variants para las 3 líneas del hamburger → X */
const topLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
}
const midLineVariants = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0 },
}
const botLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
}

/** Framer Motion variants para el menú mobile overlay */
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

interface NavbarProps {
  /** ID de la sección actualmente visible (sin #) — provisto por useActiveSection */
  activeSectionId?: string
}

export default function Navbar({ activeSectionId = '' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const totalItems = useCartStore(selectTotalItems)

  // Detectar scroll para activar glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bloquear scroll del body cuando menú mobile está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Cerrar menú con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleMobileNavClick = useCallback(
    (href: string) => {
      setIsOpen(false)
      // Esperar que termine exit animation antes de scrollear
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) {
          const navHeight = parseInt(
            getComputedStyle(document.documentElement)
              .getPropertyValue('--nav-height')
              .trim() || '72',
            10
          )
          const top =
            target.getBoundingClientRect().top + window.scrollY - navHeight
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 320)
    },
    []
  )

  const handleDesktopNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const navHeight = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height')
            .trim() || '72',
          10
        )
        const top =
          target.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    []
  )

  const hamburgerState = isOpen ? 'open' : 'closed'

  return (
    <>
      <header
        className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar__inner">
          {/* Logo */}
          <a
            href="#main-content"
            className="navbar__logo"
            aria-label="TORRË — Café de Origen, volver al inicio"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {/* SVG logo para fondos oscuros — dark variant */}
            <img
              src="/logo/logo-dark.svg"
              alt="TORRË"
              width={120}
              height={40}
              loading="eager"
              decoding="async"
              style={{ height: '2.25rem', width: 'auto' }}
              onError={(e) => {
                // Fallback tipográfico si el SVG no carga
                const img = e.currentTarget
                img.style.display = 'none'
                const fallback = img.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'block'
              }}
            />
            <span
              aria-hidden="true"
              style={{ display: 'none', fontFamily: 'var(--font-heading)' }}
            >
              TORR<span style={{ color: 'var(--nav-logo-accent-color)' }}>Ë</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav
            className="navbar__links"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSectionId === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => handleDesktopNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right-side actions group */}
          <div className="navbar__actions">
            {/* Desktop CTA */}
            <div className="navbar__cta">
              <Button
                variant="primary"
                size="sm"
                as="a"
                href="#contacto"
                onClick={(e) => handleDesktopNavClick(e as React.MouseEvent<HTMLAnchorElement>, '#contacto')}
              >
                Pedir ahora
              </Button>
            </div>

            {/* Cart icon — visible on all breakpoints */}
            <button
              type="button"
              className="navbar__cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} items` : ', vacio'}`}
              aria-expanded={isCartOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="navbar__cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    aria-hidden="true"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger button — mobile only */}
            <motion.button
              className="navbar__hamburger"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsOpen((prev) => !prev)}
            style={{ padding: '0.5rem', margin: '-0.5rem' }}
          >
            <motion.span
              className="navbar__hamburger-line"
              variants={topLineVariants}
              animate={hamburgerState}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="navbar__hamburger-line"
              variants={midLineVariants}
              animate={hamburgerState}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
              className="navbar__hamburger-line"
              variants={botLineVariants}
              animate={hamburgerState}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.button>
          </div>{/* end navbar__actions */}
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 'var(--z-modal)' as React.CSSProperties['zIndex'],
              background: 'rgba(26, 26, 26, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-8)',
              paddingBlock: 'var(--space-20)',
            }}
          >
            {/* Decorative copper accent line */}
            <motion.div
              variants={mobileLinkVariants}
              style={{
                width: '3rem',
                height: '2px',
                background: 'linear-gradient(to right, var(--color-cobre), var(--color-dorado))',
                marginBottom: 'var(--space-4)',
              }}
            />

            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSectionId === sectionId
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  variants={mobileLinkVariants}
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileNavClick(link.href)
                  }}
                >
                  {link.label}
                </motion.a>
              )
            })}

            {/* Mobile CTA */}
            <motion.div variants={mobileLinkVariants} style={{ marginTop: 'var(--space-4)' }}>
              <Button
                variant="primary"
                size="lg"
                as="a"
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  handleMobileNavClick('#contacto')
                }}
              >
                Pedir ahora
              </Button>
            </motion.div>

            {/* Eyebrow label */}
            <motion.p
              variants={mobileLinkVariants}
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--body-tertiary-color)',
                marginTop: 'var(--space-8)',
              }}
            >
              Café de Origen
            </motion.p>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
