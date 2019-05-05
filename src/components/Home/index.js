import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';
import Clock from './clock.js';

/**
 * This utility function allows function calls to be debounced.
 * @param {Function} func Function that requires debouncing
 * @param {Number} wait Wait time in milliseconds between successive invocations
 */
const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollPositionY: 0,
    }
  }

  componentDidMount() {
    // 32 is the number of milliseconds to debounce
    // I picked this because it's approx 1 frame (ie: 16.7ms)
    // You'll want to modulate that to your taste.
    // Add console.logs in handleScroll function to check if its flooding.
    return window.addEventListener('scroll', debounce(this.handleScroll, 16))
  }

  componentWillUnmount() {
    return window.removeEventListener('scroll', debounce(this.handleScroll, 16))
  }

  handleScroll = () => {
    // + is unary operator, same as Number(window.scrollY)
    const scrollPositionY = +window.scrollY
    return this.setState({ scrollPositionY })
  }

  render() {
    // !! coerces value to be a Boolean
    // we want it to be true or false (true if scrollPositionY> 0)
    // it works because scrollPositionY=== 0 is falsy
    //const isScrolling = !!this.state.scrollPositionY
       return (
            <div className="">
            <section className="background-image-behind-card ">
              <div className="home-card">
                <div className="card-text">
                    <div className="main-title">BEER</div>
                    <div className="main-title">OLYMPICS</div>
                </div>
                <Clock className="countdown" deadline={'June, 28, 2019'} />
              </div>
            </section>
            
            <section className="home-flex-container">
            {/*<div className={(isScrolling) ? 'info-splitter isScrolling' : 'info-splitter'}></div>*/}
              <div className="games">
                <div className="games-title">Bøtte Beerpong</div>
                <div className="games-text">
                    To lag spiller mot hverandre med seks bøtter per lag. Reglene er enkle, hver gang en spiller treffer en bøtte må motstanderlaget drikke.
                    Spillet er over ett lag er tom for bøtter.
                    Så beerpong med større mål.
                </div>
              </div>
              <div className="games">
                <div className="games-title"></div>
                <div className="games-text">

                </div>
              </div>
            </section>

            <section className="low-mid-section">
              <div></div>
            </section>

            <section className="footer">
              <div className="top-footer">

              </div>
              <div className="bot-footer">
                <span>Copyright &#169; 2019 | made by Fredrik Paulsen</span>
              </div>
            </section>

          </div>
       );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);