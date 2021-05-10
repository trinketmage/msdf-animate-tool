<template>
  <div class="file-upload">
    <input type=file name=filename id=file @change="fileSelected">
  </div>
</template>

<script>
// import {TextureLoader} from "three";
// import assets from "@/Scene/Assets";
export default {
  name: "FileUpload",
  data() {
    return {
      selectedFile: null
    }
  },
  methods: { 
    fileSelected(e) {
      this.selectedFile = e.target.files[0];
      var reader  = new FileReader();
      reader.onload = (e) => {
        var image = document.createElement("img");
        image.src = e.target.result;
        this.$parent.app.components.title.material.uniforms.map.value.image = image;
        this.$parent.app.components.title.material.uniforms.map.value.needsUpdate = true;
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
</script>

<style scoped lang="scss">
.file-upload {
  position: absolute;
  left: 0;
  top: 100vh;
  transform: translateY(-100%);
  margin-top: #{-51px - 64};
  margin-left: 60px;
}
img {
  width: 200px;
  height: auto;
  display: block;
}
</style>
