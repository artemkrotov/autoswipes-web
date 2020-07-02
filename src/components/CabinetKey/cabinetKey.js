import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";

function LegacyCabinetKey() {
    const { t } = useTranslation();

    const user = useSelector(state => state.user);

    return (
        <React.Fragment>
            <input
                type="text"
                className="cabinet-highlight"
                readOnly={true}
                onChange={()=>{}}
                value={user.key}
                onClick={event => event.target.select()} />
            <div className="cabinet-subtext">
                {t('cabinet.pastKey')}&nbsp;
                <a href="/" className="cabinet-subtext__link">
                    {t('cabinet.downloadExt')}
                </a>
                &nbsp;({t('cabinet.onlyChrome')})
            </div>
        </React.Fragment>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function CabinetKey() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyCabinetKey />
        </Suspense>
    );
};
