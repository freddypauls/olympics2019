import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../SignIn/index.css';

const TeamFinderFunc= () => (
  <TeamFinderForm></TeamFinderForm>
);

const INITIAL_STATE = {
    username: '',
    position: '',
    error: null,
  };

class TeamFinderBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {

    const { username, position } = this.state;
    const positions = [];

    this.props.firebase
      .team()
      .users()
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        
      } = this.state;

    return (
        <form onSubmit={this.onSubmit}>
            <button type="submit" className="form-btn-set-teams">
                Set teams
            </button>
        </form>
    );
  }
}

const TeamFinderForm = compose(
  withRouter,
  withFirebase,
)(TeamFinderBase);

export default TeamFinderFunc;