import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const About = () => {
    const { t } = useLanguage();

    return (
        <section className="about section" id="about">
            <div className="container">
                <div className="section__badge">{t('about_badge')}</div>
                <h2 className="section__title">{t('about_title')}</h2>
                <div className="about__content">
                    <p>{t('about_p1')}</p>
                    <p>{t('about_p2')}</p>
                </div>
            </div>
        </section>
    );
};

export default About;

