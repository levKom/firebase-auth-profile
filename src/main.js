import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import axios from "axios";
// import firebase from "firebase/app";
// import { firebaseConfig } from "./firebase";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
// const firebase = {
//   apiKey: "AIzaSyBAHJcerjU8chaExXn0-XQ7I_pSWgSZvyI",
//   authDomain: "auth-quasar-app.firebaseapp.com",
//   databaseURL: "https://auth-quasar-app.firebaseio.com",
//   projectId: "auth-quasar-app",
//   storageBucket: "auth-quasar-app.appspot.com",
//   messagingSenderId: "735638091699",
//   appId: "1:735638091699:web:7238bb1d3b4856f71fbdc6"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

//Checking isAuthUser before running app
//Allows to prevent redirection while checking for user is auth without having data in localstorage
// let app;
//
// firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       render: h => h(App)
//     }).$mount("#app");
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
