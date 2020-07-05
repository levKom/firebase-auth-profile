<template>
  <div class="app text-white column justify-between">
    <q-toolbar class="bg-black text-white shadow-2 nav">
      <q-btn
        flat
        to="/home"
        label="home"
        :class="[isActivePage('home') && 'bg-secondary']"
      />
      <q-btn
        flat
        to="/about"
        label="about"
        :class="[isActivePage('about') && 'bg-secondary']"
      />
      <q-space />
      <div v-if="!isUserAuthenticated">
        <q-btn
          flat
          to="/signin"
          label="sign in"
          :class="[isActivePage('signin') && 'bg-secondary']"
        />
        <q-btn
          flat
          to="/signup"
          label="sign up"
          :class="[isActivePage('signup') && 'bg-secondary']"
        />
      </div>
      <div v-if="isUserAuthenticated">
        <span>Some user</span>
        <q-btn flat label="Logout" class="bg-amber-10" @click="logout" />
      </div>
    </q-toolbar>

    <router-view />

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Footer from "./components/Footer";
export default {
  components: {
    Footer
  },
  created() {
    this.checkAuth();
  },
  computed: {
    ...mapGetters(["isUserAuthenticated"])
  },
  methods: {
    ...mapActions(["logout", "checkAuth"]),

    isActivePage(pageName) {
      return this.$router.currentRoute.path.startsWith(pageName, 1);
    }
  }
};
</script>

<style lang="scss">
@import "styles/quasar.variables.scss";

.app {
  min-height: 100vh;

  .nav {
    height: $navHeight;
    a {
      font-weight: bold;
    }
  }
}
</style>
