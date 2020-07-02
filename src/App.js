import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ScrollToTop from './components/ScrollToTop';
import Routes from './components/Routes';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './fonts.css';
import './App.scss';


export default () => {
    return (
        <Provider store={store}>
            <Router>
                <ScrollToTop />
                <Routes />
                <Alert stack={{limit: 3}}
                       timeout = {3000}
                       position='top-right' effect='slide' offset={65} />
            </Router>
        </Provider>
    );
};
