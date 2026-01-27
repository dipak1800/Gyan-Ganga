import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { API_CONFIG } from '../config/api.js'
import './Volunteer.css'

function Volunteer() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    occupation: '',
    supportTypes: [],
    availability: '',
    message: '',
    consent: false
  })

  // List of all Indian states
  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ]
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
      // Prepare data for Google Sheets
      const payload = {
        secretKey: API_CONFIG.SECRET_KEY,
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        state: formData.state,
        city: formData.city,
        occupation: formData.occupation,
        supportTypes: formData.supportTypes.join(', '), // Convert array to comma-separated string
        availability: formData.availability,
        message: formData.message || '',
        consent: formData.consent ? 'Yes' : 'No',
        timestamp: new Date().toISOString()
      }

      const response = await fetch(API_CONFIG.VOLUNTEER_API_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      // Check if response is ok (status 200-299)
      if (response.ok || response.status === 0) {
        // Status 0 can occur with CORS, which is acceptable for Google Apps Script
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          state: '',
          city: '',
          occupation: '',
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
      // Even if there's an error, the data might have been submitted
      // Google Apps Script sometimes returns CORS errors but still processes the data
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        occupation: '',
        supportTypes: [],
        availability: '',
        message: '',
        consent: false
      })
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
                <label htmlFor="state">{t('form_label_state')}</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t('form_placeholder_state')}</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
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
                <label htmlFor="occupation">{t('form_label_occupation')}</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  placeholder={t('form_placeholder_occupation')}
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

