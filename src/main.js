import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import firebase from "firebase/app";

Vue.config.productionTip = false;

//Checking isAuthUser before running app
//Allows to prevent redirection while checking for user is auth without having data in localstorage
let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
