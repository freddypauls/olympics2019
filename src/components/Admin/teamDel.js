import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import '../SignIn/index.css';

const TeamnumDelFunc= () => (
  <TeamnumDelForm>

  </TeamnumDelForm>
);

const INITIAL_STATE = {
    users: [],
  };

class TeamnumDelBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onSubmit = event => {

    const { users } = this.state;
    
    users.filter(user => user.teamnum != null).map(user => {
        this.props.firebase.user(user.uid).update({
            teamnum: null,
        })
    })
    
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    return (
        <div>
            <form onSubmit={this.onSubmit}>
                <button type="submit" className="btn-del-teams">
                  <i className="material-icons">clear_all</i>
                </button>
            </form>
        </div>
    );
  }
}

const TeamnumDelForm = compose(
  withRouter,
  withFirebase,
)(TeamnumDelBase);

export default TeamnumDelFunc;