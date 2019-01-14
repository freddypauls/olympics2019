import React, { Component } from 'react';
import 'firebase/auth';
import 'firebase/database';
import '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';

import '../SignIn/index.css';
import './index.css';

class TeamsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.firebase.users().orderByChild("teamnum").equalTo(1).on('value', snapshot => {
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
      <table className="admin-table teams-table">
          <thead>
              <tr className="admin-table-row">
                  <th>User</th>
                  <th>Rolle</th>
              </tr>
          </thead>
          <tbody>
          {users.map(user => (
              <tr key={user.uid} className="admin-table-row">
                  <td>
                      { user.username }
                  </td>
                  <td>
                      { user.roles }
                  </td>
              </tr>
          ))}
          </tbody>
      </table>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(TeamsTable);