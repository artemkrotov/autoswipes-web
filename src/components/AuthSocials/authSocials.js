import React from 'react';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL, VK_AUTH_URL } from "../../constants";
import { useTranslation } from 'react-i18next';
import fb from "./fb.png";
import vk from "./vk.png";
import ggl from "./ggl.png";

export default () => {
    const { t } = useTranslation();

    return (
        <div className="auth-socials">
            <h3 className="auth-socials__header">{t('auth.authSocial')}</h3>
            <ul className="auth-socials__items">
                <li className="auth-socials__item">
                    <a href={FACEBOOK_AUTH_URL} className="auth-socials__link">
                        <img src={fb} alt="Facebook auth"/>
                    </a>
                </li>
                <li className="auth-socials__item" style={{"display": "none"}}>
                    <a href={VK_AUTH_URL} className="auth-socials__link">
                        <img src={vk} alt="VK auth"/>
                    </a>
                </li>
                <li className="auth-socials__item">
                    <a href={GOOGLE_AUTH_URL} className="auth-socials__link">
                        <img src={ggl} alt="Google auth"/>
                    </a>
                </li>
            </ul>
        </div>
    );
};
