import React from 'react';
import {ACCESS_TOKEN, BUY_DATE, BUY_LICENSE, IS_BUYING, PROMO_CODE, PURCHASE_LINK} from '../constants';
import { Redirect } from 'react-router-dom';

export default ({ location }) => {
    const getUrlParameter = name => {
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');

    if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);


        if(localStorage.getItem(IS_BUYING)) {
            let args = '?country=RUS';

            if (localStorage.getItem(PROMO_CODE)) {
                args += '&promoCode=' + localStorage.getItem(PROMO_CODE)
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

            args += '&token=' + token

            localStorage.removeItem(IS_BUYING);
            localStorage.removeItem(BUY_LICENSE);
            localStorage.removeItem(BUY_DATE);

            window.location.href = PURCHASE_LINK + args;
            return true;
        }

        return <Redirect to={{
            pathname: "/cabinet"
        }}/>;
    } else {
        return <Redirect to={{
            pathname: "/login"
        }}/>;
    }
};
