<template>
  <div class="timeline">
    <div class="fieldset">
      <label for="duration">Duration</label
      ><input type="number" id="duration" min="0" step="0.1" v-model="$root.duration" />
    </div>
    <div class="fieldset">
      <label for="stagger">Stagger</label
      ><input type="number" id="stagger" min="0" step="0.01" v-model="$root.stagger" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  watch: {
    '$root.duration'() {
      this.$parent.updateTween();
    },
    '$root.stagger'() {
      this.$parent.updateTween();
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
