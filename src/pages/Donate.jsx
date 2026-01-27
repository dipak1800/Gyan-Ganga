import { useLanguage } from '../i18n/useLanguage.jsx'
import './Donate.css'

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

      <section className="donate-content section">
        <div className="container">
          <div className="donate-message">
            <p>{t('donate_message')}</p>
          </div>

          <div className="donate-qr-section">
            <h2>{t('donate_qr_title')}</h2>
            <div className="qr-container">
              <div className="qr-placeholder">
                <p>{t('donate_qr_label')}</p>
                <p className="qr-note">{t('donate_qr_note')}</p>
                {/* Replace with actual QR code image */}
                <img 
                  src="/images/upi-qr.jpg" 
                  alt={t('donate_qr_label')} 
                  className="qr-image"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>

          <div className="supported-apps">
            <h3>{t('donate_apps_title')}</h3>
            <div className="apps-grid">
              <div className="app-item">
                <div className="app-icon">GPay</div>
                <span>Google Pay</span>
              </div>
              <div className="app-item">
                <div className="app-icon">PhonePe</div>
                <span>PhonePe</span>
              </div>
              <div className="app-item">
                <div className="app-icon">Paytm</div>
                <span>Paytm</span>
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
              <a href="mailto:info@ashajyoti.org">info@ashajyoti.org</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate

