import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import './index.css';
import teamFinderFunc from './teamFinder.js';

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
      <div className="admin-card flex-container-admin">
        <div className="section-admin-table flex-item-admin-section">
          <UserList users={users} loading={loading} />
        </div>
        <div className="asde-admin-table flex-item-admin-aside">
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
        
          <teamFinderFunc />
        </div>
      </div>
    );
  }
}

const UserList = ({ users, loading }) => (
  <table className="admin-table">
      <thead>
        <tr className="admin-table-row admin-table-header">
          <th colSpan="6">Users</th>
        </tr>
      </thead>
      <thead>
      {window.innerWidth < 768 ?
        <tr className="admin-table-row">
          <th>
            Username:
          </th>
          <th>
            Team:
          </th>
        </tr>
          :
        <tr className="admin-table-row">
          <th>
            E-Mail:
          </th>
          <th>
            Username:
          </th>
          <th>
            Team:
          </th>
          <th>
            Gender:
          </th>
          <th>
            Rolle:
          </th>
        </tr>
      }
      </thead>
    {users.map(user => (
      <tbody className="admin-table-row" key={user.uid}>
        {loading && <tr>Loading ...</tr>}
        {window.innerWidth < 768 ?
        <tr>
          <td>
            { user.username }
          </td>
          <td>
            { user.teamnum }
          </td>
        </tr>
      :
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
        }
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