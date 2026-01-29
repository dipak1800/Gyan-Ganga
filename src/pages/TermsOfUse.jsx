import { useLanguage } from '../i18n/useLanguage.jsx'
import './TermsOfUse.css'

function TermsOfUse() {
  const { t } = useLanguage()

  return (
    <div className="terms-page">
      <section className="terms-hero section">
        <div className="container">
          <h1 className="section__title">{t('terms_title')}</h1>
          <p className="terms-effective-date">{t('terms_effective_date')}</p>
        </div>
      </section>

      <section className="terms-content section">
        <div className="container">
          <div className="terms-content__wrapper">
            <div className="terms-section">
              <h2>{t('terms_section1_title')}</h2>
              <p>{t('terms_section1_content')}</p>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section2_title')}</h2>
              <p>{t('terms_section2_p1')}</p>
              <ul>
                <li>{t('terms_section2_li1')}</li>
                <li>{t('terms_section2_li2')}</li>
              </ul>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section3_title')}</h2>
              <p>{t('terms_section3_p1')}</p>
              <ul>
                <li>{t('terms_section3_li1')}</li>
                <li>{t('terms_section3_li2')}</li>
                <li>{t('terms_section3_li3')}</li>
              </ul>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section4_title')}</h2>
              <p>{t('terms_section4_p1')}</p>
              <ul>
                <li>{t('terms_section4_li1')}</li>
                <li>{t('terms_section4_li2')}</li>
              </ul>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section5_title')}</h2>
              <p>{t('terms_section5_p1')}</p>
              <p>{t('terms_section5_p2')}</p>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section6_title')}</h2>
              <p>{t('terms_section6_p1')}</p>
              <p>{t('terms_section6_p2')}</p>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section7_title')}</h2>
              <p>{t('terms_section7_p1')}</p>
              <p>{t('terms_section7_p2')}</p>
            </div>

            <div className="terms-section">
              <h2>{t('terms_section8_title')}</h2>
              <p>{t('terms_section8_p1')}</p>
              <p className="terms-contact-email">
                <strong>{t('terms_email_label')}:</strong>{' '}
                <a href="mailto:contact@ashajyotiruraludaan.org">{t('terms_email')}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfUse

