import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import './index.css';

class RenderTeam2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.team(`${2}/users`).on('value', snapshot => {
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
    this.props.firebase.teams().off();
  }

  render() {
    const { users } = this.state;
    return (
      <table className="table-for-teams">
        <thead className="table-for-teams-header">
          <tr className="table-for-teams-row">
            <th colSpan="2">
                Team 2
            </th>
          </tr>
        </thead>
        <thead className="table-for-teams-header">
          <tr className="table-for-teams-row">
            <th className="double-colspan">
              User:
            </th>
          </tr>
        </thead>
        <tbody className="table-for-teams-body">
          {users.map(user => (
            <tr className="table-for-teams-row" key={user.uid}>
                <td>{user.username}</td>
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
)(RenderTeam2);