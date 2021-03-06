import React, { Component } from 'react';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';
import TeamBtn from './teamBtn.js';

import { AuthUserContext, withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';


//Making class that will be the page itself
class AccountPage extends Component {
  constructor(props) {
    super(props);

    // Setting state making users object array
    this.state = {
      users: [],
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
    const helloArray = ["AAARE YOOOUUUU REEEEEEEAAADY???", "Time to get WASTED", "Welcome", "Hey sexy ;)", "Go shower", "ONE OF US... ONE OF US", "PERKELE", "WHY AM I SCREAMING??", "Where am I?.. WHO am I?", "Why hello there", "🔥this is fine🔥", "Bonjour" ];

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="profile-full">
            {users.filter(user => user.uid === authUser.uid).map(user => (
            <div className="flex-container-account" key={user.uid}>
              {/* user.wantTeam === false ? alert("Om du vil bli med på lekene må du trykke på plus tegnet nede til høyere") : null */}
              <div className="profile-card-banner">
                <div className="overlay-bluetint">
                  <span className="profile-banner-header"> <span className="header-color">{helloArray[Math.floor(Math.random() * ((helloArray.length - 1)))] }</span> {/*user.username.split(" ")[0]*/}</span>
                </div>
              </div>
                <div className="profile-card-left">
                  <AccountInfo user={user} /> 
                </div>
                
              <div className="account-team-btn-div">
                {user.wantTeam ? user.teamnum ? <TeamInfo users={users} team={user.teamnum} /> : user.roles[1] === "Team Leader" ? <p>You are a team leader, check teams page for the team you might be leading to victory</p> : <p>Waiting for teams to be assigned</p> : <TeamBtn />}
              </div>
            </div>
            ))}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const TeamInfo = ({users, team}) => (
  <table className="account-table account-table-teams">
     <thead>
       <tr className="account-table-row">
         <th colSpan="2"> Your Team: </th>
       </tr>
     </thead>
     <tbody>
        {users.filter(user => user.teamnum === team).map(user => (
          <tr className="account-table-row" key={user.uid}>
            <td>
                {user.username}
            </td>
            <td> </td>
          </tr>
        ))}
     </tbody>
  </table>
);

//Takes user from render and prints values
const AccountInfo = ({user}) => (
      <table key={user.uid} className="account-table account-table-info">
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
          <tr className="account-table-row">
            <th>
              Team: 
            </th>
            <td>
              { user.teamnum }
            </td>
          </tr>
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