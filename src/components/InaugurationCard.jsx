import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './InaugurationCard.css'

/**
 * Responsive aside invitation card for the upcoming Gyan Ganga inauguration.
 * Semantic HTML, accessible, multi-language support.
 */
function InaugurationCard({ onNavigate }) {
  const { t } = useLanguage()

  return (
    <div className="inauguration-invite-card-wrap">
      <article className="inauguration-invite-card" aria-labelledby="inauguration-invite-heading">
      {/* Small top badge */}
      <span className="inauguration-invite-card__badge" aria-hidden="true">
        {t('aside_inaug_badge')}
      </span>

      {/* Main heading with optional shimmer */}
      <h2 id="inauguration-invite-heading" className="inauguration-invite-card__title">
        {t('home_flagship_name')}
      </h2>

      {/* Large date display with subtle glow */}
      <time className="inauguration-invite-card__date" dateTime="2026-02-21">
        {t('gyan_inauguration_date')}
      </time>

      {/* Short subtitle */}
      <p className="inauguration-invite-card__subtitle">{t('aside_inaug_subtitle')}</p>

      {/* Tagline */}
      <p className="inauguration-invite-card__tagline">
        {t('aside_inaug_tagline')}
      </p>

      {/* Organizer name */}
      <p className="inauguration-invite-card__organizer">
        {t('hero_org')}
      </p>

      {/* Call-to-action */}
      <Link to="/programs/gyan-ganga" className="inauguration-invite-card__cta" onClick={onNavigate}>
        {t('aside_inaug_cta')}
      </Link>
      </article>
    </div>
  )
}

export default InaugurationCard
