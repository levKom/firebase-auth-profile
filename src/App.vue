<template>
  <div class="app text-white column justify-between">
    <q-toolbar class="bg-black text-white shadow-2 nav" ref="toolbar">
      <q-btn
        v-if="isUserAuthenticated"
        flat
        to="/home"
        label="home"
        :class="[isActivePage('home') && 'bg-secondary']"
      />
      <q-btn
        v-if="isUserAuthenticated"
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
        <div ref="user">
          <q-avatar v-if="getUserProfile.picture" class="q-mx-xs">
            <img :src="getUserProfile.picture" alt="avatar" />
          </q-avatar>
          <span v-if="getUserProfile.name || getUserProfile.email">
            {{ getUserProfile.name || getUserProfile.email }}
          </span>
        </div>
        <q-menu anchor="bottom right" self="top right" :offset="[12, 12]">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-btn flat label="Logout" @click="onLogout"
              /></q-item-section>
            </q-item>
          </q-list>
        </q-menu>
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
    ...mapGetters("user", ["isUserAuthenticated", "getUserProfile"])
  },
  methods: {
    ...mapActions("user", ["logout", "checkAuth"]),

    onLogout() {
      this.$q
        .dialog({
          title: "Logout confirmation",
          message: "Are you sure you want to log out?",
          persistent: true,
          ok: {
            color: "secondary"
          },
          cancel: {
            color: "secondary"
          }
        })
        .onOk(() => {
          this.logout();
        });
    },

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
