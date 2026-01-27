import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Updates = () => {
    const { t } = useLanguage();

    return (
        <section className="updates section" id="updates">
            <div className="container">
                <h2 className="section__title">{t('updates_title')}</h2>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content announcement-block">
                            <div className="announcement-logo">
                                <img 
                                    src="/images/program-logo.jpg" 
                                    alt="Chhatrapati Shivaji Maharaj Gyan-Ganga"
                                />
                            </div>
                            <div className="announcement-header">
                                <h3>{t('update_event')}</h3>
                                <span className="announcement-date">{t('update_date')}</span>
                            </div>
                            <div className="announcement-details">
                                <p>{t('update_p1')}</p>
                                <p>{t('update_p2')}</p>
                                <p dangerouslySetInnerHTML={{
                                    __html: t('update_p3').replace(
                                        'Honourable Chhatrapati Rajarshi Shahu Maharaj Saheb of Kolhapur',
                                        '<strong>Honourable Chhatrapati Rajarshi Shahu Maharaj Saheb of Kolhapur</strong>'
                                    )
                                }} />
                                <div className="announcement-image">
                                    <img 
                                        src="/images/program-infra-model.jpg" 
                                        alt="Gyan-Ganga Campus Infrastructure Model"
                                    />
                                </div>
                            </div>
                            <div className="announcement-location">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>{t('update_location')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Updates;

