import firebase from "firebase";
import store from "./store/index3";

//https://firebase.google.com/docs/auth/web/manage-users
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch();
  }
});
