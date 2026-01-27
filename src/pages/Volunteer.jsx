import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.jsx'
import './Volunteer.css'

function Volunteer() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    supportTypes: [],
    availability: '',
    message: '',
    consent: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const supportTypes = [
    { key: 'support_teaching', value: 'Teaching & Education' },
    { key: 'support_skill', value: 'Skill Development Training' },
    { key: 'support_admin', value: 'Administrative Support' },
    { key: 'support_event', value: 'Event Management' },
    { key: 'support_digital', value: 'Digital & IT Support' },
    { key: 'support_fundraising', value: 'Fundraising' },
    { key: 'support_outreach', value: 'Community Outreach' },
    { key: 'support_other', value: 'Other' }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      if (name === 'supportTypes') {
        setFormData(prev => ({
          ...prev,
          supportTypes: checked
            ? [...prev.supportTypes, value]
            : prev.supportTypes.filter(item => item !== value)
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
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
          city: '',
          supportTypes: [],
          availability: '',
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
    <div className="volunteer-page">
      <section className="volunteer-hero section">
        <div className="container">
          <h1 className="section__title">{t('volunteer_title')}</h1>
          <p className="volunteer-hero__desc">{t('volunteer_desc')}</p>
        </div>
      </section>

      <section className="volunteer-form-section section">
        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="volunteer-form">
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
                <label htmlFor="email">{t('form_label_email_required')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">{t('form_label_city')}</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t('form_label_support')}</label>
                <div className="checkbox-list">
                  {supportTypes.map((type, index) => (
                    <label key={index} className="checkbox-item">
                      <input
                        type="checkbox"
                        name="supportTypes"
                        value={type.value}
                        checked={formData.supportTypes.includes(type.value)}
                        onChange={handleChange}
                      />
                      <span>{t(type.key)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="availability">{t('form_label_availability')}</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('form_placeholder_availability')}</option>
                  <option value="weekends">{t('form_option_weekends')}</option>
                  <option value="weekdays">{t('form_option_weekdays')}</option>
                  <option value="evenings">{t('form_option_evenings')}</option>
                  <option value="flexible">{t('form_option_flexible')}</option>
                  <option value="full-time">{t('form_option_fulltime')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('form_label_message_required')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
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
                  <span>{t('form_consent_volunteer')}</span>
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="form-message success">
                  {t('form_success_volunteer')}
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default Volunteer

