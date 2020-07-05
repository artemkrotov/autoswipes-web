import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './header.scss';
import logotype from './logotype.png';
import logotypeColor from './logotype-color.png';

const Auth = () => {
    const user = useSelector(state => state.user);
    const { t } = useTranslation();

    if (user.isSignedIn) {
        return (
            <div className="header__auth">
                <Link to="/" className="header__auth-link">
                    {t('navigation.lk')}
                </Link>
                <Link to="/quit" className="header__auth-link header__auth-link--quit">
                    {t('navigation.quit')}
                </Link>
            </div>
        );
    } else {
        return (
            <div className="header__auth">
                <Link to="/register" className="header__auth-link">
                    {t('navigation.register')}
                </Link>
                <Link to="/login" className="header__auth-link header__auth-login">
                    {t('navigation.login')}
                </Link>
            </div>
        );
    }
}

const Navigation = withRouter(({ history }) => {
    const { t } = useTranslation();

    const [areMenusOpen, setAreMenusOpen] = useState(false);

    useEffect(() => history.listen(() => {
        setAreMenusOpen(false);
    }), [history, areMenusOpen]);

    const isMenuOpen = (state) => {
        setAreMenusOpen(state.isOpen);
        return state.isOpen;
    };

    if (document.documentElement.clientWidth <= 767) {
        return (
            <Menu right={true} onStateChange={ isMenuOpen } isOpen={areMenusOpen}>
                <div className="slide-menu-inner">
                    <div className="slide-menu">
                        <div className="slide-menu__logotype">
                            <img src={logotypeColor} className="slide-menu__logotype-image" alt="Logotype autoswipe"/>
                        </div>
                        <ul className="slide-menu__items">
                            <li className="slide-menu__item">
                                <a href="https://autoswipes.com/how" className="slide-menu__link">
                                    {t('navigation.howItWorks')}
                                </a>
                            </li>
                            <li className="slide-menu__item">
                                <Link to="/rates" className="slide-menu__link">
                                    {t('navigation.rates')}
                                </Link>
                            </li>
                            <li className="slide-menu__item">
                                <a href="https://autoswipes.com/faq" className="slide-menu__link">
                                    {t('navigation.faq')}
                                </a>
                            </li>
                        </ul>
                        <Auth />
                    </div>
                </div>
            </Menu>
        );
    } else {
        return '';
    }
});

function LegacyHeader() {
    const { t, i18n } = useTranslation();

    const currentLng = lg => {
        if (i18n.language === lg || window.localStorage.i18nextLng === lg) {
            return ' header__change-language-link--active';
        } else {
            return '';
        }
    };

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (
        <React.Fragment>
            <header id="header" className="header">
                <div className="header__inner container">
                    <div className="header__left">
                        <a href="https://autoswipes.com/how" className="header__link">
                            {t('navigation.howItWorks')}
                        </a>
                        <Link to="/rates" className="header__link">
                            {t('navigation.rates')}
                        </Link>
                        <a href="https://autoswipes.com/faq" className="header__link">
                            {t('navigation.faq')}
                        </a>
                    </div>

                    <div className="header__logotype">
                        <a href="https://autoswipes.com/">
                            <img src={logotype} className="header__logo-image" alt="Logotype autoswipe"/>
                        </a>
                    </div>

                    <div className="header__right">
                        <Auth />

                        <div className="header__change-language">
                            <button
                                className={"header__change-language-link" + currentLng('en')}
                                onClick={() => changeLanguage('en')} >
                                Eng
                            </button>
                            <span className="header__change-language-line">|</span>
                            <button
                                className={"header__change-language-link" + currentLng('ru')}
                                onClick={() => changeLanguage('ru')} >
                                Rus
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Navigation />
            <div className="header-cover"></div>
        </React.Fragment>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Header() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyHeader />
        </Suspense>
    );
}
