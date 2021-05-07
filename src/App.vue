<template>
  <div id="app">
    <Glyphs />
    <Controls />
  </div>
</template>

<script>
import App from "@/Scene/app";

import Glyphs from './components/Glyphs.vue'
import Controls from './components/Controls.vue'

export default {
  name: 'App',
  components: {
    Glyphs,
    Controls
  },
  mounted() {

    this.app = new App({
      $el: document.querySelector("#scene")
    });
    this.app.handleResize();
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Love';
  src: url('/assets/factory/Love-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

html, body {
  margin: 0;
  padding: 0;
  // font-family: 'Love';
  // font-family: 'Love';
  font-family: "Google Sans", "Helvetica Neue", sans-serif;
  color: #3c4043;
  background-color: #fffdf9;
}
#canvas {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
