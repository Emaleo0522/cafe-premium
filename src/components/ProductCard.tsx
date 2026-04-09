import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from './Badge'
import type { Product } from '../data/products'
import { useCartStore } from '../store/cartStore'

interface ProductCardProps {
  product: Product
  /** Índice para stagger animation (pasado desde Products) */
  index: number
}

/**
 * ProductCard — card individual de producto TORRË.
 *
 * Hover desktop:
 *   - Elevación sutil (translateY -6px)
 *   - Border-left cobre que aparece (scaleY desde 0)
 *   - Imagen placeholder con zoom 1.04x
 *
 * Accesibilidad:
 *   - role="article" con aria-label
 *   - Selector de peso con role="radiogroup"
 *   - Focus visible en botón CTA
 */
export default function ProductCard({ product }: ProductCardProps) {
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g'>('250g')
  const [justAdded, setJustAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const selectedPrice = product.prices.find(p => p.weight === selectedWeight)

  const handleAddToCart = useCallback(() => {
    addItem(product, selectedWeight)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }, [addItem, product, selectedWeight])

  return (
    <article
      className="product-card"
      aria-label={`Producto: ${product.name}`}
    >
      {/* Border-left copper — visible en hover via CSS */}
      <div className="product-card__copper-line" aria-hidden="true" />

      {/* Imagen del producto */}
      <div
        className="product-card__image-wrap"
        style={{
          background: `linear-gradient(160deg, ${product.gradientFrom} 0%, ${product.gradientTo} 100%)`,
        }}
      >
        <img
          src={product.image}
          alt={`Café ${product.name} — ${product.origin.country}`}
          className="product-card__image"
          width={592}
          height={592}
          loading="lazy"
        />

        {/* Origen superpuesto */}
        <span className="product-card__origin-tag">
          {product.origin.country}
        </span>

        {/* Badge — si aplica */}
        {product.badge && (
          <Badge
            variant={product.badgeVariant ?? 'copper'}
            className="product-card__badge"
          >
            {product.badge}
          </Badge>
        )}
      </div>

      {/* Contenido */}
      <div className="product-card__body">
        {/* Región */}
        <p className="product-card__region">
          {product.origin.region}
        </p>

        {/* Nombre */}
        <h3 className="product-card__name">{product.name}</h3>

        {/* Notas de sabor */}
        <ul className="product-card__notes" aria-label="Notas de sabor">
          {product.flavorNotes.map(note => (
            <li key={note} className="product-card__note">
              {note}
            </li>
          ))}
        </ul>

        {/* Barra de intensidad */}
        <div className="product-card__intensity" aria-label={`Intensidad: ${product.intensity} de 5`}>
          <span className="product-card__intensity-label">Intensidad</span>
          <div className="product-card__intensity-dots" role="img" aria-hidden="true">
            {[1, 2, 3, 4, 5].map(dot => (
              <span
                key={dot}
                className={`product-card__intensity-dot${dot <= product.intensity ? ' product-card__intensity-dot--active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Selector de peso */}
        <div
          className="product-card__weight-selector"
          role="radiogroup"
          aria-label="Seleccionar peso"
        >
          {product.prices.map(price => (
            <button
              key={price.weight}
              role="radio"
              aria-checked={selectedWeight === price.weight}
              className={`product-card__weight-btn${selectedWeight === price.weight ? ' product-card__weight-btn--active' : ''}`}
              onClick={() => setSelectedWeight(price.weight)}
              type="button"
            >
              {price.weight}
            </button>
          ))}
        </div>

        {/* Footer: precio + CTA */}
        <div className="product-card__footer">
          <p className="product-card__price" aria-label={`Precio: ${selectedPrice?.formatted}`}>
            {selectedPrice?.formatted}
          </p>
          <button
            type="button"
            className={`btn btn-sm product-card__cta${justAdded ? ' product-card__cta--added' : ' btn-outline-copper'}`}
            aria-label={`Agregar ${product.name} ${selectedWeight} al carrito`}
            onClick={handleAddToCart}
            disabled={justAdded}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Agregado
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  Agregar
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </article>
  )
}

/**
 * Variante con animación de entrada — usada por Products.tsx.
 * whileInView con stagger controlado por el padre.
 */
export function AnimatedProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <ProductCard product={product} index={index} />
    </motion.div>
  )
}

export type { ProductCardProps }
