import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import './index.css';

class RenderTeam4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      teams: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.team(`${4}/users`).on('value', snapshot => {
      const usersObject = snapshot.val();

      if(usersObject != null){
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
          users: usersList,
          loading: false,
        });
      }
    });

    this.props.firebase.teams().on('value', snapshot => {
      const teamsObject = snapshot.val();
      
      if(teamsObject != null){
        // Setting object as list (to ready for print)
        const teamsList = Object.keys(teamsObject).map(key => ({
          ...teamsObject[key],
          teamnum: key,
        }));

        // Setting the list of users as state to be used across the file
        this.setState({
          teams: teamsList,
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.teams().off();
  }

  render() {
    const { users, teams } = this.state;
    return (
      <table className="table-for-teams">
        <thead className="table-for-teams-header">
          <tr className="table-for-teams-row">
          {teams.filter(team => team.teamnum === "team4").map(team => (
              <th colSpan="2" key={team.teamnum}>
               {team.teamname}
              </th>
            ))}
          </tr>
        </thead>
        <thead className="table-for-teams-header">
          <tr className="table-for-teams-row">
            <th className="double-colspan">
              User:
            </th>
            {teams.filter(team => team.teamnum === "team4").map(team => (
              <th key={team.teamnum}>
                Leader: {team.leader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-for-teams-body">
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


const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase,
)(RenderTeam4);