/* Main React and Component */
import React, { Component } from 'react';
import { compose } from 'recompose';

/* Firebase, Auth and Roles (login conditions) */
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

/* Styling */
import './index.css';

/* Team components */
import TeamFinderFunc from './teamFinder.js';
import TeamSetterFunc from './setTeams.js';
import TeamRemoverFunc from './delUsersTeam.js';

/* Team Render Components */
import RenderTeam1 from '../Teams/team1.js';
import RenderTeam2 from '../Teams/team2.js';
import RenderTeam3 from '../Teams/team3.js';
import RenderTeam4 from '../Teams/team4.js';
import RenderTeam5 from '../Teams/team5.js';
import RenderTeam6 from '../Teams/team6.js';

/* Admin Page Code */
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
          <TeamFinderFunc />

          <TeamSetterFunc />

          <TeamRemoverFunc />
        </div>
        <div className="flex-item-admin-aside">
          <RenderTeam1 />

          <RenderTeam2 />

          <RenderTeam3 />

          <RenderTeam4 />
          
          <RenderTeam5 />

          <RenderTeam6 />
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
      {window.innerWidth < 768 ?
        users.map(user => (
          <tbody className="admin-table-row" key={user.uid}>
            {loading && <tr>Loading ...</tr>}
            <tr>
              <td>
                { user.username }
              </td>
              <td>
                { user.teamnum }
              </td>
            </tr>
          </tbody>
        ))
      :
      users.map(user => (
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
              { user.roles[2] ? user.roles[2] : user.roles[1] ? user.roles[1] : user.roles[0] }
            </td> 
          </tr>
        </tbody>
      ))}
  </table>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);