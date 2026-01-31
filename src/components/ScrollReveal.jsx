import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sets up Intersection Observer for elements with data-scroll-reveal.
 * Adds 'in-view' class when element enters viewport for light scroll animations.
 */
function ScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    const els = document.querySelectorAll('[data-scroll-reveal]')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    )

    els.forEach((el) => observer.observe(el))
    return () => els.forEach((el) => observer.unobserve(el))
  }, [location.pathname])

  return null
}

export default ScrollReveal
