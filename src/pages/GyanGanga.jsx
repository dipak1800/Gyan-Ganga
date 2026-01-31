import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { getProgramBySlug } from '../data/programs'
import { getProgramDetail } from '../data/programDetails'
import ProgramModal from '../components/ProgramModal'
import './GyanGanga.css'

import libraryImg from '../../images/library.png'
import digitalImg from '../../images/digital.png'
import upskillImg from '../../images/upskill.png'
import womenEmpowermentImg from '../../images/women_empowerment.png'
import careerCounsellingImg from '../../images/carrer_councelling.png'
import farmerSupportImg from '../../images/farmer_support.png'

const focusAreaImages = {
  library: libraryImg,
  digital: digitalImg,
  textile: upskillImg,
  women: womenEmpowermentImg,
  career: careerCounsellingImg,
  farmer: farmerSupportImg
}

/* Focus area translation keys and program IDs (same order as programs.js focusAreas) */
const FOCUS_AREA_KEYS = ['prog1_title', 'prog2_title', 'prog3_title', 'prog4_title', 'prog5_title', 'prog6_title']
const FOCUS_AREA_IDS = ['library', 'digital', 'textile', 'women', 'career', 'farmer']

function GyanGanga() {
  const { t } = useLanguage()
  const program = getProgramBySlug('gyan-ganga')
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (index) => {
    const programId = FOCUS_AREA_IDS[index]
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
            <img src="/images/program-logo.jpg" alt={t('home_flagship_name')} />
          </div>
          <h1 className="section__title saffron-underline">{t('home_flagship_name')}</h1>
          <p className="program-hero__description">{t('home_flagship_description')}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="project-overview section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('gyan_overview_title')}</h2>
          <div className="project-overview__content">
            <p>{t('gyan_overview_p1')}</p>
            <p>{t('gyan_overview_p2')}</p>
            <p>{t('gyan_overview_p3')}</p>
            <p>{t('gyan_overview_p4')}</p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-statement section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('gyan_problem_title')}</h2>
          {t('gyan_problem_subtitle') && (
            <p className="problem-statement__subtitle">{t('gyan_problem_subtitle')}</p>
          )}
          <div className="problem-statement__content">
            <p>{t('gyan_problem_p1')}</p>
            <p>{t('gyan_problem_p2')}</p>
            <p>{t('gyan_problem_p3')}</p>
            <p>{t('gyan_problem_p4')}</p>
          </div>
        </div>
      </section>

      {/* Planned Facilities */}
      <section className="facilities section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('gyan_facilities_title')}</h2>
          <div className="facilities__grid">
            {FOCUS_AREA_KEYS.map((key, index) => {
              const programId = FOCUS_AREA_IDS[index]
              const programDetail = programId ? getProgramDetail(programId) : null
              const icon = programDetail?.icon || 'library'
              
              return (
                <div 
                  key={index} 
                  className="facility-card clickable"
                  onClick={() => handleCardClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(index)
                    }
                  }}
                >
                  <div className="facility-icon">
                    <img
                      src={focusAreaImages[icon] ?? focusAreaImages.library}
                      alt=""
                    />
                  </div>
                  <h3>{t(key)}</h3>
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
      <section className="inauguration section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('gyan_inauguration_title')}</h2>
          <div className="inauguration__content">
            <div className="inauguration-card">
              <div className="inauguration-card__logo">
                <img src="/images/program-logo.jpg" alt={t('home_flagship_name')} />
              </div>
              <div className="inauguration-card__header">
                <h3>{t('gyan_inauguration_event')}</h3>
                <span className="inauguration-date">{t('gyan_inauguration_date')}</span>
              </div>
              <div className="inauguration-card__details">
                <p>
                  {t('gyan_inauguration_p1')
                    .replace('{name}', t('home_flagship_name'))
                    .replace('{date}', t('gyan_inauguration_date'))
                    .replace('{location}', t('gyan_inauguration_location'))}
                </p>
                <p>{t('gyan_inauguration_p2')}</p>
                <p>
                  {t('gyan_inauguration_p3').replace('{dignitary}', t('gyan_inauguration_dignitary'))}
                </p>
                <div className="inauguration-image">
                  <img src="/images/program-infra-model.jpg" alt={t('gyan_infra_image_alt')} />
                </div>
              </div>
              <div className="inauguration-location">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="inauguration-location__address">{t('gyan_inauguration_venue')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="gyan-map section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('gyan_map_title')}</h2>
          <div className="gyan-map__wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.0252709586207!2d82.95469017632549!3d25.63728677743033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991d3e4e1a9c5ff%3A0x37c10c51e1b1dbc9!2z4KSc4KSvIOCkleCkvuCksuClgCDgpLDgpL7gpK4g4KSs4KS-4KSs4KS-IOCkp-CkvuCkrg!5e0!3m2!1sen!2sin!4v1769851930989!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('gyan_map_iframe_title')}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('gyan_values_title')}</h2>
          <div className="values__grid">
            {program.values.map((value, index) => (
              <div key={index} className="value-card">
                <h3 className="value-card__title">{t(value.titleKey)}</h3>
                <div className="value-card__description">
                  <p>{t(value.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="program-cta section" data-scroll-reveal>
        <div className="container">
          <div className="program-cta__content">
            <h2>{t('gyan_cta_title')}</h2>
            <p>{t('gyan_cta_desc')}</p>
            <div className="program-cta__buttons">
              <Link to="/apply" className="btn btn-primary">
                {t('aside_aspirant')}
              </Link>
              <Link to="/volunteer" className="btn btn-secondary">
                {t('aside_volunteer')}
              </Link>
              <Link to="/donate" className="btn btn-secondary">
                {t('aside_donate')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GyanGanga

