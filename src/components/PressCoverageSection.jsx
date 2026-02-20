/**
 * PressCoverageSection – grid of press articles (images/PDFs) with modal viewer.
 * Modal is portaled to document.body (same pattern as InvitationCardSection).
 */
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './PressCoverageSection.css'

export default function PressCoverageSection({ articles = [], sectionId = 'press-coverage', teaser = false }) {
  const displayArticles = teaser ? articles.slice(0, 1) : articles
  const { t, language } = useLanguage()
  const [modalArticle, setModalArticle] = useState(null)
  const [zoom, setZoom] = useState(1)
  const langKey = language || 'en'

  const closeModal = useCallback(() => {
    setModalArticle(null)
    setZoom(1)
  }, [])

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.25, 2)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.25, 1)), [])
  const zoomReset = useCallback(() => setZoom(1), [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    if (modalArticle) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEsc)
    }
  }, [modalArticle, closeModal])

  const getTitle = (article) => article.title[langKey] || article.title.en || article.title.mr

  const handleDownload = (article) => {
    const link = document.createElement('a')
    link.href = article.fullSrc
    link.download = article.fullSrc.split('/').pop() || 'article.png'
    link.rel = 'noopener noreferrer'
    link.click()
  }

  const openArticle = (article) => {
    if (article.type === 'pdf') {
      window.open(article.fullSrc, '_blank', 'noopener,noreferrer')
      return
    }
    setModalArticle(article)
  }

  if (!displayArticles.length) return null

  return (
    <section id={sectionId} className="press-coverage section" data-scroll-reveal>
      <div className="container">
        <h2 className="section__title">{t('press_coverage_title')}</h2>
        <div className="press-coverage__grid">
          {displayArticles.map((article) => (
            <article key={article.id} className="press-coverage__card">
              <div className="press-coverage__thumb-wrap">
                <button
                  type="button"
                  className="press-coverage__thumb-btn"
                  onClick={() => openArticle(article)}
                  aria-label={t('press_read_article')}
                >
                  <img
                    src={article.thumbnailSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <span className="press-coverage__badge">{t('press_lang_marathi')}</span>
              </div>
              <h3 className="press-coverage__card-title">{getTitle(article)}</h3>
              <div className="press-coverage__meta">
                <span className="press-coverage__source">{article.source}</span>
                <span className="press-coverage__dot" aria-hidden>•</span>
                <span className="press-coverage__date">{article.date}</span>
              </div>
              <div className="press-coverage__actions">
                <button
                  type="button"
                  className="btn btn-primary press-coverage__btn"
                  onClick={() => openArticle(article)}
                >
                  {t('press_read_article')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary press-coverage__btn"
                  onClick={() => handleDownload(article)}
                >
                  {t('press_download')}
                </button>
              </div>
            </article>
          ))}
        </div>
        {teaser && (
          <div className="press-coverage__view-all">
            <Link to="/programs/gyan-ganga#press-coverage" className="btn btn-secondary">
              {t('press_view_all_coverage')}
            </Link>
          </div>
        )}
      </div>

      {typeof document !== 'undefined' &&
        modalArticle &&
        modalArticle.type === 'image' &&
        createPortal(
          <div
            className="press-coverage__modal-overlay"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={getTitle(modalArticle)}
          >
            <div className="press-coverage__modal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="press-coverage__modal-close"
                onClick={closeModal}
                aria-label={t('press_close')}
              >
                ×
              </button>
              <div className="press-coverage__modal-body">
                <div
                  className="press-coverage__modal-zoom-wrap"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <img
                    src={modalArticle.fullSrc}
                    alt=""
                    loading="eager"
                    decoding="async"
                    className="press-coverage__modal-img"
                  />
                </div>
              </div>
              <div className="press-coverage__modal-zoom-actions">
                <button
                  type="button"
                  className="press-coverage__modal-zoom-btn"
                  onClick={zoomOut}
                  aria-label={t('modal_zoom_out')}
                  disabled={zoom <= 1}
                  aria-disabled={zoom <= 1}
                >
                  −
                </button>
                <button
                  type="button"
                  className="press-coverage__modal-zoom-btn press-coverage__modal-zoom-reset"
                  onClick={zoomReset}
                  aria-label={t('modal_zoom_reset')}
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  className="press-coverage__modal-zoom-btn"
                  onClick={zoomIn}
                  aria-label={t('modal_zoom_in')}
                  disabled={zoom >= 2}
                  aria-disabled={zoom >= 2}
                >
                  +
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
