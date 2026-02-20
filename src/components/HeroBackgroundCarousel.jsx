/**
 * HeroBackgroundCarousel – infinite background image carousel for hero section.
 * Uses CSS transform (translate3d) for smooth GPU animation, duplicated track for seamless loop.
 * Respects prefers-reduced-motion; supports AVIF + JPEG/PNG fallback via <picture>.
 */
import './HeroBackgroundCarousel.css'

/**
 * @param {{ images: Array<{ avif?: string, jpg: string, alt: string }> }} props
 */
export default function HeroBackgroundCarousel({ images = [] }) {
  if (!images.length) return null

  // Duplicated track: [A, B, C, D, E, A, B, C, D, E] for seamless infinite scroll
  const duplicated = [...images, ...images]

  return (
    <div className="hero-carousel" aria-hidden="true">
      <div className="hero-carousel__track">
        {duplicated.map((img, i) => (
          <div key={i} className="hero-carousel__slide">
            <picture>
              {img.avif && (
                <source
                  srcSet={img.avif}
                  type="image/avif"
                />
              )}
              <img
                src={img.jpg}
                alt={img.alt}
                decoding="async"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
              />
            </picture>
          </div>
        ))}
      </div>
      <div className="hero-carousel__overlay" aria-hidden="true" />
    </div>
  )
}
