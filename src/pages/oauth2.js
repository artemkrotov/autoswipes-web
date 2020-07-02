import React from 'react';
import { ACCESS_TOKEN } from '../constants';
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
        return <Redirect to={{
            pathname: "/cabinet"
        }}/>;
    } else {
        return <Redirect to={{
            pathname: "/login"
        }}/>;
    }
};
