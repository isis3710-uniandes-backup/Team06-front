import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter,Route, Link, Switch } from "react-router-dom";

import Session from './private/Session'
import App from './public/App'

render(
    <BrowserRouter>
        <Switch>
            <Route path="/session" component = {Session}/>
            <Route path="/" component ={App} exact/>
        </Switch>
    </BrowserRouter>,
   document.getElementById('app'));