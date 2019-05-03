import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import './index.css';

class RenderTeam1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    // Fethcing table for team 1 and targeting all users, setting uid as key (for pritning later)
    this.props.firebase.team(`${1}/users`).on('value', snapshot => {
      const usersObject = snapshot.val();
      
      if(usersObject != null){
        // Setting object as list (to ready for print)
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        // Setting the list of users as state to be used across the file
        this.setState({
          users: usersList,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    // Stopping event listener
    this.props.firebase.teams().off();
  }

  render() {
    // Fetching all users from state, and assigning a variable to call them
    const { users } = this.state;
    // Returning JSX to render
    return (
      <table className="table-for-teams">
        <thead className="table-for-teams-header">
          <tr className="table-for-teams-row">
            <th colSpan="2">
                Team 1
            </th>
          </tr>
        </thead>
        <thead className="table-for-teams-header">
          <tr className="table-for-teams-row">
            <th className="double-colspan">
              User:
            </th>
            <th>
                Leader: Eirik
            </th>
          </tr>
        </thead>
        <tbody className="table-for-teams-body">
          {/* Cyceling through all users, and set referance as user  */}
          {users.map(user => (
            <tr className="table-for-teams-row" key={user.uid}>
                <td>{user.username}</td>
                <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

// Setting condition checking that the user is logged in.
const condition = authUser => !!authUser;

// Exporting the info, with auth and firebase connection.
export default compose(
  withAuthorization(condition),
  withFirebase,
)(RenderTeam1);