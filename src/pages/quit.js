import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('asd');
        dispatch({
            type: 'PAST_USER',
            payload: {
                isSignedIn: false,
                key: '',
                email: '',
                license: '',
                licenseTo: '',
                phoneNumber: '',
                promoCode: '',
                token: ''
            }
        });

        window.localStorage.removeItem('token');
    });

    return (
        <React.Fragment>
            <Header />
            <div>Вы успешно вышли, сейчас будете перенаправлены на <Link to="/">главную страницу</Link>.</div>
            <Redirect to="/" />
            <Footer />
        </React.Fragment>
    );
};
