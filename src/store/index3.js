import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import * as firebase from "firebase/app";
import "firebase/auth";

import { Loading } from "quasar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false
  },

  getters: {
    isUserAuthenticated: state => state.isAuthenticated
  },

  mutations: {
    SET_USER_LOGGED_OUT(state) {
      state.isAuthenticated = false;
    },
    SET_USER_LOGGED_IN(state) {
      state.isAuthenticated = true;
    }
  },

  actions: {
    isAuthenticated() {
      return firebase.auth().currentUser;
    },

    redirectToHome() {
      if (!router.currentRoute.path.endsWith("home")) {
        router.replace({ name: "home" });
      }
    },

    redirectToSignIn() {
      if (!router.currentRoute.path.endsWith("signin")) {
        router.replace({ name: "signin" });
      }
    },

    async checkAuth({ commit, dispatch }) {
      Loading.show();
      try {
        const user = await firebase.auth().onAuthStateChanged(user => {
          if (user) {
            commit("SET_USER_LOGGED_IN");
            dispatch("redirectToHome");
          } else {
            commit("SET_USER_LOGGED_OUT");
            dispatch("redirectToSignIn");
          }
        });
        console.log("checkAuth data : ", user);
      } catch (e) {
        console.log(e);
      } finally {
        Loading.hide();
      }
    },

    //TODO: Add q-dialog 'are you sure'
    async logout({ commit, dispatch }) {
      Loading.show();
      try {
        const data = await firebase.auth().signOut();
        console.log("logout data : ", data);

        commit("SET_USER_LOGGED_OUT");

        dispatch("redirectToSignIn");
      } catch (e) {
        console.log("logout err: ", e);
      } finally {
        Loading.hide();
        console.log("finally for loaders");
      }
    },

    async login({ commit }, { email, password }) {
      Loading.show();
      console.log("login start");

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        // await dispatch("redirectToHome");
        console.log("login data: ", user);

        commit("SET_USER_LOGGED_IN");
      } catch (e) {
        console.log(e);
      } finally {
        Loading.hide();
      }
    },

    async register({ commit, dispatch }, { email, password }) {
      Loading.show();
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // await dispatch("redirectToHome");
        console.log("register user: ", user);

        commit("SET_USER_LOGGED_IN");
      } catch (e) {
        dispatch("logout");
        console.log("register error: ", e);
      } finally {
        console.log("finally for loaders");
        Loading.hide();
      }
    }
  },
  modules: {}
});
