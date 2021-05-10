<template>
  <div class="glyphs">
    <div
      :key="glyph"
      v-for="glyph in glyphs"
      class="glyph"
      @click="() => handleClick(glyph)"
    >
      {{glyph}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Glyphs",
  data() {
    return {
      glyphs: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789º"
    }
  },
  methods: {
    handleClick(glyph) {
      this.$root.text += glyph;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.glyphs {
  padding: 64px 60px #{64px + 51};
}
.glyph {
  display: inline-flex;
  border: 1px solid #dadce0;
  height: 41px;
  width: 44px;
  align-items: center;
  justify-content: center;
  margin-left: -1px;
  margin-top: -1px;
  cursor: pointer;
  &:hover {
    background: rgba(32,33,36,.04);
  }
}
</style>
