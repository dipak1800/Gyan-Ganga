import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { API_CONFIG } from '../config/api.js'
import Alert from '../components/Alert'
import './Volunteer.css'

function Volunteer() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
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
  const [alertMessage, setAlertMessage] = useState('')
  const [errors, setErrors] = useState({})

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return t('validation_name_required') || 'Name is required'
    }
    if (name.trim().length < 2) {
      return t('validation_name_min') || 'Name must be at least 2 characters'
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(name.trim())) {
      return t('validation_name_invalid') || 'Name can only contain letters, spaces, and basic punctuation'
    }
    return ''
  }

  const validateMobile = (mobile) => {
    if (!mobile.trim()) {
      return t('validation_mobile_required') || 'Mobile number is required'
    }
    if (!/^[0-9]{10}$/.test(mobile.trim())) {
      return t('validation_mobile_invalid') || 'Mobile number must be exactly 10 digits'
    }
    return ''
  }

  const validateEmail = (email) => {
    if (!email.trim()) {
      return t('validation_email_required') || 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return t('validation_email_invalid') || 'Please enter a valid email address'
    }
    return ''
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'fullName':
        error = validateName(value)
        break
      case 'mobile':
        error = validateMobile(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      default:
        break
    }
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
    return error === ''
  }

  const supportTypes = [
    { key: 'support_library', value: 'Modern Library & Study Centre' },
    { key: 'support_digital', value: 'Digital E-Learning & Computer Facilities' },
    { key: 'support_skill', value: 'Skill Development & Employment-Oriented Training' },
    { key: 'support_women', value: 'Women Empowerment & Entrepreneurship' },
    { key: 'support_career', value: 'Career Counselling & Competitive Exam Guidance' },
    { key: 'support_farmer', value: 'Farmer Training for Modern & Sustainable Agriculture' },
    { key: 'support_teaching', value: 'Teaching & Education' },
    { key: 'support_admin', value: 'Administrative Support' },
    { key: 'support_event', value: 'Event Management' },
    { key: 'support_fundraising', value: 'Fundraising' },
    { key: 'support_outreach', value: 'Community Outreach' },
    { key: 'support_other', value: 'Other' }
  ]

  // Prefill service name from URL parameter
  useEffect(() => {
    const serviceName = searchParams.get('service')
    if (serviceName) {
      const decodedServiceName = decodeURIComponent(serviceName)
      // Check if the service matches any support type and pre-select it
      const matchingSupportType = supportTypes.find(
        type => type.value === decodedServiceName
      )
      
      setFormData(prev => ({
        ...prev,
        supportTypes: matchingSupportType ? [matchingSupportType.value] : prev.supportTypes,
        message: `I am interested in volunteering for: ${decodedServiceName}`
      }))
    }
  }, [searchParams, supportTypes])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let processedValue = value
    
    // Restrict mobile to 10 digits only
    if (name === 'mobile') {
      processedValue = value.replace(/\D/g, '').slice(0, 10)
    }
    
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
        [name]: processedValue
      }))
      
      // Real-time validation
      if (name === 'fullName' || name === 'mobile' || name === 'email') {
        validateField(name, processedValue)
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    const nameError = validateName(formData.fullName)
    if (nameError) {
      newErrors.fullName = nameError
      isValid = false
    }

    const mobileError = validateMobile(formData.mobile)
    if (mobileError) {
      newErrors.mobile = mobileError
      isValid = false
    }

    const emailError = validateEmail(formData.email)
    if (emailError) {
      newErrors.email = emailError
      isValid = false
    }

    if (!formData.state) {
      newErrors.state = t('validation_state_required') || 'State is required'
      isValid = false
    }

    if (!formData.city.trim()) {
      newErrors.city = t('validation_city_required') || 'City is required'
      isValid = false
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = t('validation_occupation_required') || 'Occupation is required'
      isValid = false
    }

    if (formData.supportTypes.length === 0) {
      newErrors.supportTypes = t('validation_support_required') || 'Please select at least one support type'
      isValid = false
    }

    if (!formData.availability) {
      newErrors.availability = t('validation_availability_required') || 'Availability is required'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = t('validation_message_required') || 'Message is required'
      isValid = false
    }

    if (!formData.consent) {
      newErrors.consent = t('validation_consent_required') || 'You must agree to the terms'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error')
      setAlertMessage(t('validation_form_invalid') || 'Please correct the errors in the form')
      return
    }

    setSubmitting(true)
    setSubmitStatus(null)
    setAlertMessage('')

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
        setAlertMessage(t('form_success_volunteer'))
        setErrors({})
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
        setAlertMessage(t('form_error'))
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setAlertMessage(t('form_error'))
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
                  className={errors.fullName ? 'error' : ''}
                  required
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="mobile">{t('form_label_mobile')}</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? 'error' : ''}
                  required
                  maxLength="10"
                  placeholder="10 digits only"
                />
                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('form_label_email_required')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="state">{t('form_label_state')}</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                  required
                >
                  <option value="">{t('form_placeholder_state')}</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city">{t('form_label_city')}</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                  required
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="occupation">{t('form_label_occupation')}</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={errors.occupation ? 'error' : ''}
                  required
                  placeholder={t('form_placeholder_occupation')}
                />
                {errors.occupation && <span className="error-message">{errors.occupation}</span>}
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
                {errors.supportTypes && <span className="error-message">{errors.supportTypes}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="availability">{t('form_label_availability')}</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className={errors.availability ? 'error' : ''}
                  required
                >
                  <option value="">{t('form_placeholder_availability')}</option>
                  <option value="weekends">{t('form_option_weekends')}</option>
                  <option value="weekdays">{t('form_option_weekdays')}</option>
                  <option value="evenings">{t('form_option_evenings')}</option>
                  <option value="flexible">{t('form_option_flexible')}</option>
                  <option value="full-time">{t('form_option_fulltime')}</option>
                </select>
                {errors.availability && <span className="error-message">{errors.availability}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('form_label_message_required')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  rows="4"
                  required
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
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
                {errors.consent && <span className="error-message">{errors.consent}</span>}
              </div>

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

      <Alert
        type={submitStatus === 'success' ? 'success' : 'error'}
        message={alertMessage}
        isOpen={!!(submitStatus && alertMessage)}
        onClose={() => {
          setSubmitStatus(null)
          setAlertMessage('')
        }}
      />
    </div>
  )
}

export default Volunteer


