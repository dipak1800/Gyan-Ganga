import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { programs } from '../data/programs'
import { getProgramDetail } from '../data/programDetails'
import ProgramModal from '../components/ProgramModal'
import './Home.css'

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

function Home() {
  const { t } = useLanguage()
  const flagshipProgram = programs[0]
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProgramCardClick = (card) => {
    const programDetail = getProgramDetail(card.id)
    if (programDetail) {
      setSelectedProgram(programDetail)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProgram(null)
  }

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
                src="/images/foundation-logo.png" 
                alt="Asha Jyoti Rural Udaan Foundation"
                fetchPriority="high"
              />
            </div>
            <p className="hero__title">{t('hero_title')}</p>
            <p className="hero__flagship">
              {t('hero_flagship_label')}<span className="hero__flagship-name">{t('hero_flagship_name')}</span>
            </p>
            <p className="hero__tagline">{t('hero_tagline')}</p>
            <div className="hero__buttons">
              <a href="#programs" className="btn btn-primary">{t('hero_btn1')}</a>
              <Link to="/programs/gyan-ganga" className="btn btn-secondary">{t('hero_btn2')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Programs Preview */}
      <section className="flagship-preview section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('home_flagship_title')}</h2>
          <div className="flagship-card">
            <div className="flagship-card__logo">
              <img src="/images/program-logo.jpg" alt={t('home_flagship_name')} />
            </div>
            <h3>{t('home_flagship_name')}</h3>
            <p>{t('home_flagship_description')}</p>
            <Link to={`/programs/${flagshipProgram.slug}`} className="btn btn-primary">
              {t('home_learn_more')}
            </Link>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="programs section" id="programs" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('programs_title')}</h2>
          <div className="programs__grid">
            {programCards.map((card) => (
              <div
                key={card.id}
                className="program-card clickable"
                onClick={() => handleProgramCardClick(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleProgramCardClick(card)
                  }
                }}
              >
                <div className="program-icon">
                  <img
                    src={focusAreaImages[card.icon]}
                    alt=""
                  />
                </div>
                <h3 className="program-title">{t(card.titleKey)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Vision Section */}
      <section className="vision section" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('vision_title')}</h2>
          <div className="vision__content">
            <p>{t('vision_p1')}</p>
            <p>{t('vision_p2')}</p>
            <p>{t('vision_p3')}</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder section" id="founder" data-scroll-reveal>
        <div className="container">
          <h2 className="section__title">{t('founder_title')}</h2>
          <div className="founder__content">
            <div className="founder__image">
              <img src="/images/ravi.jpg" alt={`${t('founder_name')} - ${t('founder_title')}`} />
            </div>
            <div className="founder__info">
              <h3 className="founder__name">{t('founder_name')}</h3>
              <p className="founder__designation">{t('founder_designation')}</p>
              <p className="founder__bio">{t('founder_bio')}</p>
              <blockquote className="founder__quote">
                <p>{t('founder_quote')}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta section" data-scroll-reveal>
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

