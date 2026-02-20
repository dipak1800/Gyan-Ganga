/**
 * HeroBackgroundSlideshow – premium cinematic hero background.
 * Full-bleed images, auto-advance with crossfade + subtle Ken Burns zoom.
 * Pauses when tab hidden; respects prefers-reduced-motion.
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import './HeroBackgroundSlideshow.css'

const DEFAULT_INTERVAL_MS = 7000
const DEFAULT_TRANSITION_MS = 1000

/**
 * @param {{ images: Array<{ avif?: string, jpg: string, alt: string }>, intervalMs?: number, transitionMs?: number }} props
 */
export default function HeroBackgroundSlideshow({
  images = [],
  intervalMs = DEFAULT_INTERVAL_MS,
  transitionMs = DEFAULT_TRANSITION_MS
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleSlot, setVisibleSlot] = useState(0)
  const n = images.length
  const [slot0DisplayIndex, setSlot0DisplayIndex] = useState(0)
  const [slot1DisplayIndex, setSlot1DisplayIndex] = useState(n > 1 ? 1 : 0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const advance = useCallback(() => {
    if (n <= 1) return
    const nextIndex = (activeIndex + 1) % n
    const nextSlot = 1 - visibleSlot
    setActiveIndex(nextIndex)
    setVisibleSlot(nextSlot)
    if (nextSlot === 0) {
      setSlot0DisplayIndex(nextIndex)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setSlot1DisplayIndex((nextIndex + 1) % n), transitionMs)
    } else {
      setSlot1DisplayIndex(nextIndex)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setSlot0DisplayIndex((nextIndex + 1) % n), transitionMs)
    }
  }, [n, activeIndex, visibleSlot, transitionMs])

  const goTo = useCallback((index) => {
    if (n === 0) return
    const target = typeof index === 'number' ? index % n : (activeIndex + 1) % n
    if (target === activeIndex) return
    const targetSlot = 1 - visibleSlot
    setActiveIndex(target)
    setVisibleSlot(targetSlot)
    if (targetSlot === 0) {
      setSlot0DisplayIndex(target)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setSlot1DisplayIndex((target + 1) % n), transitionMs)
    } else {
      setSlot1DisplayIndex(target)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setSlot0DisplayIndex((target + 1) % n), transitionMs)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (!prefersReducedMotion && n > 1) {
      intervalRef.current = setInterval(advance, intervalMs)
    }
  }, [activeIndex, visibleSlot, n, intervalMs, transitionMs, prefersReducedMotion, advance])

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (n <= 1 || prefersReducedMotion) return
    intervalRef.current = setInterval(advance, intervalMs)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [n, prefersReducedMotion, intervalMs, advance])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      } else if (!document.hidden && !prefersReducedMotion && n > 1) {
        intervalRef.current = setInterval(advance, intervalMs)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [prefersReducedMotion, n, intervalMs, advance])

  if (!n) return null

  const idx0 = slot0DisplayIndex
  const idx1 = slot1DisplayIndex

  return (
    <div className="hero-slideshow" aria-hidden="true">
      <div className="hero-slideshow__slides">
        <div
          className={`hero-slideshow__slide ${visibleSlot === 0 ? 'hero-slideshow__slide--visible' : ''}`}
          style={{ '--hero-transition-ms': `${transitionMs}ms`, '--hero-interval-ms': `${intervalMs}ms` }}
        >
          <div className="hero-slideshow__zoom">
            <picture>
              {images[idx0].avif && (
                <source srcSet={images[idx0].avif} type="image/avif" />
              )}
              <img
                src={images[idx0].jpg}
                alt={images[idx0].alt}
                decoding="async"
                loading={idx0 === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx0 === 0 ? 'high' : 'low'}
              />
            </picture>
          </div>
        </div>
        <div
          className={`hero-slideshow__slide ${visibleSlot === 1 ? 'hero-slideshow__slide--visible' : ''}`}
          style={{ '--hero-transition-ms': `${transitionMs}ms`, '--hero-interval-ms': `${intervalMs}ms` }}
        >
          <div className="hero-slideshow__zoom">
            <picture>
              {images[idx1].avif && (
                <source srcSet={images[idx1].avif} type="image/avif" />
              )}
              <img
                src={images[idx1].jpg}
                alt={images[idx1].alt}
                decoding="async"
                loading={idx1 === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx1 === 0 ? 'high' : 'low'}
              />
            </picture>
          </div>
        </div>
      </div>
      <div className="hero-slideshow__overlay" aria-hidden="true" />
      <div className="hero-slideshow__blob" aria-hidden="true" />
      <nav className="hero-slideshow__dots" aria-label="Slideshow navigation">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className="hero-slideshow__dot"
            aria-label={`Slide ${i + 1}`}
            aria-current={activeIndex === i ? 'true' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>
    </div>
  )
}
