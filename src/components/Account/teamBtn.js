import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const teamBtn = () => (
    <div>
        <p>Put me on a team!</p>
        <button> + </button>
    </div>
);

class SignUpFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
  
      const { username, email, teamnum, gender, passwordOne, isAdmin } = this.state;
      const roles = [];
  
      if (isAdmin) {
        roles.push(ROLES.ADMIN);
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
              roles,
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
          username,
          email,
          gender,
          passwordOne,
          passwordTwo,
          error,
        } = this.state;
  
        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '' ||
        gender === '';
  
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
          <button disabled={isInvalid} type="submit" className="form-btn-signin">
              Sign Up
          </button>
  
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
  
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