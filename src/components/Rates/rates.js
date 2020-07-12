import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import './rates.scss';
import logoPrem from './logo-prem.png';
import logoStand from './logo-stand.png';

function LegacyRates () {
    const { t } = useTranslation();

    return (
        <div className="rates">
            <h2 className="rates__header rates__header--premium">Premium</h2>
            <div className="rates__container">
                <div className="rates__item">
                    <div className="rates__block">
                        <img src={logoPrem} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.month')}</div>
                        <div className="rates__sale" style={{'opacity': 0}}>{t('rates.saving1')}</div>
                        <div className="rates__text">{t('rates.autoMessaging')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth')}</div>
                        <div className="rates__text">{t('rates.params')}</div>
                        <div className="rates__text">{t('rates.match')}</div>
                        <a href="/" className="rates__button">{t('rates.buy')}</a>
                        <div className="rates__subtext">{t('rates.price1')}</div>
                    </div>
                </div>

                <div className="rates__item">
                    <div className="rates__block">
                        <img src={logoPrem} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.year')}</div>
                        <div className="rates__sale">{t('rates.saving1')}</div>
                        <div className="rates__text">{t('rates.autoMessaging')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth')}</div>
                        <div className="rates__text">{t('rates.params')}</div>
                        <div className="rates__text">{t('rates.match')}</div>
                        <a href="/" className="rates__button">{t('rates.buy')}</a>
                        <div className="rates__subtext">{t('rates.price2')}</div>
                    </div>
                </div>
            </div>

            <h2 className="rates__header">Standart</h2>
            <div className="rates__container">
                <div className="rates__item">
                    <div className="rates__block rates__block--stand">
                        <img src={logoStand} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.month')}</div>
                        <div className="rates__sale" style={{'opacity': 0}}>{t('rates.saving2')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth2')}</div>
                        <div className="rates__text">{t('rates.sec')}</div>
                        <div className="rates__text">{t('rates.autoMessaging2')}</div>
                        <a href="/" className="rates__button">{t('rates.buy')}</a>
                        <div className="rates__subtext">{t('rates.price3')}</div>
                    </div>
                </div>

                <div className="rates__item">
                    <div className="rates__block rates__block--stand">
                        <img src={logoStand} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.year')}</div>
                        <div className="rates__sale">{t('rates.saving2')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth2')}</div>
                        <div className="rates__text">{t('rates.sec')}</div>
                        <div className="rates__text">{t('rates.autoMessaging2')}</div>
                        <a href="/" className="rates__button">{t('rates.buy')}</a>
                        <div className="rates__subtext">{t('rates.price4')}</div>
                    </div>
                </div>
            </div>

            <div className="rates-questions" style={{"display": "none"}}>
                <div className="rates-questions__item">
                    <div className="rates-questions__header">Lorem ipsum dolor sit amet, consectetur adipisicing elit? </div>
                    <div className="rates-questions__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</div>
                </div>
                <div className="rates-questions__item">
                    <div className="rates-questions__header">Lorem ipsum dolor sit amet, consectetur adipisicing elit? </div>
                    <div className="rates-questions__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</div>
                </div>
                <div className="rates-questions__item">
                    <div className="rates-questions__header">Lorem ipsum dolor sit amet, consectetur adipisicing elit? </div>
                    <div className="rates-questions__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </div>
            </div>
        </div>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Rates() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyRates />
        </Suspense>
    );
};
