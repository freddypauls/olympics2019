import React, { Component } from 'react';
import './index.css';
//import { ReactComponent as Logo } from './svg/logo.svg';  <Logo />

class LandingPage extends Component {
  constructor(props) {
    super(props)
  }

  

  render() {
    // Sets the number of stars we wish to display
    const numStars = 100;

    // For every star we want to display
    for (let i = 0; i < numStars; i++) {
      let star = document.createElement("div");  
      star.className = "star";
      var xy = getRandomPosition();
      star.style.top = xy[0] + 'px';
      star.style.left = xy[1] + 'px';
      //document.getElementById("landing-card").appendChild(star);
      document.body.append(star);
    }

    // Gets random x, y values based on the size of the container
    function getRandomPosition() {  
      var y = window.innerWidth;
      var x = window.innerHeight;
      var randomX = Math.floor(Math.random()*x);
      var randomY = Math.floor(Math.random()*y);
      return [randomX,randomY];
    }
       return (
          <div className="landing-card">
              <audio id="audio1" src={require("./audio/Star_Wars_original_opening_crawl_1977.mp3")} autoPlay />
              <section className="intro">
                About one year ago, in a garden not all that far away....
              </section>
              <section className="logo">
                <img src={require("./svg/logo.png")} />
              </section>
              <div id="board">  
                <div id="content">
                  <p id="title">Episode II</p>
                  <p id="subtitle">BEER OLYMPICS 2019</p>
                  <br />
                  <p>June 8th 2018, 20 brave souls (aspiring alcoholics) gathered in the garden of Eirik to find who could control their problems enough to rise victorious in the end.</p>
                  <p>The group was divided into 6 teams, and went through 6 games one more challenging than the next. Some held their composure, while others needed a break in the bushes ;), while most just got drunk enough to see the world spinning.. or all of the above.</p>
                  <p>At the end of it all, one team rose to victory, the team, led by Ola the average drunk, displayed alcoholism at its finest form. They won the competition that came to be the event of the year. From here the night led some to go home, while others raced to town in celebration.</p>
                  <p>Scroll on to see this years adventure unfold.</p>
                </div>
              </div>
            </div> 
       );
  }
}

export default LandingPage;