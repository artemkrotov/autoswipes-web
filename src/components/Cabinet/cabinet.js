import React, { Suspense } from 'react';
import CabinetKey from '../CabinetKey';
import CabinetAccount from '../CabinetAccount';
import CabinetPromoCode from '../CabinetPromoCode';
import AutoFirstMessage from '../AutoFirstMessage';
import { useTranslation } from 'react-i18next';
import './cabinet.scss';
import { ReactComponent as Arrow } from './arrow.svg';

function LegacyCabinet () {
    const { t } = useTranslation();

    return (
        <div className="cabinet-wrap">
            <div className="cabinet-back container">
                <a href="https://autoswipes.com/" className="cabinet-back__link">
                    <Arrow className="cabinet-back__icon" />
                    <span className="cabinet-back__text">
                        {t('toMain')}
                    </span>
                </a>
            </div>
            <div className="cabinet-wrap__inner">
                <div className="cabinet-block">
                    <h2 className="cabinet-block__header">
                        {t('cabinet.myKey')}
                    </h2>
                    <CabinetKey />
                </div>
                <div className="cabinet-block">
                    <h2 className="cabinet-block__header">
                        {t('cabinet.myAccount')}
                    </h2>
                    <CabinetAccount />
                </div>
                <div className="cabinet-block">
                    <h2 className="cabinet-block__header">
                        {t('cabinet.autoFirstMessage')}
                    </h2>
                    <AutoFirstMessage />
                </div>
                <div className="cabinet-block">
                    <h2 className="cabinet-block__header">
                        {t('cabinet.myPromoCode')}
                    </h2>
                    <CabinetPromoCode />
                </div>
            </div>
        </div>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Cabinet() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyCabinet />
        </Suspense>
    );
};
