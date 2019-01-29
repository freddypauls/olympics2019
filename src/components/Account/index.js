import React, { Component } from 'react';
//import app, { auth } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';
//import { compose } from 'recompose';
//import TeamsTable from './teamTable.js';
import TeamBtn from './teamBtn.js';

import { AuthUserContext, withAuthorization } from '../Session';
//import { PasswordForgetForm } from '../PasswordForget'; //Might need
//import PasswordChangeForm from '../PasswordChange'; //Might need
import '../SignIn/index.css';
import './index.css';
//import { userInfo } from 'os'; //Might need later

//Making class that will be the page itself
class AccountPage extends Component {
  constructor(props) {
    super(props);

    // Setting state making users object array
    this.state = {
      users: [],
      teams: [],
    };
  }

  componentDidMount() {
    // Fetching users from database to fill state obj
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
    //unmounting the obj
    this.props.firebase.users().off();
  }

  render() {
    //Fetching state, and making a obj arr in the render
    const { users } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="profile-full">
          {users.filter(user => user.uid === authUser.uid).map(user => (
          <div className="flex-container-account" key={user.uid}>
            <div className="profile-card-banner">
              <span className="profile-banner-header">Hello, {user.username}</span>
            </div>
              <div className="profile-card-left">
                <AccountInfo user={user} /> 
              </div>
              
            <div className="account-team-btn-div">
              {user.wantTeam ? user.teamnum ? <TeamInfo users={users} team={user.teamnum} house={user.house} /> : <p>Waiting for teams to be assigned</p> : <TeamBtn />}
            </div>
          </div>
          ))}
        </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const TeamInfo = ({users, team, house}) => (
  <table className="account-table">
     <thead>
       <tr className="account-table-row">
         <th>Team Mates:</th>
         <th>House: The {house + "s"} </th>
       </tr>
     </thead>
     <tbody>
        {users.filter(user => user.teamnum === team).map(user => (
          <tr className="account-table-row" key={user.uid}>
            <td>
                {user.username}
            </td>
            <td></td>
          </tr>
        ))}
     </tbody>
  </table>
);

//Takes user from render and prints values
const AccountInfo = ({user}) => (
      <table key={user.uid} className="account-table">
        <tbody>
          <tr className="account-table-row">
            <th>
              Full Name:
            </th>
            <td>
              { user.username }
            </td>
          </tr>
          <tr className="account-table-row">
            <th>
              Email:
            </th>
            <td>
              { user.email }
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr className="account-table-row">
            <th>
              Team: 
            </th>
            <td>
              { user.teamnum }
            </td>
          </tr>
        </tbody>
        <tbody>
          {user.roles ?
          <tr className="account-table-row">
            <th>
              Rolle: 
            </th>
          <td>
            { user.roles[2] ? user.roles[2] : user.roles[1] ? user.roles[1] : user.roles[0] }
          </td>
          </tr> : null
          }
        </tbody> 
      </table>
  );

// <PasswordForgetForm />
// <PasswordChangeForm />

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);