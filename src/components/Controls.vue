<template>
  <div class="controls">
    <input type="text" v-model="text" />
    <div class="size">
      <span class="label">{{fontSize}}px</span>
      <input type="range" min="8" max="360" class="slider" v-model="fontSize">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  data() {
    return {
      text: "ºERVIEW",
      fontSize: 270
    }
  },
  watch: {
    text(newVal) {
      this.$parent.app.components.title.updateCaption(newVal);
    },
    fontSize(newVal) {
      this.$parent.app.components.title.updateSize(newVal);
    }
  }
}
</script>

<style scoped lang="scss">
.controls {
  position: absolute;
  top: 0;
  left: 0;
  padding: 2em;
  display: flex;
  box-sizing: border-box;
  width: 100%;
}
input[type="text"] {
  padding: 1em;
  flex: auto;
  display: block;
  border-radius: 48px;
  border: 1px solid #dadce0;
  background-color: none;
  outline: none;
  margin-right: 24px;
}
.size {
  flex-shrink: 0;
  width: 400px;
  display: flex;
  align-items: center;
  .label {
    margin-right: 16px;
  }
  input[type="range"] {
    width: 100%;
  }
}
</style>
