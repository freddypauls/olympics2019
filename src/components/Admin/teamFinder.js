import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

    const GoT = ["Lannister", "Targaryen", "Baratheon", "Stark", "Tyrell", "Arryn"];
    const HP = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
    const PJ = ["Poseidon", "Zeus", "Hades", "Athena", "Ares", "Hephaestus", "Demeter", "Apollo"];
    const LotR = ["Elf", "Dwarf", "Hobbit", "Goblin", "Balroy", "Huorn"];
    const SW = ["Jedi", "Sith", "Stormtrooper", "Wookie", "Rebel", "Imperial"];
    const M = ["X-Men", "Avengers", "Guardians", "S.H.I.E.L.D", "Defender", "A.I.M"];

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
    let house = 1;
    let house2 = 1;

    shuffledUsers.map(user => {
        if(user.wantTeam === true && user.gender === "Female") {
          if(i > 6) {
            i = 1;
            house = 1;
          }

          if(house === 1){
            this.props.firebase.user(user.uid).update({
              teamnum: i,
              house: shuffleArray(GoT)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;
            house++;

          } else if(house === 2){
            this.props.firebase.user(user.uid).update({
              teamnum: i,
              house: shuffleArray(HP)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;
            house++;

          } else if(house === 3){
            this.props.firebase.user(user.uid).update({
              teamnum: i,
              house: `Dauther of ${shuffleArray(PJ)[0]}`,
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;
            house++;

          } else if(house === 4){
            this.props.firebase.user(user.uid).update({
              teamnum: i,
              house: shuffleArray(LotR)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;
            house++;

          } else if(house === 5){
            this.props.firebase.user(user.uid).update({
              teamnum: i,
              house: shuffleArray(SW)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;
            house++;

          
          } else if(house === 6){
            this.props.firebase.user(user.uid).update({
              teamnum: i,
              house: shuffleArray(M)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            i++;
            house++;

            
          } 
        }
        else if(user.wantTeam === true && user.gender === "Male") {
          if(j > 6) {
            j = 1;
            house2 = 1;
          }
          if(house2 === 1){
            this.props.firebase.user(user.uid).update({
              teamnum: j,
              house: shuffleArray(GoT)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            j++;
            house2++;


          } else if(house2 === 2){
            this.props.firebase.user(user.uid).update({
              teamnum: j,
              house: shuffleArray(HP)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            j++;
            house2++;

           
          } else if(house2 === 3){
            this.props.firebase.user(user.uid).update({
              teamnum: j,
              house: `Son of ${shuffleArray(PJ)[0]}`,
            })
            .catch(error => {
                this.setState({ error });
            });

            j++;
            house2++;

          } else if(house2 === 4){
            this.props.firebase.user(user.uid).update({
              teamnum: j,
              house: shuffleArray(LotR)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            j++;
            house2++;

          } else if(house2 === 5){
            this.props.firebase.user(user.uid).update({
              teamnum: j,
              house: shuffleArray(SW)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            j++;
            house2++;

          } else if(house2 === 6){
            this.props.firebase.user(user.uid).update({
              teamnum: j,
              house: shuffleArray(M)[0],
            })
            .catch(error => {
                this.setState({ error });
            });

            j++;
            house2++;

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