import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import '../SignIn/index.css';
import './index.css';

const AccountPage = () => (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <div className="form-card form-card-account">
            <h1>Account:</h1>
            <p>Email: {authUser.email}</p>
          </div>
        </div>
      )}
    </AuthUserContext.Consumer>
  );

// <PasswordForgetForm />
// <PasswordChangeForm />

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);