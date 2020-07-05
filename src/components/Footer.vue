<template>
  <footer class="bg-black text-white column items-center justify-center">
    <div class="text-white">
      <span class="q-my-none">{{ timeStamp }}</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  created() {
    setInterval(this.getNow, 1000);
  },

  data() {
    return {
      timeStamp: ""
    };
  },

  methods: {
    getNow: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;

      this.timeStamp = dateTime;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/quasar.variables.scss";
body {
  footer {
    height: $navHeight;
    font-size: 16px;
  }
}
</style>
