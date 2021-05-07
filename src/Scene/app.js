import {
  Vector2,
  WebGL1Renderer as WebGLRenderer,
  Scene
} from "three";

import Device from "@/pure/Device";
import Camera from "./cameras/FreeCamera";

import gsap from "gsap";
import { getFovHeigth } from "@trinketmage/sword";

import settings from "./settings";

var mouse = new Vector2();

import Glyph from "@/Scene/Glyph/index.js";

export default class MainScene {
  constructor({ $el }) {
    settings.app = this;
    settings.mouse = new Vector2(0, 0);

    settings.sizes = {
      scrollY: document.documentElement.scrollTop || document.body.scrollTop,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      frustum: {
        height: 0,
        width: 0
      }
    };
    this.components = {};

    var canvas = $el;

    this.targetMouse = new Vector2(0, 0);

    this.renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: false,
      stencil: false,
      depth: true,
      powerPreference: "high-performance",
      antialias: false
    });

    this.renderer.physicallyCorrectLights = true;
    // this.renderer.outputEncoding = sRGBEncoding;
    // this.renderer.toneMapping = ReinhardToneMapping;

    this.renderer.setPixelRatio(Device.pixelRatio);

    this.renderer.autoClear = false;

    this.scene = new Scene();
    // this.scene.background = new Color(0x000000);
    this.scene.background = settings.background.color;
    // this.scene.background = new Color(0x15304d).convertSRGBToLinear();

    this.cameras = [new Camera({ sizes: settings.sizes })];
    this.camera = this.cameras[0].instance;
    this.camera.position.copy(settings.camera.initFrame.position.clone());

    // this.camera.position.copy(settings.camera.frames[0].position.clone());
    // this.camera.rotation.copy(settings.camera.frames[0].rotation.clone());

    this.scene.add(this.cameras[0].container);

    this.x = this.handleResize.bind(this);
    window.addEventListener("resize", this.x, false);
    window.addEventListener("mousemove", this.y, false);

    settings.scene = this;
    this.handleResize();
    this.init();

    gsap.ticker.add(this.render.bind(this));
  }
  enableLayer(idx) {
    this.camera.layers.enable(idx);
  }
  disableLayer(idx) {
    this.camera.layers.disable(idx);
  }
  init() {
    this.components.title = new Glyph({
      scene: this.scene,
      caption: "ºERVIEW",
      fontSize: 270
    });
  }
  handleMousemove(e) {
    e.preventDefault();
    settings.mouse.x = (e.clientX / settings.sizes.viewport.width) * 2 - 1;
    settings.mouse.y = -(e.clientY / settings.sizes.viewport.height) * 2 + 1;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this.targetMouse.x = 0.05 * settings.mouse.x;
    this.targetMouse.y = 0.005 * settings.mouse.y;
    this.renderer.hasMoved = true;
  }
  render(t) {
    Object.keys(this.components).forEach(_ => {
      this.components[_].render(t, this.sizes);
    });
    this.renderer.render(this.scene, this.camera);
    if (this.stats) this.stats.update();
  }
  handleResize() {
    settings.sizes.viewport.width = this.renderer.domElement.parentElement.offsetWidth;
    settings.sizes.viewport.height = window.innerHeight;
    settings.sizes.viewport.halfWidth = settings.sizes.viewport.width * 0.5;
    settings.sizes.viewport.halfHeight = settings.sizes.viewport.height * 0.5;
    this.camera.aspect =
      settings.sizes.viewport.width / settings.sizes.viewport.height;
    this.camera.updateProjectionMatrix();
    settings.sizes.frustum.height = getFovHeigth(
      this.camera,
      this.camera.position.z
    );
    settings.sizes.frustum.width =
      settings.sizes.frustum.height * this.camera.aspect;
    const scaleTexel = Math.min(1.0, window.innerWidth / 1920);
    settings.sizes.absoluteTexel =
      settings.sizes.frustum.width / settings.sizes.viewport.width;
    settings.sizes.texel = settings.sizes.absoluteTexel * scaleTexel;
    this.renderer.setSize(
      settings.sizes.viewport.width,
      settings.sizes.viewport.height
    );
    Object.keys(this.components).forEach(_ => {
      this.components[_].handleResize(settings.sizes);
    });
  }
  destroy() {
    window.removeEventListener("mousemove", this.y);
    this.renderer.dispose();
    this.postprocessing.dispose();
    if (this.cameras[0]) this.cameras[0].dispose();
  }
  setDebug() {}
}
