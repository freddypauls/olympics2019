import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

//firebase shizz
const config = {
    apiKey: "API key here",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
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

    team = teamnum => this.db.ref(`teams/team${teamnum}`);

    teamUser = ( teamnum, uid ) => this.db.ref(`teams/team${teamnum}/users/${uid}`);

    teams = () => this.db.ref(`teams`);

  }
  
  export default Firebase;
