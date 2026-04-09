import { useState, useEffect, useRef } from 'react'

/**
 * useActiveSection — detecta qué sección está visible en el viewport.
 *
 * Usa IntersectionObserver para marcar como activa la sección
 * cuyo tope entra en la "zona de activación" (20% superior del viewport).
 *
 * @param sectionIds  Array de IDs de sección en orden de aparición (sin #)
 * @returns           ID de la sección activa (sin #)
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>('')
  // Guardamos qué secciones están visibles para calcular la más alta
  const visibleSections = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (typeof window === 'undefined') return

    // rootMargin: activa cuando la sección entra por el 15% superior del viewport
    // -75% en el bottom evita que secciones cortas se activen antes de tiempo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            visibleSections.current.add(id)
          } else {
            visibleSections.current.delete(id)
          }
        })

        // Elegir la sección visible más alta en la página
        // (primera en orden del DOM que esté en el Set)
        const firstVisible = sectionIds.find((id) =>
          visibleSections.current.has(id)
        )
        if (firstVisible !== undefined) {
          setActiveId(firstVisible)
        }
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    )

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [sectionIds])

  return activeId
}

export default useActiveSection
