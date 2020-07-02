import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input/Input';
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

    const handleFormSubmit = () => {
        const loginRequest = {email, password};

        // var xhr = new XMLHttpRequest();
        // xhr.open('GET', 'https://api.autoswipes.com/api/customer/current', false);
        // xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwiaWF0IjoxNTkzNjE5OTY5LCJleHAiOjE1OTQ0ODM5Njl9.dpfRNsx7s4GiUcZelkh80SS_shmwqNpSuYQuXvnfopvtox5RFS2yvtalpNPT-6R4l5taZra_Z_krteU8rWeanQ');
        // xhr.send();

        login(loginRequest)
            .then(async response => {
                await localStorage.setItem(ACCESS_TOKEN, response.accessToken);

                getUser().then(response => {
                    dispatch({
                        type: 'PAST_USER',
                        payload: {
                            isSignedIn: true,
                            email: response.email
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
                    <div className="auth">
                        <h2 className="auth__header">{t('auth.login')}</h2>
                        <Input
                            inputType={"text"}
                            title={"email"}
                            name={"email"}
                            value={email}
                            placeholder={t('auth.enterEmail')}
                            handleChange={e => setEmail(e.target.value)}
                        />
                        <Input
                            inputType={"password"}
                            title={"password"}
                            name={"password"}
                            value={password}
                            placeholder={t('auth.enterPassword')}
                            handleChange={e => setPassword(e.target.value)}
                        />
                        <button className="auth__button" onClick={handleFormSubmit}>{t('auth.buttonLogin')}</button>
                        <Link to="/register" className="auth__link">Забыл пароль?</Link>
                        <Link to="/register" className="auth__link">{t('auth.buttonRegister')}</Link>
                        <AuthSocials />
                    </div>
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
