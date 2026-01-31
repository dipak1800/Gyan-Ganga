import { useLanguage } from '../i18n/useLanguage.jsx'
import './Donate.css'

import gpayImg from '../../images/gpay.jpg'
import phonepeImg from '../../images/phonepe.jpg'
import paytmImg from '../../images/paytm.jpg'

function Donate() {
  const { t } = useLanguage()

  return (
    <div className="donate-page">
      <section className="donate-hero section">
        <div className="container">
          <h1 className="section__title">{t('donate_title')}</h1>
          <p className="donate-hero__desc">{t('donate_desc')}</p>
        </div>
      </section>

      <section className="donate-content section" data-scroll-reveal>
        <div className="container">
          <div className="donate-message">
            <p>{t('donate_message')}</p>
          </div>

          <div className="donate-qr-section">
            <h2>{t('donate_qr_title')}</h2>
            <div className="qr-container">
              <div className="qr-placeholder qr-placeholder--notice">
                <p className="qr-legal-message">{t('donate_qr_legal_message')}</p>
                <p className="qr-update-soon">{t('donate_qr_update_soon')}</p>
              </div>
            </div>
          </div>

          <div className="supported-apps">
            <h3>{t('donate_apps_title')}</h3>
            <div className="apps-grid">
              <div className="app-item">
                <img src={gpayImg} alt="Google Pay" />
              </div>
              <div className="app-item">
                <img src={phonepeImg} alt="PhonePe" />
              </div>
              <div className="app-item">
                <img src={paytmImg} alt="Paytm" />
              </div>
            </div>
          </div>

          <div className="transparency-note">
            <h3>{t('donate_transparency_title')}</h3>
            <p>{t('donate_transparency_text')}</p>
          </div>

          <div className="donation-acknowledgment">
            <h3>{t('donate_ack_title')}</h3>
            <p>
              {t('donate_ack_text')}{' '}
              <a href="mailto:contact@ashajyotiruraludaan.org">contact@ashajyotiruraludaan.org</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate

