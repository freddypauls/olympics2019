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
                  <div className="main-title date"><span>28</span>.06.2019</div>
              </div>
              <Clock className="countdown" deadline={'June, 28, 2019'} />
            </div>
          </section>
          
          <section className="home-flex-container">
            <div className="home-intro">
              <div className="intro-tittel"><b>Velkommen til det andre årlige BEER OLYMPICS</b></div><br />
              <div className="intro-text">
                Beer olympics ble startet av vår egne fyllik Eirik Holmebukt, og var <i>"Event of the year 2018"</i> vel, som vi var med på anywhoos <br/>
                <br />
                I år er målet å toppe dette, vanskeligere å bli fullere enn i fjor men vi kan gjøre det bedre. <br />
                <br />
                <span className="intro-leker-agenda"><i>Her er årets leker og agenda:</i></span>
              </div>
              <span></span>
            </div>
            <Tabs defaultTab="vertical-tab-one" vertical>
              <TabList>
                <Tab tabFor="vertical-tab-one">Bøtte Beerpong</Tab>
                <Tab tabFor="vertical-tab-two">Flip the cup</Tab>
                <Tab tabFor="vertical-tab-three">Shutgun race</Tab>
                <Tab tabFor="vertical-tab-four">Elimination cage</Tab>
                <Tab tabFor="vertical-tab-five">Quarters</Tab>
                <Tab tabFor="vertical-tab-six">Relay Race</Tab>
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
                <p>Fungerer som et helt vanlig game med flip the cup, alle spillerene på to lag har en kopp med øl. En etter en drikker opp ølen og flipper koppen så den lander etter de er ferdig. Første laget som blir ferdig med alle koppene vinner.</p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-three">
                <p>Shotgun race</p>
                <p>En etter en på ett lag skal shotgune en øl, tiden blir tatt fra første personen starter å drikke til siste personen er ferdig med å drikke.</p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-four">
                <p>Elimination cage</p>
                <p>Elimination cage fungerer ikke som et vanlig spill med cage. Man har en kopp som er sentrert på bordet. Alle spillerene har en kopp som står i en sirkel rundt koppen. Treffer en spiller koppen i midten må alle spillerene uten om han som kastet chugge, for deretter å prøve å flippe koppen, den siste som klarer dette blir eliminert. Treffer du en annen spiller sin kopp er konkuransen mellom spilleren som traff, og spilleren som har koppen som ble truffet. Treffer du din egen kopp er du eliminert, og må drikke opp drikken din.</p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-five">
                <p>Quarters</p>
                <p>En og en spiller skal sprette en mynt i en kopp så drikke den opp. Tiden blir tatt for laget og den beste tiden vinner.</p>
              </TabPanel>
              <TabPanel tabId="vertical-tab-six">
                <p>Relay race</p>
                <p>
                  Går gjennom fire poster.<br /><br />
                    Post en går ut på å snurre rundt ett balltre 10 ganger for deretter og chugge en 0.33 liter, deretter løper du videre til neste post.
                    <br /><br />
                    Post 2 går ut på å treffe en beerpong kopp for deretter å drikke innholdet. Så gå videre til neste post.
                    <br /><br />
                    Post 3 går ut på å treffe en stack med noen ølbokser oppå hverandre så chugge en 0.33 liter
                    <br /><br />
                    Post 4 er avsluttende og har flere faser. Det starter med suck and blow. Deretter skal laget kjøre en runde med denne flasken skal aldri stå. Og avsluttes med en runde med titanic.
                    <br /><br />
                </p>
              </TabPanel>
            </Tabs>

            <div className="agenda">
              Her kommer planen for dagen...
            </div>
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