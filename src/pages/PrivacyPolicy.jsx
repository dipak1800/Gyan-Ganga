import { useLanguage } from '../i18n/useLanguage.jsx'
import './PrivacyPolicy.css'

function PrivacyPolicy() {
  const { t } = useLanguage()

  return (
    <div className="privacy-policy-page">
      <section className="privacy-hero section">
        <div className="container">
          <h1 className="section__title">{t('privacy_title')}</h1>
        </div>
      </section>

      <section className="privacy-content section">
        <div className="container">
          <div className="privacy-section">
            <h2>{t('privacy_data_title')}</h2>
            <p>{t('privacy_data_intro')}</p>
            <ul>
              <li>{t('privacy_data_item1')}</li>
              <li>{t('privacy_data_item2')}</li>
              <li>{t('privacy_data_item3')}</li>
              <li>{t('privacy_data_item4')}</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>{t('privacy_purpose_title')}</h2>
            <p>{t('privacy_purpose_intro')}</p>
            <ul>
              <li>{t('privacy_purpose_item1')}</li>
              <li>{t('privacy_purpose_item2')}</li>
              <li>{t('privacy_purpose_item3')}</li>
              <li>{t('privacy_purpose_item4')}</li>
              <li>{t('privacy_purpose_item5')}</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>{t('privacy_sharing_title')}</h2>
            <p>{t('privacy_sharing_text')}</p>
          </div>

          <div className="privacy-section">
            <h2>{t('privacy_security_title')}</h2>
            <p>{t('privacy_security_text')}</p>
          </div>

          <div className="privacy-section">
            <h2>{t('privacy_rights_title')}</h2>
            <p>{t('privacy_rights_intro')}</p>
            <ul>
              <li>{t('privacy_rights_item1')}</li>
              <li>{t('privacy_rights_item2')}</li>
              <li>{t('privacy_rights_item3')}</li>
              <li>{t('privacy_rights_item4')}</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>{t('privacy_contact_title')}</h2>
            <p>
              {t('privacy_contact_text')}{' '}
              <a href="mailto:info@ashajyoti.org">info@ashajyoti.org</a>
            </p>
          </div>

          <div className="privacy-section">
            <h2>{t('privacy_updates_title')}</h2>
            <p>{t('privacy_updates_text')}</p>
            <p><strong>{t('privacy_last_updated')}</strong> January 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy

