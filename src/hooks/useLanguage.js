import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export const useLanguage = () => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return { language, t, changeLanguage };
};

