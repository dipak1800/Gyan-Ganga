import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { programs } from '../data/programs'
import './Programs.css'

function Programs() {
  const { t } = useLanguage()

  return (
    <div className="programs-page">
      <section className="programs-hero section">
        <div className="container">
          <h1 className="section__title">{t('programs_page_title')}</h1>
          <p className="programs-hero__desc">{t('programs_page_desc')}</p>
        </div>
      </section>

      <section className="programs-list section">
        <div className="container">
          <div className="programs-grid">
            {programs.map(program => (
              <div key={program.id} className="program-card-large">
                <div className="program-card-large__logo">
                  <img src="/images/program-logo.jpg" alt={program.name} />
                </div>
                <h2>{program.name}</h2>
                <p>{program.description}</p>
                <div className="program-card-large__features">
                  <h4>{t('programs_focus_areas')}</h4>
                  <ul>
                    {program.focusAreas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
                <Link 
                  to={`/programs/${program.slug}`} 
                  className="btn btn-primary"
                >
                  {t('programs_learn_more')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs

