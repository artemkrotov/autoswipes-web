import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import { Link } from 'react-router-dom';
// import { forgotPassword } from '../../helpers/api';
// import Alert from 'react-s-alert';

function LegacyForgot() {
    const [email, setEmail] = useState('');

    const { t } = useTranslation();

    const handleFormSubmit = () => {
        // const loginRequest = {email, password};
        //
        // login(loginRequest)
        //     .then(async response => {
        //         await localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        //
        //     }).catch(() => {
        //         Alert.error(t('validation.LOGIN_ERROR'));
        //     });
    }

    return (
        <div className="cabinet-wrap">
            <div className="cabinet-wrap__bg">password</div>
            <div className="cabinet-wrap__inner">
                <div className="cabinet-block">
                    <div className="auth">
                        <h2 className="auth__header">{t('auth.forgotHeader')}</h2>
                        <p className="auth__sub-header">{t('auth.forgotSubHeader')}</p>
                        <Input
                            inputType={"text"}
                            title={t('auth.labelEmail')}
                            name={"email"}
                            value={email}
                            placeholder={t('auth.enterEmail')}
                            handleChange={e => setEmail(e.target.value)}
                        />
                        <button className="auth__button" onClick={handleFormSubmit}>{t('auth.forgotSend')}</button>
                        <Link to="/login" className="auth__link">{t('auth.buttonLogin')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Forgot() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyForgot />
        </Suspense>
    );
}
