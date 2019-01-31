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
    const isScrolling = !!this.state.scrollPositionY
       return (
            <div className="">
            <section className="background-image-behind-card ">
              <div className="home-card">

                <div className="card-text">
                  <Clock deadline={'July, 20, 2019'} />
                <br/>
                  <hr />
                    <div className="welcome"> WELCOME </div>
                  <hr className="hr2" />
                  <br />
                  <div className="icon-place">
                    Hello World
                    <i class="material-icons icon-font-size">place</i>
                  </div>
                  <div className="icon-event">
                    Hello World
                    <i class="material-icons icon-font-size">event</i>
                  </div>
                  
                </div>
              </div>
            </section>
            
            <section className="home-flex-container">
            {/*<div className={(isScrolling) ? 'info-splitter isScrolling' : 'info-splitter'}>
            
            </div>*/}
            </section>

          </div>
       );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);