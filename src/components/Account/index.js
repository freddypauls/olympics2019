import React, { Component } from 'react';
import app, { auth } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget'; //Might need
import PasswordChangeForm from '../PasswordChange'; //Might need
import '../SignIn/index.css';
import './index.css';
import { userInfo } from 'os'; //Might need later

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.state;

    return (
      <AuthUserContext.Consumer>
      {authUser => (
        <div>
        {users.map(user => (
          <div>
            {user.uid == authUser.uid ? <AccountInfo user={user}/> : null}
          </div>
          ))}
        </div>
      )}
    </AuthUserContext.Consumer>
    );
  }
}
const AccountInfo = ({user}) => (
    <div>
      <ul>
        <li>
          {user.username}
        </li>
        <li>
          {user.email}
        </li>
      </ul>
    </div>
  );

// <PasswordForgetForm />
// <PasswordChangeForm />

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);