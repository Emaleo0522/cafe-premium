/**
 * SkipNav — "Skip to content" WCAG 2.4.1
 * Primer hijo de body. Visible solo en focus.
 */
export default function SkipNav() {
  return (
    <a
      href="#main-content"
      className="skip-nav"
      style={{
        position: 'absolute',
        top: '-100%',
        left: '1rem',
        zIndex: 'var(--z-toast)' as React.CSSProperties['zIndex'],
        padding: '0.75rem 1.25rem',
        background: 'var(--color-cobre)',
        color: 'var(--color-crema)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-wide)',
        textDecoration: 'none',
        borderRadius: 'var(--radius-sm)',
        transition: 'top 0.15s',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '1rem'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100%'
      }}
    >
      Ir al contenido principal
    </a>
  )
}
