import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../SignIn/index.css';

const TeamFinderFunc= () => (
  <div className="form-card">
    <TeamFinderBase />
  </div>
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
      .teams()
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .team()
          .user(authUser.user.uid)
          .set({
            username,
            position,
          });
      })
      .then(() => {   
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
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
        <button type="submit" className="form-btn-signin">
            Set teams
        </button>
    );
  }
}

const TeamFinderForm = compose(
  withRouter,
  withFirebase,
)(TeamFinderBase);

export default TeamFinderFunc;