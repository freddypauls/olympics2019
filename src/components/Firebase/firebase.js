import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBbupd36sOqLD1pwJoSknDc8XY1rHwSYDY",
    authDomain: "bolympics.firebaseapp.com",
    databaseURL: "https://bolympics.firebaseio.com",
    projectId: "bolympics",
    storageBucket: "bolympics.appspot.com",
    messagingSenderId: "858275292059"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
    }

     // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

  }
  
  export default Firebase;