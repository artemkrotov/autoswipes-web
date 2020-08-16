import {
    ACCESS_TOKEN,
    BUY_DATE,
    BUY_LICENSE,
    IS_BUYING,
    PROMO_CODE,
    PURCHASE_LINK,
    TIME_BUYING
} from "../constants";
import dayjs from "dayjs";

export default () => {
    // eslint-disable-next-line no-undef
    ym(65791732,'reachGoal','target');

    if(dayjs(new Date()).unix() - localStorage.getItem(TIME_BUYING) > 1800 ) {
        localStorage.removeItem(IS_BUYING);
        localStorage.removeItem(BUY_LICENSE);
        localStorage.removeItem(BUY_DATE);
        localStorage.removeItem(TIME_BUYING);

        return true;
    }

    if(localStorage.getItem(IS_BUYING)) {
        let args = '?country=RUS';

        if (localStorage.getItem(PROMO_CODE)) {
            args += '&promoCode=' + localStorage.getItem(PROMO_CODE)
        } else {
            args += '&promoCode=null'
        }

        if (localStorage.getItem(BUY_LICENSE)) {
            args += '&licenseType=' + localStorage.getItem(BUY_LICENSE)
        } else {
            args += '&licenseType=PREMIUM'
        }

        if (localStorage.getItem(BUY_DATE)) {
            args += '&period=' + localStorage.getItem(BUY_DATE)
        } else {
            args += '&period=M'
        }

        if (localStorage.getItem(ACCESS_TOKEN)) {
            args += '&token=' + localStorage.getItem(ACCESS_TOKEN)
        } else {
            args += '&token=null'
        }

        localStorage.removeItem(IS_BUYING);
        localStorage.removeItem(BUY_LICENSE);
        localStorage.removeItem(BUY_DATE);
        localStorage.removeItem(TIME_BUYING);

        window.location.href = PURCHASE_LINK + args;
        return true;
    } else {
        return false;
    }
}