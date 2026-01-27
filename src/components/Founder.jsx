import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Founder = () => {
    const { t } = useLanguage();

    return (
        <section className="founder section" id="founder">
            <div className="container">
                <h2 className="section__title">{t('founder_title')}</h2>
                <div className="founder__content">
                    <div className="founder__image">
                        <img 
                            src="/images/ravi.jpg" 
                            alt="Ravi P. Upadhyay - Founder"
                        />
                    </div>
                    <div className="founder__info">
                        <h3 className="founder__name">Ravi P. Upadhyay</h3>
                        <p className="founder__designation">
                            {t('founder_designation')}
                        </p>
                        <p className="founder__bio">
                            {t('founder_bio')}
                        </p>
                        <blockquote className="founder__quote">
                            <p>{t('founder_quote')}</p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;

