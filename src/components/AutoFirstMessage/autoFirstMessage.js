import React, { Suspense, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateMsg } from '../../helpers/api';
import Alert from 'react-s-alert';
import './autoFirstMessage.scss';

const NonPremium = () => {
    const { t } = useTranslation();

    const user = useSelector(state => state.user);

    if (user.license.type === 'STANDART') {
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
    const [errors, setErrors] = useState({});

    const [message, setMessage] = useState(user.message);

    const handleSubmit = e => {
        e.preventDefault();

        updateMsg({ message }).then(response => {
            if (!response.success){
                setErrors(response.messageErrors);

                Alert.error(t('auth.validationFetch'));
                return false;
            }

            setErrors({});

            Alert.success(t('cabinet.successAFM'));
        }).catch(()=>{
            Alert.error('Error CORS back-end');
        });
    };

    const renderErrors = () => {
        if (errors && errors.length){

            return errors.map(( err, id ) => <div className="form-group__error" key={id}>{t('validation.'+err)}</div>);
        } else {
            return '';
        }
    }

    return (
        <React.Fragment>
            <NonPremium />
            <p className="cabinet-text">
                <Trans i18nKey="cabinet.afmText">
                    Set the auto message that you'd like to automatically send when first matching.

                    Type  <b>%name%</b>  to insert their name. 255 max char length
                </Trans>
            </p>
            {/*<div className="cabinet-subtext">*/}
            {/*    {t('cabinet.scan')}*/}
            {/*</div>*/}
            <textarea
                name="afm"
                id="afm"
                onChange={(e)=>{setMessage(e.target.value)}}
                className="afm"
                value={message} >
            </textarea>
            {renderErrors()}
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
