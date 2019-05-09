import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import TeamsPage from '../Teams';
import LeadersPage from '../Leaders';
import AdminGamesPage from '../AdminScores';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
        <Router>
            <div id="app">
              <input id="hamburger" type="checkbox" />
              <div id="hamburger">
                <span id="span1"></span>
                <span id="span2"></span>
                <span id="span3"></span>
              </div>

              <Navigation />

              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.TEAMS} component={TeamsPage} />
              <Route path={ROUTES.TEAMLEAD} component={LeadersPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.GAMEADMIN} component={AdminGamesPage} />
            </div>
        </Router>
);



export default withAuthentication(App);