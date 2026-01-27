import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { getProgramBySlug } from '../data/programs'
import { getProgramDetail } from '../data/programDetails'
import ProgramModal from '../components/ProgramModal'
import './GyanGanga.css'

function GyanGanga() {
  const { t } = useLanguage()
  const program = getProgramBySlug('gyan-ganga')
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Map focus areas to program detail IDs
  const focusAreaMap = {
    'Modern Library & Study Centre': 'library',
    'Digital E-Learning & Computer Facilities': 'digital',
    'Skill Development & Employment-Oriented Training': 'textile',
    'Women Empowerment & Entrepreneurship': 'women',
    'Career Counselling & Competitive Exam Guidance': 'career',
    'Farmer Training for Modern & Sustainable Agriculture': 'farmer'
  }

  const handleCardClick = (area) => {
    const programId = focusAreaMap[area]
    if (programId) {
      const programDetail = getProgramDetail(programId)
      if (programDetail) {
        setSelectedProgram(programDetail)
        setIsModalOpen(true)
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProgram(null)
  }

  if (!program) {
    return <div>{t('gyan_not_found')}</div>
  }

  return (
    <div className="gyan-ganga-page">
      {/* Hero Section */}
      <section className="program-hero section">
        <div className="container">
          <div className="program-hero__logo">
            <img src="/images/program-logo.jpg" alt={program.name} />
          </div>
          <h1 className="section__title saffron-underline">{program.name}</h1>
          <p className="program-hero__description">{program.description}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="project-overview section">
        <div className="container">
          <h2 className="section__title">{t('gyan_overview_title')}</h2>
          <div className="project-overview__content">
            <p>
              {t('gyan_overview_p1').replace('{name}', program.name)}
            </p>
            <p>
              {t('gyan_overview_p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-statement section">
        <div className="container">
          <h2 className="section__title">{t('gyan_problem_title')}</h2>
          <div className="problem-statement__content">
            <p>{t('gyan_problem_p1')}</p>
            <p>{t('gyan_problem_p2')}</p>
          </div>
        </div>
      </section>

      {/* Planned Facilities */}
      <section className="facilities section">
        <div className="container">
          <h2 className="section__title">{t('gyan_facilities_title')}</h2>
          <div className="facilities__grid">
            {program.focusAreas.map((area, index) => {
              const programId = focusAreaMap[area]
              const programDetail = programId ? getProgramDetail(programId) : null
              const icon = programDetail?.icon || 'library'
              
              return (
                <div 
                  key={index} 
                  className="facility-card clickable"
                  onClick={() => handleCardClick(area)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(area)
                    }
                  }}
                >
                  <div className="facility-icon">
                    {icon === 'library' && (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    )}
                    {icon === 'digital' && (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    )}
                    {icon === 'textile' && (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    )}
                    {icon === 'women' && (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    )}
                    {icon === 'career' && (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    )}
                    {icon === 'farmer' && (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v3M12 19v3M5.93 5.93l2.12 2.12M15.95 15.95l2.12 2.12M2 12h3M19 12h3M5.93 18.07l2.12-2.12M15.95 8.05l2.12-2.12"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </div>
                  <h3>{area}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      <ProgramModal 
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Bhoomi Pujan & Inauguration */}
      <section className="inauguration section">
        <div className="container">
          <h2 className="section__title">{t('gyan_inauguration_title')}</h2>
          <div className="inauguration__content">
            <div className="inauguration-card">
              <div className="inauguration-card__logo">
                <img src="/images/program-logo.jpg" alt={program.name} />
              </div>
              <div className="inauguration-card__header">
                <h3>{program.inauguration.event}</h3>
                <span className="inauguration-date">{program.inauguration.date}</span>
              </div>
              <div className="inauguration-card__details">
                <p>
                  {t('gyan_inauguration_p1')
                    .replace('{name}', program.name)
                    .replace('{date}', program.inauguration.date)
                    .replace('{location}', program.inauguration.location)}
                </p>
                <p>{t('gyan_inauguration_p2')}</p>
                <p>
                  {t('gyan_inauguration_p3').replace('{dignitary}', program.inauguration.dignitary)}
                </p>
                <div className="inauguration-image">
                  <img src="/images/program-infra-model.jpg" alt="Gyan-Ganga Campus Infrastructure Model" />
                </div>
              </div>
              <div className="inauguration-location">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{program.inauguration.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values section">
        <div className="container">
          <h2 className="section__title">{t('gyan_values_title')}</h2>
          <div className="values__grid">
            {program.values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="program-cta section">
        <div className="container">
          <div className="program-cta__content">
            <h2>{t('gyan_cta_title')}</h2>
            <p>{t('gyan_cta_desc')}</p>
            <Link to="/apply" className="btn btn-primary">
              {program.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GyanGanga

