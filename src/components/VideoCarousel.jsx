import { useState, useEffect } from 'react'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { vipWishesVideos } from '../data/vipWishes'
import './VideoCarousel.css'

function VideoCarousel() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Video data - can be YouTube, Vimeo, or direct video URLs
  const videos = vipWishesVideos

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000) // Change video every 5 seconds

    return () => clearInterval(interval)
  }, [videos.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Helper function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return ''
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url
  }

  // Helper function to get Vimeo embed URL
  const getVimeoEmbedUrl = (url) => {
    if (!url) return ''
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i
    const match = url.match(regExp)
    return match ? `https://player.vimeo.com/video/${match[1]}` : url
  }

  const currentVideo = videos[currentIndex]
  let embedUrl = currentVideo.embedUrl

  // Convert to embed URL if needed
  if (embedUrl) {
    if (embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be')) {
      embedUrl = getYouTubeEmbedUrl(embedUrl)
    } else if (embedUrl.includes('vimeo.com')) {
      embedUrl = getVimeoEmbedUrl(embedUrl)
    }
  }

  return (
    <section className="video-carousel section" id="wishes">
      <div className="container">
        <h2 className="section__title">{t('wishes_title') || 'Best Wishes from VIPs'}</h2>
        <p className="video-carousel__intro">
          {t('wishes_intro') || 'Watch messages of support and best wishes from distinguished dignitaries for the launch of our flagship project.'}
        </p>

        <div className="video-carousel__container">
          <button
            className="video-carousel__nav video-carousel__nav--prev"
            onClick={goToPrevious}
            aria-label="Previous video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="video-carousel__slide">
            <div className="video-carousel__video-wrapper">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-carousel__video"
                ></iframe>
              ) : (
                <div className="video-carousel__placeholder">
                  <div className="video-carousel__placeholder-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <p className="video-carousel__placeholder-text">
                    {currentVideo.thumbnail ? (
                      <img src={currentVideo.thumbnail} alt={currentVideo.title} />
                    ) : (
                      t('wishes_video_placeholder') || 'Video will be displayed here'
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="video-carousel__info">
              <h3 className="video-carousel__person-name">{currentVideo.personName}</h3>
              <p className="video-carousel__person-title">{currentVideo.personTitle}</p>
            </div>
          </div>

          <button
            className="video-carousel__nav video-carousel__nav--next"
            onClick={goToNext}
            aria-label="Next video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="video-carousel__indicators">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`video-carousel__indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoCarousel

