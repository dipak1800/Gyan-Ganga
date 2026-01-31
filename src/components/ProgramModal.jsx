import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './ProgramModal.css'

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

function ProgramModal({ program, isOpen, onClose }) {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const getServiceName = () => {
    if (!program || !program.titleKey) return ''
    return t(program.titleKey)
  }

  const handleApplyClick = () => {
    const serviceName = getServiceName()
    onClose()
    navigate(`/apply?service=${encodeURIComponent(serviceName)}`)
  }

  const handleVolunteerClick = () => {
    const serviceName = getServiceName()
    onClose()
    navigate(`/volunteer?service=${encodeURIComponent(serviceName)}`)
  }

  const handleDonateClick = () => {
    onClose()
    navigate('/donate')
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !program) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <img
              src={focusAreaImages[program.icon] ?? focusAreaImages.library}
              alt=""
            />
          </div>
          <h2>{t(program.titleKey)}</h2>
        </div>
        <div className="modal-actions-top">
          <button 
            className="modal-btn modal-btn-primary modal-btn-small"
            onClick={handleApplyClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>{t('modal_btn_apply') || 'Apply'}</span>
          </button>
          <button 
            className="modal-btn modal-btn-secondary modal-btn-small"
            onClick={handleVolunteerClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>{t('modal_btn_volunteer') || 'Volunteer'}</span>
          </button>
          <button 
            className="modal-btn modal-btn-accent modal-btn-small"
            onClick={handleDonateClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{t('modal_btn_donate') || 'Donate'}</span>
          </button>
        </div>
        <div className="modal-body">
          {program.content && Object.entries(program.content).map(([key, contentKey]) => {
            const content = t(contentKey)
            if (!content || content === contentKey) return null
            
            return (
              <div key={key} className="modal-section">
                <div className="modal-content-text" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}></div>
              </div>
            )
          })}
        </div>
        <div className="modal-footer">
          <div className="modal-actions">
            <button 
              className="modal-btn modal-btn-primary modal-btn-small"
              onClick={handleApplyClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span>{t('modal_btn_apply') || 'Apply'}</span>
            </button>
            <button 
              className="modal-btn modal-btn-secondary modal-btn-small"
              onClick={handleVolunteerClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{t('modal_btn_volunteer') || 'Volunteer'}</span>
            </button>
            <button 
              className="modal-btn modal-btn-accent modal-btn-small"
              onClick={handleDonateClick}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{t('modal_btn_donate') || 'Donate'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramModal

