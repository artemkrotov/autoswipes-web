import { useDispatch, useSelector } from "react-redux";
import React, {Suspense, useEffect} from "react";
import { AnimatedSwitch } from "react-router-transition";
import { Route, Redirect } from "react-router-dom";
import Cabinet from "../pages/cabinet";
import Rates from "../pages/rates";
import Login from "../pages/login";
import Register from "../pages/register";
import Quit from "../pages/quit";
import Settings from "../pages/settings";
import Forgot from "../pages/forgot";
import OAuth2RedirectHandler from "../pages/oauth2";
import { getUser } from "../helpers/api";
import Alert from "react-s-alert";
import { ACCESS_TOKEN } from "../constants";
import { useTranslation } from "react-i18next";

function LegacyRoutes () {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (window.localStorage.getItem(ACCESS_TOKEN) && !user.isSignedIn) {

            getUser().then(response => {
                return dispatch({
                    type: 'PAST_USER',
                    payload: {
                        isSignedIn: true,
                        email: response.email,
                        license: response.license,
                        message: response.message || '',
                        key: response.token
                    }
                });
            }).catch(() => {
                window.localStorage.removeItem(ACCESS_TOKEN);

                Alert.error(t('auth.errorFetch'));
            });

        }

    }, [user.isSignedIn, dispatch, t]);

    if (user.isSignedIn) {
        return (
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="route-wrapper"
            >
                <Route exact path='/' component={ Cabinet } />
                <Route path='/cabinet' component={ Cabinet } />
                <Route path='/settings' component={ Settings } />
                <Route path="/rates" component={ Rates } />
                <Route path="/quit" component={ Quit } />
                <Route path="*"><Redirect to="/" /></Route>
            </AnimatedSwitch>
        );
    } else {
        return (
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="route-wrapper"
            >
                <Route exact path='/' component={ Login } />
                <Route path='/login' component={ Login } />
                <Route path='/register' component={ Register } />
                <Route path="/oauth2/redirect" component={ OAuth2RedirectHandler } />
                <Route path="/rates" component={ Rates } />
                <Route path="/forgot" component={ Forgot } />
                <Route path="/quit" component={ Quit } />
                <Route path="*"><Redirect to="/" /></Route>
            </AnimatedSwitch>
        );
    }
}

const Loader = () => (
    <div>loading...</div>
);

export default function Routes() {
    return (
        <Suspense fallback={<Loader />}>
            <LegacyRoutes />
        </Suspense>
    );
}
