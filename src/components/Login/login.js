import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, getUser } from '../../helpers/api';
import { ACCESS_TOKEN } from '../../constants';
import AuthSocials from '../AuthSocials';
import Alert from 'react-s-alert';

function LegacyLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleFormSubmit = e => {
        e.preventDefault();

        const loginRequest = {email, password};

        login(loginRequest)
            .then(async response => {
                await localStorage.setItem(ACCESS_TOKEN, response.accessToken);

                getUser().then(response => {
                    dispatch({
                        type: 'PAST_USER',
                        payload: {
                            isSignedIn: true,
                            email: response.email,
                            license: response.license,
                            message: response.message || '',
                            key: response.token
                        }
                    });

                    Alert.success(t('auth.successFetch'));
                }).catch(() => {
                    localStorage.removeItem(ACCESS_TOKEN);

                    Alert.error(t('auth.errorFetch'));
                });

            }).catch(() => {
                Alert.error(t('validation.LOGIN_ERROR'));
            });
    }

    return (
        <div className="cabinet-wrap">
            <div className="cabinet-wrap__bg">autorisation</div>
            <div className="cabinet-wrap__inner">
                <div className="cabinet-block">
                    <form onSubmit={handleFormSubmit} className="auth">
                        <h2 className="auth__header">{t('auth.login')}</h2>
                        <Input
                            inputType={"text"}
                            title={t('auth.labelEmail')}
                            name={"email"}
                            value={email}
                            placeholder={t('auth.enterEmail')}
                            handleChange={e => setEmail(e.target.value)}
                        />
                        <Input
                            inputType={"password"}
                            title={t('auth.labelPassword')}
                            name={"password"}
                            value={password}
                            placeholder={t('auth.enterPassword')}
                            handleChange={e => setPassword(e.target.value)}
                        />
                        <button className="auth__button">{t('auth.buttonLogin')}</button>
                        <Link to="/forgot" className="auth__link">{t('auth.forgotLink')}</Link>
                        <Link to="/register" className="auth__link">{t('auth.buttonRegister')}</Link>
                        <AuthSocials />
                    </form>
                </div>
            </div>
        </div>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Login() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyLogin />
        </Suspense>
    );
}
