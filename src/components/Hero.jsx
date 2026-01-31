import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { smoothScrollTo } from '../utils/smoothScroll';

const Hero = () => {
    const { t } = useLanguage();

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        smoothScrollTo(targetId);
    };

    return (
        <section className="hero section" id="home">
            <div className="hero__container container">
                <div className="hero__content">
                    <div className="hero__logo">
                        <img 
                            src="/images/foundation-logo.png" 
                            alt="Asha Jyoti Rural Udaan Foundation"
                        />
                    </div>
                    <h1 className="hero__title">
                        {t('hero_title')}
                    </h1>
                    <div className="hero__subtitle">
                        <p className="hero__org">{t('hero_org')}</p>
                        <p className="hero__flagship">
                            {t('hero_flagship').split(':')[0]}: <span className="highlight">
                                {t('hero_flagship').split(':')[1]?.trim()}
                            </span>
                        </p>
                    </div>
                    <p className="hero__tagline">{t('hero_tagline')}</p>
                    <div className="hero__buttons">
                        <a 
                            href="#about" 
                            className="btn btn-primary"
                            onClick={(e) => handleSmoothScroll(e, '#about')}
                        >
                            {t('hero_btn1')}
                        </a>
                        <a 
                            href="#flagship" 
                            className="btn btn-secondary"
                            onClick={(e) => handleSmoothScroll(e, '#flagship')}
                        >
                            {t('hero_btn2')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

