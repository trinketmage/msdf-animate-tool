<template>
  <div class="timeline">
    <div class="fieldset">
      <label for="duration">Duration</label
      ><input type="number" id="duration" min="0" step="0.1" v-model="duration" />
    </div>
    <div class="fieldset">
      <label for="stagger">Stagger</label
      ><input type="number" id="stagger" min="0" step="0.01" v-model="stagger" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
      duration: 1,
      stagger: 0,
    };
  },
  watch: {
    duration() {
      this.updateTimeline();
    },
    stagger() {
      this.updateTimeline();
    }
  },
  methods: {
    updateTimeline() {
      const extent = parseFloat(this.duration) + parseFloat(this.stagger) * this.$parent.app.components.title.total;
      this.$parent.updateTween(extent);
      this.$parent.app.components.title.material.uniforms.stagger.value = this.stagger;
      this.$parent.app.components.title.material.uniforms.duration.value = this.duration;
    }
  }
};
</script>

<style scoped lang="scss">
.timeline {
  position: absolute;
  right: 0;
  top: 100vh;
  transform: translateY(-100%);
  margin-top: #{-51px - 64};
  right: 60px;
}
</style>
