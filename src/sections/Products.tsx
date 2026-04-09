import { motion } from 'framer-motion'
import { SectionWrapper, Heading } from '../components'
import { AnimatedProductCard } from '../components/ProductCard'
import { products } from '../data/products'

/**
 * Products — Sección "Nuestras variedades"
 *
 * Layout: 1 col mobile → 2 col tablet → 4 col desktop
 * Animación: Framer Motion whileInView + stagger 0.1s por card
 * Hover: border-left cobre + elevación (ver product-card en components-extended.css)
 * Precios: JetBrains Mono (--font-accent)
 */
export default function Products() {
  return (
    <SectionWrapper id="productos" bg="productos" grain>
      {/* Header de sección */}
      <div className="products-header">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          Selección de temporada
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <Heading
            as="h2"
            style={{ color: 'var(--color-crema)', marginBottom: 'var(--space-4)' }}
          >
            Nuestras variedades
          </Heading>
        </motion.div>

        <motion.p
          className="body-lg text-muted products-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
        >
          Cada grano seleccionado en origen. Tostado artesanal en pequeños lotes.
        </motion.p>
      </div>

      {/* Grid de productos — 1 → 2 → 4 columnas */}
      <div className="products-grid">
        {products.map((product, index) => (
          <AnimatedProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
