import { Helmet } from 'react-helmet-async'

/**
 * SEOHead — Componente centralizado de SEO para TORRË
 *
 * Incluye:
 * - Title + meta description (keyword primaria: "café de especialidad")
 * - Canonical
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Card
 * - theme-color
 *
 * JSON-LD (Organization + WebSite) lives in index.html as static blocks,
 * guaranteed for non-JS crawlers. Removed from Helmet to avoid duplication.
 *
 * Nota: FAQPage JSON-LD omitido intencionalmente. Google requiere que el contenido
 * FAQPage sea visible en el HTML. Cuando se agregue una sección FAQ visible,
 * restaurar el schema usando FAQ_ITEMS de ../data/faq.
 */

const BASE_URL = 'https://torre-cafe.com'

export default function SEOHead() {
  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>TORRË — Café de Origen | Café de Especialidad Tostado Artesanal</title>
      <meta
        name="description"
        content="Café de especialidad tostado en lotes pequeños. Directo de fincas en Colombia, Etiopía y Guatemala a tu mesa. Envío en 48h. Sin suscripción."
      />
      <link rel="canonical" href={`${BASE_URL}/`} />

      {/* ── Theme color (override index.html con spec correcta) ── */}
      <meta name="theme-color" content="#1A1A1A" />

      {/* ── Open Graph ── */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="TORRË — Café de Origen | Café de Especialidad Tostado Artesanal"
      />
      <meta
        property="og:description"
        content="Café de especialidad tostado en lotes pequeños. Directo de fincas en Colombia, Etiopía y Guatemala a tu mesa. Envío en 48h. Sin suscripción."
      />
      <meta property="og:image" content={`${BASE_URL}/images/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TORRË — Café de Especialidad Tostado Artesanal" />
      <meta property="og:url" content={`${BASE_URL}/`} />
      <meta property="og:site_name" content="TORRË" />
      <meta property="og:locale" content="es_AR" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="TORRË — Café de Origen | Café de Especialidad Tostado Artesanal"
      />
      <meta
        name="twitter:description"
        content="Café de especialidad tostado en lotes pequeños. Directo de fincas en Colombia, Etiopía y Guatemala. Envío en 48h."
      />
      <meta name="twitter:image" content={`${BASE_URL}/images/og-image.png`} />
      <meta name="twitter:image:alt" content="TORRË — Café de Especialidad Tostado Artesanal" />

      {/* JSON-LD lives in index.html (static, guaranteed for non-JS crawlers).
          Removed from Helmet to avoid duplicate schema blocks at runtime. */}
    </Helmet>
  )
}
