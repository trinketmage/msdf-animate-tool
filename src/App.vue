<template>
  <div id="app">
    <Controls />
    <FileUpload />
    <Glyphs />
    <Timeline />
  </div>
</template>

<script>
import App from "@/Scene/app";

import Controls from './components/Controls.vue'
import FileUpload from './components/FileUpload.vue'
import Glyphs from './components/Glyphs.vue'
import Timeline from './components/Timeline.vue'

import gsap from "gsap";
import GSDevTools from "@/pure/gsap/GSDevTools";

export default {
  name: 'App',
  components: {
    Controls,
    FileUpload,
    Glyphs,
    Timeline
  },
  mounted() {
    this.app = new App({
      $el: document.querySelector("#scene")
    });
    this.app.handleResize();

    this.interpolate = {
      x: 0
    };
    this.tl = new gsap.timeline({
      id: "Love",
      onUpdate: () => {
        this.app.components.title.material.uniforms.mixRatio.value = this.interpolate.x;
      }
    })
    this.tween = gsap.to(this.interpolate, {duration: 1, x: 1, ease: "linear"});
    this.tl.add(this.tween);
    GSDevTools.create({keyboard: false, animation: this.tl});
  },
  methods: {
    updateTween(duration) {
    //   gsap.globalTimeline.pause();
    //   gsap.globalTimeline.duration(0);
    //   gsap.globalTimeline.progress(0);
    //   gsap.globalTimeline.restart();
    //   this.tl.kill();

    // this.tl = new gsap.timeline({
    //   onUpdate: () => {
    //     this.app.components.title.material.uniforms.mixRatio.value = this.interpolate.x;
    //   }
    // })
    // this.tween = gsap.fromTo(this.interpolate, {x: 0}, {duration, x: 1, ease: "linear"});
    // this.tl.add(this.tween);
      this.tl.duration(duration);
    }
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
