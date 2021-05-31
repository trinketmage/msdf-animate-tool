import {
  Vector2,
  Mesh,
  Object3D,
  Uniform,
  Color,
  RawShaderMaterial,
} from "three";

import gsap from "gsap";

import vertexShader from "@/Scene/Glyph/shaders/vertex.glsl";
import fragmentShader from "@/Scene/Glyph/shaders/fragment.glsl";
import createGeometry from "./glFont";

import regular from "@/assets/fonts/Love.json";
import animate from "@/assets/fonts/Love-animate.json";

// import Device from "@/pure/De
import settings from "@/Scene/settings";

const fonts = {
  regular,
  animate
};

import assets from "@/Scene/Assets";

const textures = assets.fonts;

export default class Glyph {
  constructor({
    scene,
    caption = "BUTTON",
    weight = "regular",
    fontSize = 270,
    align = "center",
    verticalAlign = "middle",
    lineHeight = 0.873,
    letterSpacing = -0.03,
    width = undefined,
    position = new Vector2(0.0, 0.0),
    offset = new Vector2(0.0, 0.0),
    color = 0x000000,
    mobile = null,
    animationType = "default"
  }) {
    // this.material = material;
    this.scene = scene;
    this.fontSize = fontSize;
    this.caption = caption;
    this.align = align;
    this.verticalAlign = verticalAlign;
    this.position = position;
    this.offset = offset;
    this.width = width;

    this.mobile = mobile;

    this.animationType = animationType;

    this.font = fonts[weight];

    this.geometry = new createGeometry({
      text: caption,
      font: fonts.regular,
      animate: fonts.animate,
      align,
      width,
      flipY: 0,
      letterSpacing: this.font.info.size * letterSpacing,
      lineHeight: this.font.info.size * lineHeight,
      animationType
    });

    // this.scale = 0.002125;
    this.scale = 1.0;
    this.total = this.geometry.total;

    this.interpolate = {
      x: 0
    };

    this.mdsf = {
      transparent: true,
      uniforms: {
        opacity: new Uniform(1.0),
        time: new Uniform(0.0),
        stagger: new Uniform(0.15),
        direction: new Uniform(0.0),
        duration: new Uniform(1.5),
        map: new Uniform(textures[weight]),
        color: { type: "c", value: new Color(color) },
        resolution: { type: "c", value: new Vector2(0, 0) },
        mixRatio: new Uniform(1),
        total: new Uniform(this.total)
      },
      vertexShader,
      fragmentShader,
      depthTest: false
    };
    this.material = new RawShaderMaterial(this.mdsf);

    this.layout = this.geometry.layout;
    this.text = new Mesh(this.geometry, this.material);
    this.text.renderOrder = 3;
    // this.text.geometry.computeBoundingBox();

    this.text.matrixAutoUpdate = false;
    this.group = new Object3D();
    this.group.matrixAutoUpdate = false;
    this.textAnchor = new Object3D();
    this.textAnchor.matrixAutoUpdate = false;

    this.textAnchor.add(this.text);

    this.group.add(this.textAnchor);
    this.scene.add(this.group);
  }
  updateCaption(text) {
    this.caption = text;
    this.geometry.update({
      text
    });
    this.total = this.geometry.total;
    this.material.uniforms.total.value = this.total;
    this.handleResize(settings.sizes);
    
  }
  updateSize(fontSize) {
    this.fontSize = fontSize;
    this.handleResize(settings.sizes);
  }
  enter() {
    const { interpolate } = this;
    interpolate.x = this.material.uniforms.opacity.value;
    return gsap.to(interpolate, {
      overwrite: "auto",
      x: 1.0,
      duration: 1.0 + this.total * 0.0125,
      ease: "sine.inOut",
      onUpdate: () => {
        this.material.uniforms.opacity.value = interpolate.x;
      }
    });
  }
  leave(duration) {
    const { interpolate } = this;
    interpolate.x = this.material.uniforms.opacity.value;
    return gsap.to(interpolate, {
      overwrite: "auto",
      x: 0.0,
      duration: duration || 1.0 + this.total * (0.0125 / this.total),
      ease: "sine.in",
      onUpdate: () => {
        this.material.uniforms.opacity.value = interpolate.x;
      }
    });
  }
  render(t) {
    this.material.uniforms.time.value = t;
    // this.material.uniforms.mouse.value = pos;
    // this.text.rotation.y = 12;
    // console.log(this.text.rotation);
  }
  handleResize(sizes) {
    let texel = sizes.texel;
    const absoluteTexel = sizes.absoluteTexel;
    this.scale = (texel / this.font.info.size) * this.fontSize;

    const attrs = {};
    let { position, offset, align } = this;

    if (sizes.viewport.width < 768 && this.mobile) {
      const fontSize = this.mobile?.fontSize || this.fontSize;
      this.scale = (absoluteTexel / this.font.info.size) * fontSize;
      if (this.mobile.caption && this.geometry.text !== this.mobile.caption) {
        attrs.text = this.mobile.caption;
      }
      if (
        this.mobile.width &&
        this.geometry.layout.width !== this.mobile.width
      ) {
        attrs.width = this.mobile.width;
      }
      if ("offset" in this.mobile) {
        offset = this.mobile.offset;
      }
      if ("position" in this.mobile) {
        position = this.mobile.position;
      }
      if ("align" in this.mobile) {
        align = this.mobile.align;
        attrs.align = this.mobile.align;
        // this.geometry.update({
        //   align: this.mobile.align
        // });
      }
      this.geometry.update(attrs);
      texel = absoluteTexel;
      // this.geometry.update({
      //   width: undefined
      // });
      // console.log(this.geometry.layout._opt.width);
      // }
      // console.log(this.geometry);
    } else {
      if (this.geometry.text !== this.caption) {
        this.geometry.update({
          text: this.caption,
          // align: this.align
        });
        if (this.width && this.geometry.layout.width !== this.width) {
          this.geometry.update({
            width: this.width
          });
        }
      }
    }

    this.text.geometry.computeBoundingBox();

    this.text.scale.x = this.scale;
    this.text.scale.y = this.scale;
    this.text.rotation.x = Math.PI;
    this.text.updateMatrix();

    // const margin = texel * 80;
    if (align === "center") {
      this.group.position.x =
        (-this.text.geometry.boundingBox.max.x +
          this.text.geometry.boundingBox.min.x) *
        0.5 *
        this.scale;
    } else if (align === "left") {
      this.group.position.x = 0;
    } else if (align === "right") {
      this.group.position.x =
        (-this.text.geometry.boundingBox.max.x +
          this.text.geometry.boundingBox.min.x) *
        this.scale;
    }

    if (this.verticalAlign === "bottom") {
      this.group.position.y =
        (-this.text.geometry.boundingBox.max.y +
          this.text.geometry.boundingBox.min.y) *
        this.scale;
    } else if (this.verticalAlign === "top") {
      this.group.position.y = 0;
    } else {
      this.group.position.y =
        (-this.text.geometry.boundingBox.max.y +
          this.text.geometry.boundingBox.min.y) *
        0.5 *
        this.scale;
    }
    this.group.position.x +=
      offset.x * texel + position.x * sizes.frustum.width;
    this.group.position.y +=
      offset.y * texel + position.y * sizes.frustum.height;
    this.group.updateMatrix();
  }
  dispose() {
    this.scene.remove(this.group);
    this.geometry.dispose();
    this.material.dispose();
  }
}
