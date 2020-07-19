import React, {Suspense, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import './rates.scss';
import logoPrem from './logo-prem.png';
import logoStand from './logo-stand.png';
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import dayjs from 'dayjs';
import { checkPromocode } from '../../helpers/api';
import { ACCESS_TOKEN,
    PURCHASE_LINK,
    PROMO_CODE,
    IS_BUYING,
    TIME_BUYING,
    BUY_LICENSE,
    BUY_DATE } from '../../constants';

const Price = ({ priceRender, date, discount }) => {
    const { t } = useTranslation();

    let dateRender = date === 'Y' ? t('rates.currencyY') : t('rates.currencyM')

    let discountRender = discount ? (
        <div className="rates__discount">
            { Math.round(priceRender - (priceRender / 100 * discount)).toLocaleString() } {dateRender}
        </div>
    ) : '';

    return (
        <div className="rates__price">
            <div className={ discount ? "rates__subtext rates__subtext--cross" : "rates__subtext" }>
                {priceRender.toLocaleString()} {dateRender}
            </div>
            {discountRender}
        </div>
    );
}

function LegacyRates () {
    const { t } = useTranslation();
    const [promoCode, setPromoCode] = useState('');
    const [red, setRed] = useState(false);
    const [discount, setDiscount] = useState( 0 );
    const user = useSelector(state => state.user);

    useEffect(() => {
        if(localStorage.getItem(PROMO_CODE) && discount === 0){

            checkPromocode(localStorage.getItem(PROMO_CODE)).then(result => {
                if (result.status === 'ACTIVE') {
                    setPromoCode(localStorage.getItem(PROMO_CODE));
                    setDiscount(result.value);
                } else {
                    localStorage.removeItem(PROMO_CODE);
                }
            });

        }
    }, [discount, t]);

    const buy = ( e, license, date ) => {
        e.preventDefault();

        let args = '?';

        args += 'country=RUS';

        if (localStorage.getItem(PROMO_CODE)) {
            args += '&promoCode=' + localStorage.getItem(PROMO_CODE)
        } else {
            args += '&promoCode=null';
        }

        if (license) {
            args += '&licenseType=' + license
        } else {
            args += '&licenseType=PREMIUM'
        }

        if (date) {
            args += '&period=' + date
        } else {
            args += '&period=M'
        }

        if (localStorage.getItem(ACCESS_TOKEN)) {
            args += '&token=' + localStorage.getItem(ACCESS_TOKEN)
        }

        if (!user.isSignedIn){
            localStorage.setItem(IS_BUYING, 1);
            localStorage.setItem(TIME_BUYING, dayjs(new Date()).unix());
            localStorage.setItem(BUY_LICENSE, license);
            localStorage.setItem(BUY_DATE, date);
            setRed(true);
            Alert.error(t('rates.needAuth'));
        } else {
            window.location.href = PURCHASE_LINK + args;
        }
    }

    // eslint-disable-next-line
    const checkDiscount = e => {
        e.preventDefault();
        checkPromocode(promoCode).then(result => {
            switch (result.status) {
                case 'ACTIVE':
                    Alert.success(t('rates.active'));
                    setDiscount(result.value);
                    console.log('asdasda', PROMO_CODE);
                    localStorage.setItem(PROMO_CODE, promoCode);
                    break;

                case 'EXPIRED':
                    Alert.error(t('rates.expired'));
                    setDiscount(0);
                    if(localStorage.getItem(PROMO_CODE)) localStorage.removeItem(PROMO_CODE)
                    break;

                default:
                    Alert.error(t('rates.notFound'));
                    setDiscount(0);
                    if(localStorage.getItem(PROMO_CODE)) localStorage.removeItem(PROMO_CODE)
            }
        });
    }

    if (red) {
        return <Redirect to="/" />;
    }

    return (
        <div className="rates">
            <h2 className="rates__header rates__header--premium">Premium</h2>
            <div className="rates__container">
                <div className="rates__item">
                    <div className="rates__block">
                        <img src={logoPrem} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.month')}</div>
                        <div className="rates__sale" style={{'opacity': 0}}>{t('rates.saving1')}</div>
                        <div className="rates__text">{t('rates.autoMessaging')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth')}</div>
                        <div className="rates__text">{t('rates.params')}</div>
                        <div className="rates__text">{t('rates.match')}</div>
                        <a href="/" onClick={ e => buy(e, 'PREMIUM', 'M') } className="rates__button">{t('rates.buy')}</a>
                        <Price priceRender={599} date={'M'} discount={discount} />
                    </div>
                </div>

                <div className="rates__item">
                    <div className="rates__block">
                        <img src={logoPrem} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.year')}</div>
                        <div className="rates__sale">{t('rates.saving1')}</div>
                        <div className="rates__text">{t('rates.autoMessaging')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth')}</div>
                        <div className="rates__text">{t('rates.params')}</div>
                        <div className="rates__text">{t('rates.match')}</div>
                        <a href="/" onClick={ e => buy(e, 'PREMIUM', 'Y') } className="rates__button">{t('rates.buy')}</a>
                        <Price priceRender={5899} date={'Y'} discount={discount} />
                    </div>
                </div>
            </div>

            <h2 className="rates__header">Standart</h2>
            <div className="rates__container">
                <div className="rates__item">
                    <div className="rates__block rates__block--stand">
                        <img src={logoStand} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.month')}</div>
                        <div className="rates__sale" style={{'opacity': 0}}>{t('rates.saving2')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth2')}</div>
                        <div className="rates__text">{t('rates.sec')}</div>
                        <div className="rates__text">{t('rates.autoMessaging2')}</div>
                        <a href="/" onClick={ e => buy(e, 'STANDART', 'M') } className="rates__button">{t('rates.buy')}</a>
                        <Price priceRender={199} date={'M'} discount={discount} />
                    </div>
                </div>

                <div className="rates__item">
                    <div className="rates__block rates__block--stand">
                        <img src={logoStand} alt="Logotype premium" className="rates__logo" />
                        <div className="rates__time">1 {t('rates.year')}</div>
                        <div className="rates__sale">{t('rates.saving2')}</div>
                        <div className="rates__text">{t('rates.swipePerMonth2')}</div>
                        <div className="rates__text">{t('rates.sec')}</div>
                        <div className="rates__text">{t('rates.autoMessaging2')}</div>
                        <a href="/" onClick={ e => buy(e, 'STANDART', 'Y') } className="rates__button">{t('rates.buy')}</a>
                        <Price priceRender={1899} date={'Y'} discount={discount} />
                    </div>
                </div>
            </div>

            <form className="rates-promocode" onSubmit={checkDiscount}>
                <input
                    type="text"
                    className="rates-promocode__input"
                    placeholder="Введите промокод"
                    onChange={ e => setPromoCode(e.target.value) }
                    value={promoCode}/>
                <button className="rates-promocode__button">Активировать!</button>
            </form>
        </div>
    );
};

const Loader = () => (
    <div>loading...</div>
);

export default function Rates() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyRates />
        </Suspense>
    );
};
