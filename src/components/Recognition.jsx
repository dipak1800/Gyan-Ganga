import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Recognition = () => {
    const { t } = useLanguage();

    const recognitionItems = [
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            ),
            title: 'recog1_title',
            desc: 'recog1_desc'
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <polyline points="17 2 12 7 7 2"></polyline>
                </svg>
            ),
            title: 'recog2_title',
            desc: 'recog2_desc'
        }
    ];

    return (
        <section className="recognition section" id="recognition">
            <div className="container">
                <h2 className="section__title">{t('recognition_title')}</h2>
                <p className="recognition__intro">
                    {t('recognition_intro')}
                </p>
                <div className="recognition__grid">
                    {recognitionItems.map((item, index) => (
                        <div key={index} className="recognition-card">
                            <div className="recognition-icon">
                                {item.icon}
                            </div>
                            <h3>{t(item.title)}</h3>
                            <p>{t(item.desc)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recognition;

