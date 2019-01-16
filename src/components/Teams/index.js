import React, { Component } from 'react';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';

import { AuthUserContext, withAuthorization } from '../Session';
import './index.css';

class TeamsPage extends Component {
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
      <table className="admin-table teams-table">
            <thead>
              <tr className="admin-table-row admin-table-header">
                <th colSpan="2">Team 1</th>
              </tr>
            </thead>
            <thead>
              <tr className="admin-table-row">
                <th>
                  Name
                </th>
                <th>
                  Rolle
                </th>
              </tr>
            </thead>
            {users.map(user => (
              <tbody className="admin-table-row" key={user.uid}>
                  {user.teamnum === 1 ? <TeamList user={user} /> : null}
              </tbody>
            ))}
          </table>
          <table className="admin-table teams-table">
            <thead>
              <tr className="admin-table-row admin-table-header">
                <th colSpan="2">Team 2</th>
              </tr>
            </thead>
            <thead>
              <tr className="admin-table-row">
                <th>
                  Name
                </th>
                <th>
                  Rolle
                </th>
              </tr>
            </thead>
            {users.map(user => (
              <tbody className="admin-table-row" key={user.uid}>
                  {user.teamnum === 2 ? <TeamList user={user} /> : null}
              </tbody>
            ))}
          </table>
      </div>
    );
  }
}

const TeamList = ({user}) => (
    <tr>
      <td>
          {user.username}
      </td>
      <td>
          {user.roles ? user.roles : "no role"}
      </td>
    </tr>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(TeamsPage);