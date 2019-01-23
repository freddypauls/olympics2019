import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../SignIn/index.css';

const SignUpPage = () => (
  <div className="form-card">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

// Setting initial state, this will be default value for user info
const INITIAL_STATE = {
    username: '',
    email: '',
    teamnum: '',
    gender: '',
    passwordOne: '',
    passwordTwo: '',
    ssc: '',
    wantTeam: false,
    isAdmin: false,
    error: null,
  };

// Making component for the sign up
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {

    // Fetching state
    const { username, email, teamnum, gender, passwordOne, isAdmin, wantTeam } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    } else {
      roles.push(ROLES.PARTICIPANT);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            teamnum,
            gender,
            created_at: new Date().toString(),
            roles,
            wantTeam,
          });
      }) // Then set state back and reroute home
      .then(() => {   
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();

  }

  // Event listenerm checking for change of values, and assigning the values from inputs to the state
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        gender,
        ssc,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      gender === '' ||
      ssc !== 'SSDG';

    return (
      <form onSubmit={this.onSubmit}>
      <input
          name="username"
          className="form-input form-input-username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          className="form-input form-input-email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br/>
        <select name="gender" className="form-input" value={this.props.value} onChange={this.onChange}>
          <option>Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="passwordOne"
          className="form-input form-input-password"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          className="form-input form-input-password"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <br/>
        <input
          name="ssc"
          className="form-input form-input-secretCode"
          value={ssc}
          onChange={this.onChange}
          type="text"
          placeholder="Super Secret Code"
        />
        <button disabled={isInvalid} type="submit" className="form-btn-signin">
            Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

// Sign up link, to be displayed on the sign in page
const SignUpLink = () => (
  
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };