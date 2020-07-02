import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function LegacyCabinetAccount() {
    const { t } = useTranslation();

    const user = useSelector(state => state.user);

    const inp = user.license === 'STANDART'
        ? (
            <React.Fragment>
                <input
                    type="text"
                    id="typeAccount"
                    className="cabinet-input-group__input-fill"
                    onChange={()=>{}}
                    value={t('cabinet.free')} />
                <Link to="/rates" className="cabinet-input-group__buy">
                    {t('cabinet.buy')}
                </Link>
            </React.Fragment>
        )
        : (
            <React.Fragment>
                <input
                    type="text"
                    id="typeAccount"
                    className="cabinet-input-group__input-fill cabinet-input-group__input-fill--prem"
                    onChange={()=>{}}
                    value={t('cabinet.premium')} />
                <div className="cabinet-input-group__subinput">
                    {t('cabinet.licenseTo')} {user.licenseTo}
                </div>
                <Link to="/rates" className="cabinet-input-group__buy">
                    {t('cabinet.renew')}
                </Link>
            </React.Fragment>
        )

    return (
        <React.Fragment>
            <div className="cabinet-input-group">
                <label htmlFor="email" className="cabinet-input-group__label">
                    {t('cabinet.email')}
                </label>
                <input
                    type="text"
                    id="email"
                    className="cabinet-input-group__input"
                    onChange={()=>{}}
                    value={user.email} />
            </div>
            <div className="cabinet-input-group">
                <label htmlFor="typeAccount" className="cabinet-input-group__label">
                    {t('cabinet.typeAccount')}
                </label>
                {inp}
            </div>
        </React.Fragment>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function CabinetAccount() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyCabinetAccount />
        </Suspense>
    );
};
