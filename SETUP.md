# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   Open your browser to `http://localhost:5173`

## Important Configuration

### Form Endpoints

Before deploying, update the form submission endpoints:

**File: `src/pages/Apply.jsx`**
- Line ~45: Replace `'https://your-form-endpoint.com/submit'` with your actual endpoint

**File: `src/pages/Volunteer.jsx`**
- Line ~75: Replace `'https://your-form-endpoint.com/submit'` with your actual endpoint

### UPI QR Code

**File: `src/pages/Donate.jsx`**
- Add your UPI QR code image to `public/images/upi-qr.jpg`
- Or update the image path in the component

### Images

All images should be in `public/images/`:
- ✅ `foundation-logo.jpg` - Already present
- ✅ `program-logo.jpg` - Already present
- ✅ `program-infra-model.jpg` - Already present
- ✅ `ravi.jpg` - Already present
- ⚠️ `upi-qr.jpg` - Add your UPI QR code here

## Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready to deploy to any static hosting service.

## Deployment

You can deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Any static hosting**: Upload the `dist` folder contents

## Features Checklist

- ✅ React Router setup with all routes
- ✅ Header with navigation, language switcher, theme toggle
- ✅ Mobile-responsive drawer menu
- ✅ Aside sidebar with flagship projects and CTAs
- ✅ Home page with all sections
- ✅ Programs listing page
- ✅ Gyan Ganga detail page
- ✅ Aspirant form (needs endpoint configuration)
- ✅ Volunteer form (needs endpoint configuration)
- ✅ Donation page (needs UPI QR code)
- ✅ Privacy Policy page
- ✅ Footer component
- ✅ i18n support (English, Hindi, Marathi)
- ✅ Dark/Light theme toggle
- ✅ Data-driven program content

## Next Steps

1. Configure form endpoints
2. Add UPI QR code image
3. Test all forms
4. Review translations
5. Customize colors/branding if needed
6. Deploy to production

