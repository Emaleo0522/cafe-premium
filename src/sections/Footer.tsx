/**
 * Footer — TORRË Café de Origen
 * Tarea 10 — 4 columnas desktop, 2 tablet, 1 mobile
 * Fondo #111111, texto crema apagado, hover color cobre
 */

const navLinks = [
  { label: 'Variedades', href: '#productos' },
  { label: 'Nuestra historia', href: '#historia' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Testimonios', href: '#testimonios' },
]

const helpLinks = [
  { label: 'Envíos y entregas', href: '#' },
  { label: 'Preguntas frecuentes', href: '#' },
  { label: 'Contacto', href: '#' },
]

const legalLinks = [
  { label: 'Términos y condiciones', href: '#' },
  { label: 'Política de privacidad', href: '#' },
]

function handleScrollLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith('#') && href.length > 1) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72'
      )
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
}

// SVG íconos redes sociales — 24×24 inline
function IconInstagram() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function IconEmail() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

const socialLinks = [
  { label: 'Instagram de TORRË', icon: <IconInstagram />, href: '#' },
  { label: 'WhatsApp de TORRË', icon: <IconWhatsApp />, href: '#' },
  { label: 'Email de TORRË', icon: <IconEmail />, href: '#' },
]

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

function FooterLink({ href, children, onClick }: FooterLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="footer-link"
      {...(href === '#' ? {} : {})}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer id="pie-de-pagina" role="contentinfo" className="footer-root">
      {/* Grid principal — 4 cols desktop, 2 tablet, 1 mobile */}
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Col 1 — Marca */}
          <div className="footer-col footer-col--brand">
            {/* Logo / nombre de marca — click vuelve al top */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="footer-logo"
              aria-label="TORRË — volver al inicio de la página"
            >
              TORR<span className="footer-logo-diaeresis">Ë</span>
            </button>
            <p className="footer-tagline">
              Café de origen,<br />tostado para vos.
            </p>

            {/* Redes sociales */}
            <ul className="footer-social" aria-label="Redes sociales" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="footer-social-icon"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Navegación */}
          <nav className="footer-col" aria-label="Navegación de secciones">
            <h3 className="footer-col-title">Explorar</h3>
            <ul className="footer-link-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink
                    href={link.href}
                    onClick={(e) => handleScrollLink(e, link.href)}
                  >
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Ayuda */}
          <nav className="footer-col" aria-label="Ayuda y soporte">
            <h3 className="footer-col-title">Ayuda</h3>
            <ul className="footer-link-list">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 — Legal */}
          <nav className="footer-col" aria-label="Información legal">
            <h3 className="footer-col-title">Legal</h3>
            <ul className="footer-link-list">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Barra inferior — copyright */}
        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; 2026 TORRË &mdash; Café de Origen. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
