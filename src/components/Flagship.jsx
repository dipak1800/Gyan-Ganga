import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Flagship = () => {
    const { t } = useLanguage();

    return (
        <section className="flagship section" id="flagship">
            <div className="container">
                <div className="flagship__logo">
                    <img 
                        src="/images/program-logo.jpg" 
                        alt="Chhatrapati Shivaji Maharaj Gyan-Ganga Logo"
                    />
                </div>
                <h2 className="section__title saffron-underline">
                    {t('flagship_title')}
                </h2>
                <div className="flagship__content">
                    <p dangerouslySetInnerHTML={{
                        __html: t('flagship_p1').replace(
                            'Chhatrapati Shivaji Maharaj Gyan-Ganga',
                            '<strong>Chhatrapati Shivaji Maharaj Gyan-Ganga</strong>'
                        )
                    }} />
                </div>
            </div>
        </section>
    );
};

export default Flagship;

