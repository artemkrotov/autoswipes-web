import React, { Suspense, useState } from 'react';
import Input from '../Input/Input';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthSocials from '../AuthSocials';
import {getUser, signup} from "../../helpers/api";
import { ACCESS_TOKEN } from "../../constants";
import { useDispatch } from "react-redux";
import Alert from 'react-s-alert';

function LegacyRegister() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});

    const handleFormSubmit = () => {
        const signupRequest = {email, password, passwordConfirm, phoneNumber};

        signup(signupRequest)
            .then(async response => {
                if (!response.success){
                    setErrors(response);

                    Alert.error(t('auth.validationFetch'));
                    return false;
                }

                await localStorage.setItem(ACCESS_TOKEN, response.jwt);

                setErrors({});

                getUser().then(response => {
                    dispatch({
                        type: 'PAST_USER',
                        payload: {
                            isSignedIn: true,
                            email: response.email,
                            license: response.license,
                            message: response.message,
                            key: response.token
                        }
                    });

                    Alert.success(t('auth.successFetch'));
                }).catch(() => {
                    localStorage.removeItem(ACCESS_TOKEN);

                    Alert.error(t('auth.errorFetch'));
                });

            }).catch(() => {
                Alert.error(t('auth.errorFetch'));
            });
    }

    return (
        <div className="cabinet-wrap">
            <div className="cabinet-wrap__bg">registration</div>
            <div className="cabinet-wrap__inner">
                <div className="cabinet-block">
                    <div className="auth">
                        <h2 className="auth__header">{t('auth.register')}</h2>
                        <Input
                            inputType={"text"}
                            title={t('auth.labelEmail')}
                            name={"email"}
                            value={email}
                            placeholder={t('auth.enterEmail')}
                            errors={errors.emailErrors || []}
                            handleChange={e => setEmail(e.target.value)}
                        />
                        <Input
                            inputType={"password"}
                            title={t('auth.labelPassword')}
                            name={"password"}
                            value={password}
                            placeholder={t('auth.enterPassword')}
                            errors={errors.passwordErrors || []}
                            handleChange={e => setPassword(e.target.value)}
                        />
                        <Input
                            inputType={"password"}
                            title={t('auth.labelPasswordConfirm')}
                            name={"passwordConfirm"}
                            value={passwordConfirm}
                            placeholder={t('auth.enterPasswordConfirm')}
                            errors={errors.passwordConfirmErrors || []}
                            handleChange={e => setPasswordConfirm(e.target.value)}
                        />
                        <Input
                            inputType={"text"}
                            title={t('auth.labelPhone')}
                            name={"phoneNumber"}
                            value={phoneNumber}
                            placeholder={t('auth.enterPhone')}
                            errors={errors.phoneNumberErrors || []}
                            handleChange={e => setPhoneNumber(e.target.value)}
                            mask={"+7 (999) 999-9999"}
                        />
                        <button className="auth__button" onClick={handleFormSubmit}>{t('auth.buttonRegister')}</button>
                        <Link to="/login" className="auth__link">{t('auth.buttonLogin')}</Link>
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

export default function Register() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyRegister />
        </Suspense>
    );
}
