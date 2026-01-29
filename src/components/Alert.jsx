import { useEffect } from 'react'
import './Alert.css'

function Alert({ type, message, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Auto-close after 5 seconds for success, 7 seconds for error
      const timer = setTimeout(() => {
        onClose()
      }, type === 'success' ? 5000 : 7000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, type, onClose])

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

  if (!isOpen) return null

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className={`alert-popup alert-${type}`} onClick={(e) => e.stopPropagation()}>
        <button className="alert-close" onClick={onClose} aria-label="Close alert">
          &times;
        </button>
        <div className="alert-icon">
          {type === 'success' ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
        </div>
        <div className="alert-content">
          <h3 className="alert-title">
            {type === 'success' ? 'Success!' : 'Error'}
          </h3>
          <p className="alert-message">{message}</p>
        </div>
        <button className="alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  )
}

export default Alert

