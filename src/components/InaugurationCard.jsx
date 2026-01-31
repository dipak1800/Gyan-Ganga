import { Link } from 'react-router-dom'
import './InaugurationCard.css'

/**
 * Responsive aside invitation card for the upcoming Gyan Ganga inauguration.
 * Semantic HTML, accessible, no external dependencies.
 */
function InaugurationCard({ onNavigate }) {
  return (
    <div className="inauguration-invite-card-wrap">
      <article className="inauguration-invite-card" aria-labelledby="inauguration-invite-heading">
      {/* Small top badge */}
      <span className="inauguration-invite-card__badge" aria-hidden="true">
        Grand Inauguration
      </span>

      {/* Main heading with optional shimmer */}
      <h2 id="inauguration-invite-heading" className="inauguration-invite-card__title">
        Chhatrapati Shivaji Maharaj Gyan-Ganga
      </h2>

      {/* Large date display with subtle glow */}
      <time className="inauguration-invite-card__date" dateTime="2026-02-21">
        21st February 2026
      </time>

      {/* Short subtitle */}
      <p className="inauguration-invite-card__subtitle">Inauguration Ceremony</p>

      {/* Tagline */}
      <p className="inauguration-invite-card__tagline">
        A step towards free, world-class education and skill development
      </p>

      {/* Organizer name */}
      <p className="inauguration-invite-card__organizer">
        Asha Jyoti Rural Udaan Foundation
      </p>

      {/* Call-to-action */}
      <Link to="/programs/gyan-ganga" className="inauguration-invite-card__cta" onClick={onNavigate}>
        Know More →
      </Link>
      </article>
    </div>
  )
}

export default InaugurationCard
