import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../SignIn/index.css';

const TeamFinderFunc= () => (
  <TeamFinderForm>

  </TeamFinderForm>
);

const INITIAL_STATE = {
    users: [],
  };

class TeamFinderBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {

    this.props.firebase.users().orderByChild("randomNum").on('value', snapshot => {
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
    let i = 1;
    let j = 1;
    users.map(user => {
        if(user.wantTeam === true && user.gender === "Female") {
            this.props.firebase.user(user.uid).update({
                teamnum: i,
              });

            this.props.firebase
              .team(`${i}/${user.uid}`)
              .set({
                  username: user.username,
              })
              .catch(error => {
                  this.setState({ error });
              });

              i++
              if(i > 2){
                i = 1;
              }
        }
        else if(user.wantTeam === true && user.gender === "Male") {
            this.props.firebase.user(user.uid).update({
                teamnum: j,
              });
              this.props.firebase
              .team(`${j}/${user.uid}`)
              .set({
                  username: user.username,
              })
              .catch(error => {
                  this.setState({ error });
              });
              j++
              if(j > 2){
                  j = 1;
              }
        }

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
                <button type="submit" className="form-btn-set-teams">
                    Set teams
                </button>
            </form>
        </div>
    );
  }
}

const TeamFinderForm = compose(
  withRouter,
  withFirebase,
)(TeamFinderBase);

export default TeamFinderFunc;