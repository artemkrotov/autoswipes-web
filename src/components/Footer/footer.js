import React, {Suspense} from 'react';
import { useTranslation } from 'react-i18next';
import './footer.scss';
import logotype from './logotype.png';
import {ReactComponent as Facebook} from './facebook.svg';
import {ReactComponent as Vk} from './vk.svg';
import {ReactComponent as Instagram} from './instagram.svg';

function LegacyFooter() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer__inner container">
                <a href="https://autoswipes.com/" className="footer__logotype">
                    <img src={logotype} alt="Logotype autoswipes"/>
                </a>
                <ul className="footer-nav">
                    <li className="footer-nav__item">
                        <a href="https://autoswipes.com/how" className="footer-nav__link">
                            {t('navigation.howItWorks')}
                        </a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="https://autoswipes.com/tarif" className="footer-nav__link">
                            {t('navigation.rates')}
                        </a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="https://autoswipes.com/faq" className="footer-nav__link">
                            {t('navigation.faq')}
                        </a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="https://autoswipes.com/offer" className="footer-nav__link">
                            {t('navigation.publicOffer')}
                        </a>
                    </li>
                    <li className="footer-nav__item">
                        <a href="https://autoswipes.com/privacy" className="footer-nav__link">
                            {t('navigation.privacyPolicy')}
                        </a>
                    </li>
                </ul>
                <ul className="footer-social">
                    <li className="footer-social__item">
                        <a href="https://www.facebook.com/Autoswipes-108168317640109" target="_blank"rel="noopener noreferrer" className="footer-social__link">
                            <Facebook className="footer-social__icon" />
                        </a>
                    </li>
                    <li className="footer-social__item">
                        <a href="https://www.instagram.com/autoswipes" target="_blank"rel="noopener noreferrer" className="footer-social__link">
                            <Instagram className="footer-social__icon" />
                        </a>
                    </li>
                    <li className="footer-social__item">
                        <a href="https://vk.com/autoswipes" target="_blank"rel="noopener noreferrer" className="footer-social__link">
                            <Vk className="footer-social__icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Footer() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyFooter />
        </Suspense>
    );
};
