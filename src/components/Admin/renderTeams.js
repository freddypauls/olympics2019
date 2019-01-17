import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import './index.css';

class RenderTeamsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      teams: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.teams().on('value', snapshot => {
      const teamsObject = snapshot.val();

      const teamsList = Object.keys(teamsObject).map(key => ({
        ...teamsObject[key],
        score: key,
      }));

      this.setState({
        users: teamsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.teams().off();
  }

  render() {
    const { teams, loading } = this.state;
    
    return (
      <div>
          
      </div>
    );
  }
}


const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(RenderTeamsPage);