import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
      this.db = app.database();
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

      // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

        // *** User API ***

    authUser = () => this.db.ref(`users/${this.auth.currentUser.uid}`);

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    teams = () => this.db.ref('teams');

  }
  
  export default Firebase;