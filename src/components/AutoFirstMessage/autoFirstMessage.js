import React, { Suspense, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateMsg } from '../../helpers/api';
import './autoFirstMessage.scss';

const NonPremium = () => {
    const { t } = useTranslation();

    const user = useSelector(state => state.user);

    if (user.license === 'STANDART') {
        return (
            <div className="non-premium">
                <div className="non-premium__inner">
                    <div className="non-premium__header">
                        <Trans i18nKey="cabinet.available">
                            Доступно
                            <br />
                            для Premium!
                        </Trans>
                    </div>
                    <Link to="/rates" className="cabinet-input-group__buy">
                        {t('cabinet.availableButton')}
                    </Link>
                </div>
            </div>
        );
    } else {
        return '';
    }
};

function LegacyAutoFirstMessage() {
    const { t } = useTranslation();
    const user = useSelector(state => state.user);

    const [message, setMessage] = useState(user.message);

    const handleSubmit = e => {
        e.preventDefault();

        updateMsg(message).then(res => {
            console.log(res);
        });
    };

    return (
        <React.Fragment>
            <NonPremium />
            <p className="cabinet-text">
                <Trans i18nKey="cabinet.afmText">
                    Set the auto message that you'd like to automatically send when first matching.

                    Type  <b>%name%</b>  to insert their name. 255 max char length
                </Trans>
            </p>
            <div className="cabinet-subtext">
                {t('cabinet.scan')}
            </div>
            <textarea
                name="afm"
                id="afm"
                onChange={(e)=>{setMessage(e.target.value)}}
                className="afm"
                value={message} >
            </textarea>
            <a href="/" onClick={handleSubmit} className="cabinet-input-group__buy">
                {t('cabinet.save')}
            </a>
        </React.Fragment>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function AutoFirstMessage() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyAutoFirstMessage />
        </Suspense>
    );
};
