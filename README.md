# TORRË — Café de Origen

> Landing premium para una marca ficticia de café de especialidad. Pieza de portfolio + template reusable.

**Live**: <https://cafe-premium-sigma.vercel.app>

![status](https://img.shields.io/badge/status-portfolio%20piece-success) ![stack](https://img.shields.io/badge/stack-Vite%20%2B%20React%20%2B%20TS-blue) ![deploy](https://img.shields.io/badge/deploy-Vercel-black)

---

## Qué es esto

Landing single-page para **TORRË**, una marca ficticia de café de especialidad tostado en lotes pequeños (origen Colombia / Etiopía / Guatemala). El proyecto sirve dos propósitos:

1. **Portfolio piece** — demuestra animaciones GSAP + Framer Motion, jerarquía tipográfica premium, SEO técnico completo y deploy production-ready en Vercel.
2. **Template** — la arquitectura está pensada para adaptarse a otras marcas de origen (café, vino, aceite de oliva, chocolate, té). Cambiando assets + copy + paleta se reusa la base sin tocar componentes.

---

## Stack

- **Build**: Vite 6 + TypeScript estricto
- **UI**: React 18 + Tailwind CSS 4
- **Animaciones**: GSAP 3.12 + `@gsap/react` (scroll-triggered) + Framer Motion 11 (micro-interactions)
- **State**: Zustand (carrito ligero)
- **SEO**: `react-helmet-async` + Open Graph + canonical + theme-color + favicons multi-tamaño
- **Imágenes**: Sharp para optimización en build
- **Deploy**: Vercel con `vercel.json` (cache headers + security headers)
- **A11y**: ESLint `jsx-a11y` activado, max-warnings 0

---

## Decisiones de diseño

- **Paleta**: marrones tostados + crema + acentos cobre. Pensada para evocar café recién tostado sin caer en clichés (no usa el verde Starbucks ni el rojo Nespresso).
- **Tipografía**: serif editorial para headings (peso visual de marca premium) + sans-serif neutra para body.
- **Animaciones**: scroll storytelling con GSAP — el contenido se revela narrativamente, no todo a la vez. Framer Motion sólo en hover/tap states.
- **Sin suscripción**: la marca ficticia se diferencia ofreciendo compras únicas sin lock-in. La narrativa del sitio se construye alrededor de esto.

---

## Desarrollo local

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # output a /dist
npm run preview      # smoke test del build
npm run type-check   # tsc --noEmit
npm run lint         # eslint estricto
```

---

## Estructura

```
cafe-premium/
├── index.html              # meta SEO completa, OG, favicons
├── src/                    # componentes React, hooks, store
├── public/                 # assets estáticos servidos en /
├── assets/                 # imágenes optimizadas
├── vercel.json             # cache + security headers
└── package.json
```

---

## Generado con vibecoding pipeline

Este sitio se construyó con el sistema de agentes [claude-vibecoding](https://github.com/Emaleo0522/claude-vibecoding) — pipeline de 5 fases con QA visual automatizado.

---

## Licencia

Código MIT. Branding "TORRË" y assets son ficticios para portfolio — no usar en producción comercial sin reemplazar.
