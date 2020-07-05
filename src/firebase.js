import firebase from "firebase/app";
import "@firebase/auth";
// import "@firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBAHJcerjU8chaExXn0-XQ7I_pSWgSZvyI",
  authDomain: "auth-quasar-app.firebaseapp.com",
  databaseURL: "https://auth-quasar-app.firebaseio.com",
  projectId: "auth-quasar-app",
  storageBucket: "auth-quasar-app.appspot.com",
  messagingSenderId: "735638091699",
  appId: "1:735638091699:web:7238bb1d3b4856f71fbdc6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
