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
      <div>
        <AccountInfo users={users}/>
      </div>
    );
  }
}
const AccountInfo = ({users}) => (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
        {users.map(user => (
          <div className="form-card form-card-account">
            <p key={user.uid}>
                {user.uid === authUser.uid ? <div><strong>Username: </strong> {user.username}
                <br/>
                <strong>Email:</strong> {user.email}</div> : null} 
            </p>
          </div>
          ))};
        </div>
      )}
    </AuthUserContext.Consumer>
  );

  const UserList = ({users}) => (
    <div>
      {users.map(user => (
        <ul key={user.uid}>
          <li>
            <strong>Username: </strong> {user.username}
            {user.roles ? <p><strong>Role: </strong> {user.roles} </p> : <p><strong>Role: </strong> no role</p>} 
          </li>
        </ul>
      ))};
    </div>

  );

// <PasswordForgetForm />
// <PasswordChangeForm />

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);