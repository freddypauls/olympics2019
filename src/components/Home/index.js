import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';
import Clock from './clock.js';
import { render } from 'react-dom';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';

var $ = require("jquery");

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

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
            <h2>Lekene</h2>
            <h5>Her er lekene som skal gjøre oss sørpe dritings</h5>
            <Tabs defaultTab="vertical-tab-one" vertical>
              <TabList>
                <Tab tabFor="vertical-tab-one">Bøtte Beerpong</Tab>
                <Tab tabFor="vertical-tab-two">Flip the cup</Tab>
                <Tab tabFor="vertical-tab-three">Shutgun race</Tab>
                <Tab tabFor="vertical-tab-four">Elimination cage</Tab>
                <Tab tabFor="vertical-tab-five">Quarters</Tab>
                <Tab tabFor="vertical-tab-six">Relay Race</Tab>
                <Tab tabFor="vertical-tab-seven">Suck and blow</Tab>
                <Tab tabFor="vertical-tab-eight">Denne flaksen skal aldri stå</Tab>
                <Tab tabFor="vertical-tab-nine">Titanic</Tab>
              </TabList>
              <TabPanel tabId="vertical-tab-one">
                <p className="">Bøtte Beerpong</p>
                <p>
                  To lag spiller mot hverandre med seks bøtter per lag. 
                  Reglene er enkle, hver gang en spiller treffer en bøtte, og da må alle på laget som ikke kastet drikke. 
                  Spillet er over når et lag er tom for bøtter.
                </p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-two">
                <p>Flip the cup</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-three">
                <p>Shotgun race</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-four">
                <p>Elimination cage</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-five">
                <p>Quarters</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-six">
                <p>Relay race</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-seven">
                <p>Suck and blow</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-eight">
                <p>Denne flasken skal aldri stå</p>
                <p></p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-nine">
                <p>Titanic</p>
                <p></p>
              </TabPanel>
            </Tabs>
          </section>

          <section className="low-mid-section">
            <div></div>
          </section>

          <section className="teams-footer-flex">
          <div className="teams-footer-flex-item">
            <p className="footer-tittel">Om eventet</p>
            <p className="footer-text">
              Beer Olympics ble startet i 2018, og arrangert av Eirik Aleksander Holmebukt.
              Det fant sted på fjellhamar, hjemme i hagen til Eirik. Der drakk vi oss fulle og utførte dumme oppgaver for å drikke mer.
              Til slutt var det laget som ble ledet av Ola som vant, og folk flokken mot byen for mer fyll.
            </p>
          </div>
          <div className="teams-footer-flex-item">
            <p className="footer-tittel">Hvor skjer det? TBA</p>
            <p className="footer-text">
              Fortsatt ikke avgjort hvor eventet skal skje i år, men det kommer fortløpende.
            </p>
          </div>
          <div className="teams-footer-flex-item">
            <p className="footer-tittel">Om siden</p>
            <p className="footer-text">
              Siden er laget av meg, Fredrik Paulsen. Startet med i fjor hvor jeg trengte pause fra bacheloroppgave, og i år blir den brukt til å lære meg React bedre. Siden var mer "flashy" i fjor, men har mer funksjonalitet i år.
              Siden i seg selv er da laget i React og med Firebase som database. Koden er tilgjengelig på min <a className="footer-link" href="https://github.com/freddypauls/olympics2019">Github</a> for de som vil se.
            </p>
          </div>
          <div className="teams-footer-flex-copyright">
            <p className="footer-text">Copyright &#169; 2019 | made by Fredrik Paulsen</p>
          </div>
        </section>

      </div>
      );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);