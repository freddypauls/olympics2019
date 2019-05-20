import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import '../SignIn/index.css';
import './index.css';


class LeadersPage extends Component {
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
        <div className="flex-container-teams">
          <section className="flex-item-leaders-header">
            <div className="overlay-bluetint leaders-tint">
              <div className="teamlead-header">
                <h1>Lagledere</h1>
                <br />
                <span>Her er Årets lagledere</span>
              </div>
            </div>
          </section>

          <section className="headerthing">
            <h3> <span> Er noen flinke nok til å lede <u>deg</u> til seier?</span></h3>
          </section>

          <section className="flex-item-leaders flex-leaders">

            <div className="leaders eirik">
              <div className="img"></div>
              <div className="leaders-text">
                <h4>Erik Holtebukt Alexander</h4>
                <p>Eirik har perioder med alkoholisme, det er ikke mye tid imellom (som regel ingen), men drikken varierer i smak.. ikke mengde. </p>
                <p>I fjor var det Tequila (ingen god tid), mens i år må det nesten være Cava, cavasøndag har blitt den nye religionen til Eirik. Hva religionen går ut på aner jeg ikke, men han holder iallfall ett litt for nært samhold med sin gud.</p>
              </div>
            </div>

            <div className="leaders ola">
             <div className="img"></div>
              <div className="leaders-text">
                <h4>Ola Hvile Hesjedal</h4>
                <p>Denne karen er en alkoholiker som få, han kan ofte skimtes ute på byen, og man vet aldri helt hvor han ender opp. Det som er sikkert er at om han kommer hjem, så er det sent og at han fortsatt er full.</p>
              </div>
              <div className="desktopimg"></div>
            </div>

            <div className="leaders fredrik">
              <div className="img"></div>
              <div className="leaders-text">
                <h4>Fredrik Paulsen</h4>
                <p>Virker som en edru person helt til det smeller, men da er det for sent å stoppe. Ikke det største alkoholikeren, men kjent for å sjenke deg med Jäger og/eller Absinth. Beer pong King (yes you heard me Eirik), website wizard among other things.</p>
              </div>
            </div>

            <div className="leaders martin">
              <div className="img"></div>
              <div className="leaders-text">
                <h4>Martin Levin</h4>
                <p>Martins 99 hunt er over, og 00 sesongen har startet (neida, joda). Jobbet for tiden som bartender, hvem som har stolt på en alkoholiker med å mixe alkohol til andre aner jeg ikke, men han har ikke blitt tatt enda.</p>
              </div>
              <div className="desktopimg"></div>
            </div>

            <div className="leaders TBA">
              <div className="img"></div>
              <div className="leaders-text">
                <h4>TBA</h4>
                <p></p>
              </div>
            </div>

            <div className="leaders anders">
              <div className="img"></div>
              <div className="leaders-text">
                <h4>Andreas "Dua" Runningen</h4>
                <p>Andreas AKA Dua, som oftest blir han fullere enn de fleste, men finner alltid veien hjem til senge. Har noen vrangforestillinger om at han kommer til å ta seieren i år, men de fleste som har sett han i en drikkelek vet at dette ikke kommer til å skje. Om kvelden går som planlagt kan dere finne Andreas snorkende på nærmeste bussholdeplass.</p>
              </div>
              <div className="desktopimg"></div>
            </div>

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

export default withAuthorization(condition)(LeadersPage);