import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, selectTotalItems, selectFormattedSubtotal } from '../store/cartStore'

/** TORRE ease — consistent across project */
const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const totalItems = useCartStore(selectTotalItems)
  const formattedSubtotal = useCartStore(selectFormattedSubtotal)

  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap + close on Escape
  useEffect(() => {
    if (!isOpen) return

    // Focus close button on open
    const timer = setTimeout(() => closeButtonRef.current?.focus(), 100)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const getItemPrice = useCallback(
    (productId: string, weight: '250g' | '500g') => {
      const item = items.find(
        (i) => i.product.id === productId && i.weight === weight
      )
      if (!item) return '$0'
      const price = item.product.prices.find((p) => p.weight === weight)
      if (!price) return '$0'
      return `$${(price.amount * item.quantity).toLocaleString('es-CL')}`
    },
    [items]
  )

  const isEmpty = items.length === 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Carrito de compras, ${totalItems} items`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <h2 className="cart-drawer__title">Tu pedido</h2>
              <button
                ref={closeButtonRef}
                type="button"
                className="cart-drawer__close"
                onClick={onClose}
                aria-label="Cerrar carrito"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            {isEmpty ? (
              <div className="cart-drawer__empty">
                {/* Empty bag icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="cart-drawer__empty-icon"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cart-drawer__empty-text">Tu carrito esta vacio</p>
                <p className="cart-drawer__empty-hint">
                  Explora nuestros cafes de origen y agrega tus favoritos
                </p>
              </div>
            ) : (
              <>
                {/* Items list */}
                <ul className="cart-drawer__items">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={`${item.product.id}-${item.weight}`}
                        className="cart-item"
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                      >
                        {/* Mini product image */}
                        <div
                          className="cart-item__image"
                          style={{
                            background: `linear-gradient(160deg, ${item.product.gradientFrom} 0%, ${item.product.gradientTo} 100%)`,
                          }}
                        >
                          <img
                            src={item.product.image}
                            alt=""
                            width={64}
                            height={64}
                            loading="lazy"
                          />
                        </div>

                        {/* Details */}
                        <div className="cart-item__details">
                          <p className="cart-item__name">{item.product.name}</p>
                          <p className="cart-item__weight">{item.weight}</p>

                          {/* Quantity controls */}
                          <div className="cart-item__controls">
                            <button
                              type="button"
                              className="cart-item__qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.weight,
                                  item.quantity - 1
                                )
                              }
                              aria-label={`Reducir cantidad de ${item.product.name}`}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                            <span className="cart-item__qty" aria-label={`Cantidad: ${item.quantity}`}>
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="cart-item__qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.weight,
                                  item.quantity + 1
                                )
                              }
                              aria-label={`Aumentar cantidad de ${item.product.name}`}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Price + remove */}
                        <div className="cart-item__right">
                          <p className="cart-item__price">
                            {getItemPrice(item.product.id, item.weight)}
                          </p>
                          <button
                            type="button"
                            className="cart-item__remove"
                            onClick={() => removeItem(item.product.id, item.weight)}
                            aria-label={`Eliminar ${item.product.name} ${item.weight} del carrito`}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path
                                d="M1.75 3.5h10.5M5.25 3.5V2.333a.583.583 0 01.583-.583h2.334a.583.583 0 01.583.583V3.5m1.75 0v8.167a.583.583 0 01-.583.583H4.083a.583.583 0 01-.583-.583V3.5h9.333z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Clear cart */}
                {items.length > 1 && (
                  <button
                    type="button"
                    className="cart-drawer__clear"
                    onClick={clearCart}
                  >
                    Vaciar carrito
                  </button>
                )}
              </>
            )}

            {/* Footer — always visible when items exist */}
            {!isEmpty && (
              <div className="cart-drawer__footer">
                <div className="cart-drawer__subtotal">
                  <span className="cart-drawer__subtotal-label">Subtotal</span>
                  <span className="cart-drawer__subtotal-value">{formattedSubtotal}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary cart-drawer__checkout"
                >
                  Finalizar pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
