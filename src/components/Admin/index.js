import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import './index.css';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div className="admin-card">
          <UserList users={users} loading={loading} />
          <table className="admin-table teams-table">
            <thead>
              <th>Team 1</th>
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
              <th>Team 2</th>
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

const UserList = ({ users, loading }) => (
  <table className="admin-table">
      <thead>
        <tr>
          <th>Users</th>
        </tr>
      </thead>
      <thead>
        <tr className="admin-table-row">
          <th className="admin-table-column">
            E-Mail:
          </th>
          <th>
            Username:
          </th>
          <th>
            Team Number:
          </th>
          <th>
            Gender:
          </th>
          <th>
            Rolle:
          </th>
        </tr>
      </thead>
    {users.map(user => (
      <tbody className="admin-table-row" key={user.uid}>
        {loading && <tr>Loading ...</tr>}
        <tr>
          <td>
            { user.email }
          </td>
          <td>
            { user.username }
          </td>
          <td>
            { user.teamnum }
          </td>
          <td>
            { user.gender }
          </td>
          <td>
            { user.roles ? user.roles : "No role" }
          </td> 
        </tr>
      </tbody>
    ))}
  </table>
);

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

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);