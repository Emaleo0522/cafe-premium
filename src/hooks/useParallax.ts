import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useParallax — imagen de fondo se desplaza más lento que el contenido.
 *
 * Aplica yPercent al elemento ref entre 0 y `speed * 30` a medida
 * que el ScrollTrigger recorre la sección completa.
 *
 * @param speed  0.3 = lento (sutil), 1 = velocidad completa. Default 0.4.
 * @returns      ref del elemento a animar (img o div background)
 */
export function useParallax<T extends HTMLElement>(speed = 0.4) {
  const elementRef = useRef<T>(null)

  useGSAP(() => {
    const el = elementRef.current
    if (!el) return

    const tween = gsap.fromTo(
      el,
      { yPercent: 0 },
      {
        yPercent: speed * 30,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-parallax-section]') ?? el.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, { scope: elementRef })

  return elementRef
}

export default useParallax
