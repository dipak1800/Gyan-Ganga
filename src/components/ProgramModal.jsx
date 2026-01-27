import { useEffect } from 'react'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './ProgramModal.css'

function ProgramModal({ program, isOpen, onClose }) {
  const { t } = useLanguage()

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
            {program.icon === 'library' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            )}
            {program.icon === 'digital' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            )}
            {program.icon === 'textile' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            )}
            {program.icon === 'women' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            )}
            {program.icon === 'career' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            )}
            {program.icon === 'farmer' && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v3M12 19v3M5.93 5.93l2.12 2.12M15.95 15.95l2.12 2.12M2 12h3M19 12h3M5.93 18.07l2.12-2.12M15.95 8.05l2.12-2.12"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </div>
          <h2>{t(program.titleKey)}</h2>
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
      </div>
    </div>
  )
}

export default ProgramModal

