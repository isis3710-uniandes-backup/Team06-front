import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import { IntlProvider, addLocaleData } from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import enLocaleData from 'react-intl/locale-data/en';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

import Session from './private/Session'
import App from './public/App'
import NotFound from './public/NotFound'
import Auth from './public/Auth/Auth'
import history from './public/Auth/history'

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
}

var localeLanguage = ""
var userLang = navigator.language || navigator.userLanguage;
var messagesLanguage = ""

if (userLang.substring(0, 2) === 'es') {
    addLocaleData(esLocaleData);
    localeLanguage = "es-ES";
    messagesLanguage = localeEsMessages
}
else {
    addLocaleData(enLocaleData);
    localeLanguage = "en-US";
    messagesLanguage = localeEnMessages
}

render(
    <IntlProvider locale={localeLanguage} messages={messagesLanguage}>
        <Router history={history}>
            <Switch>
                <Route path="/session" render={(props) => {
                    handleAuthentication(props);
                    return <Session auth={auth} {...props}/>
                }}/>
                <Route path="/" render={(props) => <App auth={auth} {...props}/> }/>
                <Route path="/:any" component={NotFound}/>
            </Switch>
        </Router>
    </IntlProvider>, document.getElementById('app'));