import { API_BASE_URL, ACCESS_TOKEN, GET_PRICE_LINK } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject([json, response.status]);
                }
                return json;
            })
        );
};

export function getUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/license-service/api/customer/current",
        method: 'GET'
    });
}

export function changePassword(passwordRequest) {
    return request({
        url: API_BASE_URL + "/auth-service/auth/updatePasword",
        method: 'POST',
        body: JSON.stringify(passwordRequest)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth-service/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth-service/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function updateMsg(messageRequest) {
    return request({
        url: API_BASE_URL + "/license-service/api/customer/message",
        method: 'PUT',
        body: JSON.stringify(messageRequest)
    });
}

export function checkPromocode(promocode) {
    return request({
        url: API_BASE_URL + "/promocode-service/check?promocode=" + promocode,
        method: 'GET'
    });
}

export function getPrice(country, licenseType, period) {
    return request({
        url: GET_PRICE_LINK + `?country=${country}&licenseType=${licenseType}&period=${period}`,
        method: 'GET'
    });
}
