import React from 'react';

import { Link } from 'react-router-dom';
import './index.css'
//import './hamburger-menu.css'

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';

var $ = require("jquery");

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
  render () {
    $("li .link").click(function() {
      $("#hamburger[type='checkbox']").prop("checked", false);
    });
    return (
      <div className="navigation">
        <Navigation />
      </div>
    );
  }
}

const Navigation = () => (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? ( 
          <NavigationAuth authUser={authUser} />
         ) : ( 
          <NavigationNonAuth /> 
         )
      }
    </AuthUserContext.Consumer> 
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    {/*<li>
      <Link className="link" to={ROUTES.LANDING}>Landing</Link>
    </li>*/}
    <li>
      <Link className="link" to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link className="link" to={ROUTES.ACCOUNT}>Profile</Link>
    </li>
    <li>
      <Link className="link" to={ROUTES.TEAMLEAD}>Team Leaders</Link>
    </li>
    <li>
        <Link className="link" to={ROUTES.TEAMS}>Teams</Link>
    </li>
    {authUser.roles.includes(ROLES.GAMEADMIN) && (
      <li>
        <Link className="link" to={ROUTES.GAMEADMIN}>Games Admin</Link>
      </li>
    )}
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <Link className="link" to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link className="link right-float" to={ROUTES.LANDING}>Info Page</Link>
    </li>
    <li>
      <Link className="link right-float" to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Example;