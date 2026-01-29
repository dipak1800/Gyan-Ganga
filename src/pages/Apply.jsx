import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { API_CONFIG } from '../config/api.js'
import Alert from '../components/Alert'
import './Apply.css'

function Apply() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    state: '',
    district: '',
    ageGroup: '',
    program: 'gyan-ganga',
    areaOfInterest: '',
    message: '',
    consent: false
  })

  // Prefill service name from URL parameter
  useEffect(() => {
    const serviceName = searchParams.get('service')
    if (serviceName) {
      const decodedServiceName = decodeURIComponent(serviceName)
      setFormData(prev => ({
        ...prev,
        areaOfInterest: decodedServiceName,
        message: `I am interested in applying for: ${decodedServiceName}`
      }))
    }
  }, [searchParams])

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let processedValue = value
    
    // Restrict mobile to 10 digits only
    if (name === 'mobile') {
      processedValue = value.replace(/\D/g, '').slice(0, 10)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }))

    // Real-time validation
    if (type !== 'checkbox' && (name === 'fullName' || name === 'mobile' || name === 'email')) {
      validateField(name, processedValue)
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

    if (!formData.district.trim()) {
      newErrors.district = t('validation_district_required') || 'District is required'
      isValid = false
    }

    if (!formData.ageGroup) {
      newErrors.ageGroup = t('validation_age_required') || 'Age group is required'
      isValid = false
    }

    if (!formData.areaOfInterest.trim()) {
      newErrors.areaOfInterest = t('validation_interest_required') || 'Area of interest is required'
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
        district: formData.district,
        ageGroup: formData.ageGroup,
        program: formData.program,
        areaOfInterest: formData.areaOfInterest,
        message: formData.message || '',
        consent: formData.consent ? 'Yes' : 'No',
        timestamp: new Date().toISOString()
      }

      const response = await fetch(API_CONFIG.ASPIRANT_API_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      // Check if response is ok (status 200-299)
      if (response.ok || response.status === 0) {
        // Status 0 can occur with CORS, which is acceptable for Google Apps Script
        setSubmitStatus('success')
        setAlertMessage(t('form_success_apply'))
        setErrors({})
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          state: '',
          district: '',
          ageGroup: '',
          program: 'gyan-ganga',
          areaOfInterest: '',
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
                <label htmlFor="district">{t('form_label_district')}</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={errors.district ? 'error' : ''}
                  required
                />
                {errors.district && <span className="error-message">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ageGroup">{t('form_label_age')}</label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleChange}
                  className={errors.ageGroup ? 'error' : ''}
                  required
                >
                  <option value="">{t('form_placeholder_age')}</option>
                  <option value="15-18">{t('form_option_age_15_18')}</option>
                  <option value="19-25">{t('form_option_age_19_25')}</option>
                  <option value="26-35">{t('form_option_age_26_35')}</option>
                  <option value="36+">{t('form_option_age_36')}</option>
                </select>
                {errors.ageGroup && <span className="error-message">{errors.ageGroup}</span>}
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
                  className={errors.areaOfInterest ? 'error' : ''}
                  required
                  placeholder={t('form_placeholder_interest')}
                />
                {errors.areaOfInterest && <span className="error-message">{errors.areaOfInterest}</span>}
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

            <div className="form-note">
              <p><strong>{t('form_note_label')}</strong> {t('form_note_text')}</p>
            </div>
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

export default Apply

