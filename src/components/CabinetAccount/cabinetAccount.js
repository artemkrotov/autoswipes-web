import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Input from "../Input";

function LegacyCabinetAccount() {
    const { t } = useTranslation();

    const user = useSelector(state => state.user);

    const convertTime = () => {
        try {
            if (user.license.finish){
                return dayjs(user.license.finish).format('HH:mm DD.MM.YYYY');
            } else {
                return 'undefined';
            }
        }
        catch {
            return user.license.finish;
        }
    }

    const inp = user.license.type === 'STANDART'
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
                    {t('cabinet.licenseTo')} {convertTime()}
                </div>
                <Link to="/rates" className="cabinet-input-group__buy">
                    {t('cabinet.renew')}
                </Link>
            </React.Fragment>
        )

    return (
        <React.Fragment>
            <div className="cabinet-input-group">
                <Input
                    inputType={"text"}
                    title={t('cabinet.email')}
                    name={"email"}
                    value={user.email}
                    handleChange={() => {}}
                />
            </div>
            <div className="cabinet-input-group">
                <label className="cabinet-input-group__label">
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
