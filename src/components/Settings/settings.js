import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import { useSelector } from "react-redux";
import { changePassword } from '../../helpers/api';
import Alert from 'react-s-alert';

function LegacySettings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const user = useSelector(state => state.user);
    const { t } = useTranslation();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const passwordRequest = {
            currentPassword, newPassword, newPasswordConfirm,
            email: user.email
        };

        changePassword(passwordRequest)
            .then(response => {
                console.log(response);
            }).catch(() => {
                Alert.error(t('validation.LOGIN_ERROR'));
            });
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
                            handleChange={e => setCurrentPassword(e.target.value)}
                        />
                        <Input
                            inputType="password"
                            title={t('settings.enterNewPassword')}
                            name={"newPassword"}
                            value={newPassword}
                            placeholder={t('settings.enterNewPassword')}
                            handleChange={e => setNewPassword(e.target.value)}
                        />
                        <Input
                            inputType="password"
                            title={t('settings.confirmNewPassword')}
                            name={"newPasswordConfirm"}
                            value={newPasswordConfirm}
                            placeholder={t('settings.confirmNewPassword')}
                            handleChange={e => setNewPasswordConfirm(e.target.value)}
                        />
                        <button className="auth__button">{t('settings.change')}</button>
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
