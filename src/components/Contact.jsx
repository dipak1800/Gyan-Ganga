import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <h2 className="section__title">{t('contact_title')}</h2>
                <div className="contact__content">
                    <div className="contact__info">
                        <h3 className="contact__org">{t('contact_org')}</h3>
                        <div className="contact__item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <div>
                                <p>{t('contact_addr1')}</p>
                                <p>{t('contact_addr2')}</p>
                            </div>
                        </div>
                        <div className="contact__item">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <a href="tel:+919923139542">+91 99231 39542</a>
                        </div>
                    </div>
                    <div className="contact__map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.892!2d74.46!3d16.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQxJzI0LjAiTiA3NMKwMjcnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                            width="100%" 
                            height="300" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Asha Jyoti Rural Udaan Foundation Location"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

