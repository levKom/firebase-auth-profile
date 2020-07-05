import router from "../../router/index";
import firebase from "../../firebase";
import "firebase/auth";

import { Loading } from "quasar";

const state = {
  userProfile: {},
  isAuthenticated: false
};

const getters = {
  isUserAuthenticated: state => state.isAuthenticated,
  getUserProfile: state => state.userProfile
};

const mutations = {
  SET_USER_LOGGED_OUT(state) {
    state.isAuthenticated = false;
  },
  SET_USER_LOGGED_IN(state) {
    state.isAuthenticated = true;
  },
  SET_USER_INFO(state, user) {
    state.userProfile = {
      name: user.displayName,
      picture: user.photoURL,
      email: user.email
    };
  }
};

const actions = {
  async googleLogin({ commit, getters }) {
    if (getters.isUserAuthenticated) return;

    Loading.show();
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await firebase.auth().signInWithPopup(provider);
      commit("SET_USER_LOGGED_IN");
    } catch (e) {
      console.log(e);
    } finally {
      Loading.hide();
    }
  },

  async login({ commit, getters }, { email, password }) {
    if (getters.isUserAuthenticated) return;

    Loading.show();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      commit("SET_USER_LOGGED_IN");
    } catch (e) {
      console.log(e);
    } finally {
      Loading.hide();
    }
  },

  redirectToHome() {
    if (!router.currentRoute.path.endsWith("home")) {
      console.log("redirect");
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
          console.log("111", user);
          commit("SET_USER_INFO", user);
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
