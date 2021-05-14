<template>
  <div class="glyphs">
    <div
      :key="glyph"
      v-for="glyph in words"
      class="glyph"
      @click="() => handleClick(glyph, true)"
    >
      {{glyph}}
    </div>
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
      glyphs: "ACDEGHIKLNOPRSTUVWXÉºȐ",
      words: [
        "PRÉSENTATION",
        "INTERPRÉTATION",
        "LA SENSATION",
        "INGRÉDIENTS",
        "PRÉPARATION",
        "COCKTAIL",
        "OVERVIEW",
        "INTERPRETATION",
        "THE SENSATION",
        "INGREDIENTS",
        "PREPARATION",
        "RECIPE",
        "NEXT",
        "SUIVANT"
      ]
    }
  },
  methods: {
    handleClick(glyph, clean = false) {
      if (clean) {
        this.$root.text = glyph;
      } else {
        this.$root.text += glyph;
      }
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
  min-width: 44px;
  align-items: center;
  justify-content: center;
  margin-left: -1px;
  margin-top: -1px;
  padding-left: 0.5em;
  padding-right: 0.5em;
  cursor: pointer;
  &:hover {
    background: rgba(32,33,36,.04);
  }
}
</style>
