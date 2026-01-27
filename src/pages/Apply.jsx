import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './Apply.css'

function Apply() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    district: '',
    ageGroup: '',
    program: 'gyan-ganga',
    areaOfInterest: '',
    message: '',
    consent: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)

    try {
      // Replace with your actual form endpoint
      const response = await fetch('https://your-form-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          district: '',
          ageGroup: '',
          program: 'gyan-ganga',
          areaOfInterest: '',
          message: '',
          consent: false
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="apply-page">
      <section className="apply-hero section">
        <div className="container">
          <h1 className="section__title">{t('apply_title')}</h1>
          <p className="apply-hero__desc">{t('apply_desc')}</p>
        </div>
      </section>

      <section className="apply-form-section section">
        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="aspirant-form">
              <div className="form-group">
                <label htmlFor="fullName">{t('form_label_fullname')}</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">{t('form_label_mobile')}</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('form_label_email_optional')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="district">{t('form_label_district')}</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ageGroup">{t('form_label_age')}</label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('form_placeholder_age')}</option>
                  <option value="15-18">{t('form_option_age_15_18')}</option>
                  <option value="19-25">{t('form_option_age_19_25')}</option>
                  <option value="26-35">{t('form_option_age_26_35')}</option>
                  <option value="36+">{t('form_option_age_36')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="program">{t('form_label_program')}</label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                >
                  <option value="gyan-ganga">Chhatrapati Shivaji Maharaj Gyan-Ganga</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="areaOfInterest">{t('form_label_interest')}</label>
                <input
                  type="text"
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  required
                  placeholder={t('form_placeholder_interest')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('form_label_message_optional')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                  />
                  <span>{t('form_consent_apply')}</span>
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="form-message success">
                  {t('form_success_apply')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message error">
                  {t('form_error')}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || submitStatus === 'success'}
              >
                {submitting ? t('form_submitting') : t('form_submit')}
              </button>
            </form>

            <div className="form-note">
              <p><strong>{t('form_note_label')}</strong> {t('form_note_text')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Apply

