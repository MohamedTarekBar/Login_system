const firebaseApp = firebase.initializeApp ({
  apiKey: 'AIzaSyBW2InftQj45Gkd1ET6jWcu67fwhEwSh0k',
  authDomain: 'routelogin-4bfeb.firebaseapp.com',
  projectId: 'routelogin-4bfeb',
  storageBucket: 'routelogin-4bfeb.appspot.com',
  messagingSenderId: '438788483815',
  appId: '1:438788483815:web:c694c501b9f6a26ed8d042',
});
const db = firebaseApp.firestore ();
const auth = firebaseApp.auth ();

