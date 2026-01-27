import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { programs } from '../data/programs'
import './Home.css'

function Home() {
  const { t } = useLanguage()
  const flagshipProgram = programs[0]

  const programCards = [
    { id: 'library', titleKey: 'prog1_title', icon: 'library' },
    { id: 'digital', titleKey: 'prog2_title', icon: 'digital' },
    { id: 'textile', titleKey: 'prog3_title', icon: 'textile' },
    { id: 'women', titleKey: 'prog4_title', icon: 'women' },
    { id: 'career', titleKey: 'prog5_title', icon: 'career' },
    { id: 'farmer', titleKey: 'prog6_title', icon: 'farmer' }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero section" id="home">
        <div className="hero__container container">
          <div className="hero__content">
            <div className="hero__logo">
              <img 
                src="/images/foundation-logo.jpg" 
                alt="Asha Jyoti Rural Udaan Foundation"
              />
            </div>
            <h1 className="hero__title">{t('hero_title')}</h1>
            <div className="hero__subtitle">
              <p className="hero__org">{t('hero_org')}</p>
              <p className="hero__flagship">
                {t('hero_flagship')}
              </p>
            </div>
            <p className="hero__tagline">{t('hero_tagline')}</p>
            <div className="hero__buttons">
              <a href="#programs" className="btn btn-primary">{t('hero_btn1')}</a>
              <Link to="/programs/gyan-ganga" className="btn btn-secondary">{t('hero_btn2')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="programs section" id="programs">
        <div className="container">
          <h2 className="section__title">{t('programs_title')}</h2>
          <div className="programs__grid">
            {programCards.map((card) => (
              <div key={card.id} className="program-card">
                <div className="program-icon">
                  {card.icon === 'library' && (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  )}
                  {card.icon === 'digital' && (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  )}
                  {card.icon === 'textile' && (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  )}
                  {card.icon === 'women' && (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  )}
                  {card.icon === 'career' && (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  )}
                  {card.icon === 'farmer' && (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v3M12 19v3M5.93 5.93l2.12 2.12M15.95 15.95l2.12 2.12M2 12h3M19 12h3M5.93 18.07l2.12-2.12M15.95 8.05l2.12-2.12"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </div>
                <h3 className="program-title">{t(card.titleKey)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Programs Preview */}
      <section className="flagship-preview section">
        <div className="container">
          <h2 className="section__title">{t('home_flagship_title')}</h2>
          <div className="flagship-card">
            <div className="flagship-card__logo">
              <img src="/images/program-logo.jpg" alt={flagshipProgram.name} />
            </div>
            <h3>{flagshipProgram.name}</h3>
            <p>{flagshipProgram.description}</p>
            <Link to={`/programs/${flagshipProgram.slug}`} className="btn btn-primary">
              {t('home_learn_more')}
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision section">
        <div className="container">
          <h2 className="section__title">{t('vision_title')}</h2>
          <div className="vision__content">
            <p>{t('vision_p1')}</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder section" id="founder">
        <div className="container">
          <h2 className="section__title">{t('founder_title')}</h2>
          <div className="founder__content">
            <div className="founder__image">
              <img src="/images/ravi.jpg" alt="Ravi P. Upadhyay - Founder" />
            </div>
            <div className="founder__info">
              <h3 className="founder__name">Ravi P. Upadhyay</h3>
              <p className="founder__designation">{t('founder_designation')}</p>
              <p className="founder__bio">{t('founder_bio')}</p>
              <blockquote className="founder__quote">
                <p>{t('founder_quote')}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="recognition section" id="recognition">
        <div className="container">
          <h2 className="section__title">{t('recognition_title')}</h2>
          <p className="recognition__intro">{t('recognition_intro')}</p>
          <div className="recognition__grid">
            <div className="recognition-card">
              <div className="recognition-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3>{t('recog1_title')}</h3>
              <p>{t('recog1_desc')}</p>
            </div>
            <div className="recognition-card">
              <div className="recognition-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                  <polyline points="17 2 12 7 7 2"></polyline>
                </svg>
              </div>
              <h3>{t('recog2_title')}</h3>
              <p>{t('recog2_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta section">
        <div className="container">
          <div className="cta__content">
            <h2>{t('home_cta_title')}</h2>
            <div className="cta__buttons">
              <Link to="/apply" className="btn btn-primary">{t('home_cta_apply')}</Link>
              <Link to="/volunteer" className="btn btn-secondary">{t('home_cta_volunteer')}</Link>
              <Link to="/donate" className="btn btn-secondary">{t('home_cta_donate')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

