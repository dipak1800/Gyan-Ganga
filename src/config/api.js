// API Configuration
// For production, use environment variables: import.meta.env.VITE_API_SECRET_KEY
export const API_CONFIG = {
  SECRET_KEY: import.meta.env.VITE_API_SECRET_KEY || 'your-secret-key-here-change-in-production',
  // Aspirant Form API URL
  ASPIRANT_API_URL: 'https://script.google.com/macros/s/AKfycbyNRJ8yWJmZmxgUmUC1faJtJm9Sv2eY0tHy2iOISStih6PEqnSFf-I8BOnrr-_XKwmrOw/exec',
  // Volunteer Form API URL
  VOLUNTEER_API_URL: 'https://script.google.com/macros/s/AKfycbx57NM_9l75dY03VgBvqD4nmlxGhXRHoxCfw1ON2z-2uiSxeUjZr6NPNmO3Ygx53dgJ2g/exec'
}

