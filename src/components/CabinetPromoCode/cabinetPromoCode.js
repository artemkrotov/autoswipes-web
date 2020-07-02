import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";

function LegacyCabinetPromoCode() {
    const { t } = useTranslation();

    const user = useSelector(state => state.user);

    return (
        <React.Fragment>
            <input
                type="text"
                className="cabinet-highlight"
                readOnly={true}
                onChange={()=>{}}
                value={user.promoCode}
                onClick={event => event.target.select()} />
            <div className="cabinet-subtext">
                {t('cabinet.share')}
            </div>
        </React.Fragment>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function CabinetPromoCode() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyCabinetPromoCode />
        </Suspense>
    );
}
