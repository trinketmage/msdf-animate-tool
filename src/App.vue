<template>
  <div id="app">
    <Controls />
    <FileUpload />
    <Glyphs />
  </div>
</template>

<script>
import App from "@/Scene/app";

import Controls from './components/Controls.vue'
import FileUpload from './components/FileUpload.vue'
import Glyphs from './components/Glyphs.vue'

import gsap from "gsap";
import GSDevTools from "@/pure/gsap/GSDevTools";

export default {
  name: 'App',
  components: {
    Controls,
    FileUpload,
    Glyphs
  },
  mounted() {
    this.app = new App({
      $el: document.querySelector("#scene")
    });
    this.app.handleResize();

    const interpolate = {
      x: 0
    };
    var tl = new gsap.timeline({
      onUpdate: () => {
        this.app.components.title.material.uniforms.mixRatio.value = interpolate.x;
      }
    })
    tl.to(interpolate, {duration: 1, x: 1, ease: "linear"});
    GSDevTools.create({keyboard: false});
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
