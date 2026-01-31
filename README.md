# Asha Jyoti Rural Udaan Foundation - Website

A modern, scalable React application built with Vite for the Asha Jyoti Rural Udaan Foundation NGO website.

## Features

- ⚡ **Fast Development** - Built with Vite for lightning-fast HMR
- 🌐 **Multilingual Support** - English, Hindi, and Marathi
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- 📱 **Responsive Design** - Mobile-first, fully responsive layout
- 🎨 **Modern UI** - Beautiful, accessible interface
- 🚀 **React Router** - Client-side routing for seamless navigation
- 📝 **Form Handling** - Aspirant and Volunteer interest forms
- 💳 **Donation Page** - UPI QR code integration ready

## Project Structure

```
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx       # Navigation header with language/theme toggles
│   │   ├── Footer.jsx       # Site footer
│   │   └── *.css            # Component styles
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Foundation homepage
│   │   ├── Programs.jsx     # Programs listing
│   │   ├── GyanGanga.jsx    # Flagship project detail
│   │   ├── Apply.jsx        # Aspirant form
│   │   ├── Volunteer.jsx     # Volunteer form
│   │   ├── Donate.jsx       # Donation page
│   │   ├── PrivacyPolicy.jsx
│   │   └── *.css            # Page styles
│   ├── layouts/             # Layout components
│   │   └── Layout.jsx       # Main layout wrapper
│   ├── hooks/               # Custom React hooks
│   │   └── useTheme.js       # Theme management hook
│   ├── i18n/                # Internationalization
│   │   ├── useLanguage.js   # Language context & hook
│   │   └── translations.json # Translation strings
│   ├── data/                # Data files
│   │   └── programs.js      # Program data
│   ├── styles/              # Global styles
│   │   └── index.css        # Base styles & CSS variables
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Entry point
├── public/                  # Static assets
│   └── images/              # Image files
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Form Endpoints

Update the form submission endpoints in:
- `src/pages/Apply.jsx` - Line with `fetch('https://your-form-endpoint.com/submit')`
- `src/pages/Volunteer.jsx` - Line with `fetch('https://your-form-endpoint.com/submit')`

### Images

Place your images in the `public/images/` directory:
- `foundation-logo.png` - Foundation logo (transparent background)
- `program-logo.jpg` - Gyan Ganga program logo
- `program-infra-model.jpg` - Infrastructure model image
- `ravi.jpg` - Founder photo
- `upi-qr.jpg` - UPI QR code for donations

### Adding New Programs

1. Add program data to `src/data/programs.js`
2. The Programs listing page will automatically display new programs
3. Create a new route in `src/App.jsx` if needed

### Adding Translations

1. Add new translation keys to `src/i18n/translations.json`
2. Use the `useLanguage` hook in components: `const { t } = useLanguage()`
3. Use `t('key')` to get translated text

## Routes

- `/` - Home page
- `/programs` - Programs listing
- `/programs/gyan-ganga` - Gyan Ganga project detail
- `/apply` - Aspirant interest form
- `/volunteer` - Volunteer support form
- `/donate` - Donation page
- `/privacy-policy` - Privacy policy

## Features in Detail

### Language Support

The app supports three languages:
- English (en) - Default
- Hindi (hi)
- Marathi (mr)

Language preference is saved in localStorage and persists across sessions.

### Theme Toggle

Users can toggle between light and dark themes. The preference is saved in localStorage.

### Responsive Design

- Mobile-first approach
- Breakpoints at 968px and 576px
- Mobile drawer menu
- Responsive grid layouts

### Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Focus indicators
- Reduced motion support

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with CSS variables for theming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Asha Jyoti Rural Udaan Foundation. All rights reserved.

## Contact

For questions or support, contact: info@ashajyoti.org

