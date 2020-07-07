import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import { useSelector } from "react-redux";
import { changePassword } from '../../helpers/api';
import Alert from 'react-s-alert';
import {Link, Redirect} from "react-router-dom";

function LegacySettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [red, setRed] = useState(false);

    const user = useSelector(state => state.user);
    const { t } = useTranslation();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const passwordRequest = {
            currentPassword, password, passwordConfirm,
            email: user.email
        };

        changePassword(passwordRequest)
            .then(response => {

                if (!response.success){
                    setErrors(response);

                    Alert.error(t('auth.validationFetch'));
                    return false;
                }

                setErrors({});
                setRed(true);

                Alert.success(t('settings.successChangePassword'));

            }).catch(() => {
                Alert.error(t('validation.LOGIN_ERROR'));
            });
    }

    if (red) {
        return (
            <Redirect to='/'/>
        );
    }

    return (
        <div className="cabinet-wrap">
            <div className="cabinet-wrap__bg">change password</div>
            <form className="cabinet-wrap__inner" onSubmit={handleFormSubmit}>
                <div className="cabinet-block">
                    <div className="auth">
                        <h2 className="auth__header">{t('settings.changePassword')}</h2>
                        <Input
                            inputType="password"
                            title={t('settings.enterCurrentPassword')}
                            name={"currentPassword"}
                            value={currentPassword}
                            placeholder={t('settings.enterCurrentPassword')}
                            errors={errors.currentPasswordErrors || []}
                            handleChange={e => setCurrentPassword(e.target.value)}
                        />
                        <Input
                            inputType="password"
                            title={t('settings.enterNewPassword')}
                            name={"password"}
                            value={password}
                            placeholder={t('settings.enterNewPassword')}
                            errors={errors.passwordErrors || []}
                            handleChange={e => setPassword(e.target.value)}
                        />
                        <Input
                            inputType="password"
                            title={t('settings.confirmNewPassword')}
                            name={"passwordConfirm"}
                            value={passwordConfirm}
                            placeholder={t('settings.confirmNewPassword')}
                            errors={errors.passwordConfirmErrors || []}
                            handleChange={e => setPasswordConfirm(e.target.value)}
                        />
                        <div className="cabinet-bottom">
                            <button className="cabinet-bottom__button">{t('settings.change')}</button>
                            <Link to="/" className="cabinet-bottom__button cabinet-bottom__button--quit">
                                {t('toMain')}
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Settings() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacySettings />
        </Suspense>
    );
}
