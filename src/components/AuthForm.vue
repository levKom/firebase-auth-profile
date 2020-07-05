<template>
  <div>
    <div v-if="error">{{ error.message }}</div>
    <q-form
      @submit.prevent="isRegistration ? onSubmit() : onLogin()"
      @reset="onReset"
      class="q-gutter-lg"
      style="width: 500px"
    >
      <q-input v-model="email" filled type="email" label="Email">
        <template v-slot:append>
          <q-icon
            :name="isRegistration ? 'how_to_reg' : 'account_circle'"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <q-input
        v-model="password"
        filled
        label="Password"
        :type="isPasswordHide ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPasswordHide ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordHide = !isPasswordHide"
          />
        </template>
      </q-input>

      <q-input
        v-if="isRegistration"
        v-model="passwordConfirm"
        filled
        label="Confirm password"
        :type="isPasswordConfirmHide ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPasswordConfirmHide ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordConfirmHide = !isPasswordConfirmHide"
          />
        </template>
      </q-input>

      <div>
        <q-btn
          :label="isRegistration ? 'register now' : 'login'"
          type="submit"
          color="primary"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <div>
      <q-btn
        label="Sing in with google account"
        color="secondary"
        class="q-mt-xl text-white"
        @click="onGoogleLogin"
      >
        <q-avatar size="60px">
          <img src="../static/google-logo.png" alt="logo" />
        </q-avatar>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthForm",

  props: {
    isRegistration: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      password: "",
      passwordConfirm: "",
      isPasswordHide: true,
      isPasswordConfirmHide: true,
      email: "",
      error: false,

      accept: false
    };
  },

  methods: {
    ...mapActions("user", ["login", "logout", "register", "googleLogin"]),

    onGoogleLogin() {
      this.googleLogin();
    },

    onSubmit() {
      this.register({ email: this.email, password: this.password });
    },

    onLogin() {
      this.login({ email: this.email, password: this.password });
    },

    onReset() {
      this.email = this.password = this.passwordConfirm = null;
      this.accept = false;
    }
  }
};
</script>

<style scoped></style>
