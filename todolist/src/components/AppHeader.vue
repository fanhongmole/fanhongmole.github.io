<template>
  <div class="header">
    <div class="header-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      title: "Let's do somethings!"
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-title {
  margin: 24px 0 30px 0;
  font-size: 36px;
  color: #46b0e0;
}

</style>
