import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
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

    function shuffleArray(array) {
      let i = array.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  
    const shuffledUsers = shuffleArray(users);
    let i = 1;
    let j = 1;

    shuffledUsers.map(user => {
        if(user.wantTeam === true && user.gender === "Female") {
            this.props.firebase.user(user.uid).update({
                teamnum: i,
              })
              .catch(error => {
                  this.setState({ error });
              });

              i++
              if(i > 3){
                i = 1;
              }
        }
        else if(user.wantTeam === true && user.gender === "Male") {
            this.props.firebase.user(user.uid).update({
                teamnum: j,
              })
              .catch(error => {
                  this.setState({ error });
              });
              j++
              if(j > 3){
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
                    Divide players
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