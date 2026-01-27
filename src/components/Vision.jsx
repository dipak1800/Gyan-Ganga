import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Vision = () => {
    const { t } = useLanguage();

    return (
        <section className="vision section">
            <div className="container">
                <h2 className="section__title">{t('vision_title')}</h2>
                <div className="vision__content">
                    <p>{t('vision_p1')}</p>
                </div>
            </div>
        </section>
    );
};

export default Vision;

