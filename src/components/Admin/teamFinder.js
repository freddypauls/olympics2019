import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../SignIn/index.css';

const teamFinderFunc= () => (
  <div className="form-card">
    <TeamFinderForm />
    <button onClick={teamFinder()}> Set teams </button>
  </div>
);

const INITIAL_STATE = {
    username: '',
    role: '',
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

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      gender === '';

    return (
        <button disabled={isInvalid} type="submit" className="form-btn-signin">
            Sign Up
        </button>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const TeamFinderForm = compose(
  withRouter,
  withFirebase,
)(TeamFinderBase);

export default AdminLogic;