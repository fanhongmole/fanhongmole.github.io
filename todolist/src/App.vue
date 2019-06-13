<template>
  <div id="app">
    <div class="navbar">
      <div class="nav-brand">
        <h1>todolist</h1>
      </div>
    </div>

      <AppHeader></AppHeader>
    <div class="wrap">
      <AppContent></AppContent>
    </div>
      <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppFooter from "./components/Appfooter";

export default {
  name: "App",
  components: {
    AppHeader,
    AppContent,
    AppFooter
  },
  methods: {}
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
  position: relative;
}

#app {
  text-align: center;
}

.navbar {
  padding: 6px 0;
  background: #63c8f7;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
}

.nav-brand h1 {
  line-height: 1.15;
  font-size: 28px;
  color: rgba(255, 255, 255);
}

.wrap {
  max-width: 400px;
  margin: 0 auto;
}

.wrap>* {
  margin: 8px 0;
}
</style>
