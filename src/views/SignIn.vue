<template>
  <div class="q-pa-md flex flex-center">
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from "../components/AuthForm";

export default {
  name: "SignIn",

  components: {
    AuthForm
  }
};
</script>

<style scoped></style>
