<template>
  <div class="q-pa-md flex flex-center">
    <AuthForm is-registration />
  </div>
</template>

<script>
import AuthForm from "../components/AuthForm";

export default {
  name: "SignUp",

  components: {
    AuthForm
  }
};
</script>

<style scoped></style>
