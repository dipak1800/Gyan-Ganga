import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage.jsx'
import { useTheme } from '../hooks/useTheme'
import './Header.css'

function Header() {
  const { language, changeLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [asideOpen, setAsideOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' }
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleAside = () => {
    setAsideOpen(!asideOpen)
  }

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setAsideOpen(false)
  }

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <img 
            src="/images/foundation-logo.jpg" 
            alt="Asha Jyoti Rural Udaan Foundation Logo" 
            className="logo-img"
          />
          <span className="logo-text">Asha Jyoti</span>
        </div>

        <div className={`nav__menu ${mobileMenuOpen ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenus}>
                {t('nav_about')}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/programs" className="nav__link" onClick={closeMenus}>
                {t('nav_programs')}
              </NavLink>
            </li>
            <li className="nav__item mobile-only">
              <button className="nav__link" onClick={() => { closeMenus(); toggleAside(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                {t('aside_flagship')}
              </button>
            </li>
            <li className="nav__item mobile-only">
              <NavLink to="/apply" className="nav__link" onClick={closeMenus}>
                {t('aside_aspirant')}
              </NavLink>
            </li>
            <li className="nav__item mobile-only">
              <NavLink to="/volunteer" className="nav__link" onClick={closeMenus}>
                {t('aside_volunteer')}
              </NavLink>
            </li>
            <li className="nav__item mobile-only">
              <NavLink to="/donate" className="nav__link" onClick={closeMenus}>
                {t('aside_donate')}
              </NavLink>
            </li>
          </ul>

          {/* Mobile Language Switcher */}
          <div className="mobile-lang-section">
            <div className="mobile-lang-label">{t('nav_language')}</div>
            <div className="language-switcher mobile-only">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                  aria-label={`Switch to ${lang.label}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="nav__close" onClick={closeMenus}>
            <span>&times;</span>
          </div>
        </div>

        <div className="nav__actions">
          {/* Desktop Language Switcher */}
          <div className="language-switcher desktop-only">
            {languages.map(lang => (
              <button
                key={lang.code}
                className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                onClick={() => changeLanguage(lang.code)}
                aria-label={`Switch to ${lang.label}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            <svg className="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg className="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <div className="nav__toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Aside/Drawer */}
      <aside className={`aside ${asideOpen ? 'aside-open' : ''}`}>
        <div className="aside__header">
          <h3>{t('aside_flagship')}</h3>
          <button className="aside__close" onClick={toggleAside}>&times;</button>
        </div>
        <div className="aside__content">
          <div className="aside__section">
            <NavLink to="/programs/gyan-ganga" className="aside__link" onClick={closeMenus}>
              Chhatrapati Shivaji Maharaj Gyan-Ganga
            </NavLink>
          </div>
          
          <div className="aside__section">
            <h4>{t('aside_get_involved')}</h4>
            <NavLink to="/apply" className="aside__link" onClick={closeMenus}>
              {t('aside_aspirant')}
            </NavLink>
            <NavLink to="/volunteer" className="aside__link" onClick={closeMenus}>
              {t('aside_volunteer')}
            </NavLink>
            <NavLink to="/donate" className="aside__link" onClick={closeMenus}>
              {t('aside_donate')}
            </NavLink>
          </div>

          <div className="aside__badge">
            <span>{t('aside_inauguration')}</span>
            <small>21st Feb 2026</small>
          </div>
        </div>
      </aside>

      {/* Aside Toggle Button (Desktop) */}
      <button 
        className="aside-toggle-btn desktop-only" 
        onClick={toggleAside}
        aria-label="Toggle aside menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Overlay for mobile and aside */}
      {(mobileMenuOpen || asideOpen) && (
        <div className="overlay" onClick={closeMenus}></div>
      )}
    </header>
  )
}

export default Header

