/**
 * InvitationCardSection – invitation card with preview, modal, and download.
 */
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './InvitationCardSection.css'

export default function InvitationCardSection({
  title,
  imageSrc,
  imageAlt,
  eventDate,
  location
}) {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setZoom(1)
  }, [])

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.25, 2)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.25, 1)), [])
  const zoomReset = useCallback(() => setZoom(1), [])
  const displayTitle = title ?? t('gyan_invitation_title')

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isModalOpen, closeModal])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = imageSrc.split('/').pop() || 'invitation-card.png'
    link.rel = 'noopener noreferrer'
    link.click()
  }

  const modalMarkup = isModalOpen && (
    <div
      className="invitation-card-section__modal-overlay"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label={displayTitle}
    >
      <div
        className="invitation-card-section__modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="invitation-card-section__modal-close"
          onClick={closeModal}
          aria-label={t('gyan_invitation_close')}
        >
          ×
        </button>
        <div className="invitation-card-section__modal-body">
          <div
            className="invitation-card-section__modal-zoom-wrap"
            style={{ transform: `scale(${zoom})` }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="eager"
              decoding="async"
              className="invitation-card-section__modal-img"
            />
          </div>
        </div>
        <div className="invitation-card-section__modal-zoom-actions">
          <button
            type="button"
            className="invitation-card-section__modal-zoom-btn"
            onClick={zoomOut}
            aria-label={t('modal_zoom_out')}
            disabled={zoom <= 1}
            aria-disabled={zoom <= 1}
          >
            −
          </button>
          <button
            type="button"
            className="invitation-card-section__modal-zoom-btn invitation-card-section__modal-zoom-reset"
            onClick={zoomReset}
            aria-label={t('modal_zoom_reset')}
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            className="invitation-card-section__modal-zoom-btn"
            onClick={zoomIn}
            aria-label={t('modal_zoom_in')}
            disabled={zoom >= 2}
            aria-disabled={zoom >= 2}
          >
            +
          </button>
        </div>
        <div className="invitation-card-section__modal-actions">
          <button type="button" className="btn btn-primary" onClick={handleDownload}>
            {t('gyan_invitation_download')}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <section className="invitation-card-section section" data-scroll-reveal>
      <div className="container">
        <h2 className="section__title">{displayTitle}</h2>
        <div className="invitation-card-section__card">
          <button
            type="button"
            className="invitation-card-section__preview"
            onClick={() => setIsModalOpen(true)}
            aria-label={t('gyan_invitation_view')}
          >
            <span className="invitation-card-section__preview-inner">
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
              />
            </span>
          </button>
          {(eventDate || location) && (
            <div className="invitation-card-section__meta">
              {eventDate && <span className="invitation-card-section__date">{eventDate}</span>}
              {location && <span className="invitation-card-section__location">{location}</span>}
            </div>
          )}
          <div className="invitation-card-section__actions">
            <button
              type="button"
              className="btn btn-primary invitation-card-section__btn"
              onClick={() => setIsModalOpen(true)}
            >
              {t('gyan_invitation_view')}
            </button>
            <button
              type="button"
              className="btn btn-secondary invitation-card-section__btn"
              onClick={handleDownload}
            >
              {t('gyan_invitation_download')}
            </button>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(modalMarkup, document.body)}
    </section>
  )
}
