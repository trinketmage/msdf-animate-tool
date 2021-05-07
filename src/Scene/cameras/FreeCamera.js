import * as THREE from "three";

export default class GuidedCamera {
  constructor(_options) {
    this.sizes = _options.sizes;

    this.type = "free";

    this.container = new THREE.Object3D();
    this.container.rotation.order = "YXZ";
    this.container.rotation.x = 0;
    this.container.rotation.y = 0;
    this.container.rotation.z = 0;
    this.container.position.x = 0;
    this.container.position.y = 0;
    this.container.position.z = 0;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.01,
      100.0
    );
    this.container.add(this.instance);
  }

  setControls() {
    // Set up
    this.controls = {};

    this.controls.isUpDown = false;
    this.controls.isDownDown = false;
    this.controls.isLeftDown = false;
    this.controls.isRightDown = false;
    this.controls.isLeanLeftDown = false;
    this.controls.isLeanRightDown = false;
    this.controls.isShiftDown = false;
    this.controls.isCtrlDown = false;
    this.controls.isMetaDown = false;
    this.controls.callbacks = {};

    this.handleKeydownBinded = this.handleKeydown.bind(this);
    window.addEventListener("keydown", this.handleKeydownBinded, false);
    this.handleKeyupBinded = this.handleKeyup.bind(this);
    window.addEventListener("keyup", this.handleKeyupBinded, false);
  }
  render() {
    let speed = 0.001;

    if (this.controls.isShiftDown) {
      // speed = 0.05
      speed = 0.005;
    }

    // Forward
    if (this.controls.isUpDown) {
      this.container.translateZ(-speed);
    }

    // Backward
    if (this.controls.isDownDown) {
      this.container.translateZ(speed);
    }

    // Left
    if (this.controls.isLeftDown) {
      this.container.translateX(-speed);
    }

    // Right
    if (this.controls.isRightDown) {
      this.container.translateX(speed);
    }

    // Up
    if (this.controls.isLeanLeftDown) {
      this.container.translateY(-speed);
    }

    // Down
    if (this.controls.isLeanRightDown) {
      this.container.translateY(speed);
    }
  }
  handleKeyup(_event) {
    this.controls.isShiftDown = _event.shiftKey;
    this.controls.isCtrlDown = _event.ctrlKey;
    this.controls.isMetaDown = _event.metaKey;

    switch (_event.code || _event.keyCode) {
      case "KeyW":
      case 87:
        this.controls.isUpDown = false;
        break;

      case "KeyD":
      case 68:
        this.controls.isRightDown = false;
        break;

      case "KeyS":
      case 83:
        this.controls.isDownDown = false;
        break;

      case "KeyA":
      case 65:
        this.controls.isLeftDown = false;
        break;

      case "KeyQ":
      case 81:
        this.controls.isLeanLeftDown = false;
        break;

      case "KeyE":
      case 69:
        this.controls.isLeanRightDown = false;
        break;
    }
    // console.log(this.container.position);
  }
  handleKeydown(_event) {
    this.controls.isShiftDown = _event.shiftKey;
    this.controls.isCtrlDown = _event.ctrlKey;
    this.controls.isMetaDown = _event.metaKey;
    switch (_event.code || _event.keyCode) {
      case "KeyW":
      case 87:
        this.controls.isUpDown = true;
        break;

      case "KeyD":
      case 68:
        this.controls.isRightDown = true;
        break;

      case "KeyS":
      case 83:
        this.controls.isDownDown = true;
        break;

      case "KeyA":
      case 65:
        this.controls.isLeftDown = true;
        break;

      case "KeyQ":
      case 81:
        this.controls.isLeanLeftDown = true;
        break;

      case "KeyE":
      case 69:
        this.controls.isLeanRightDown = true;
        break;
    }
  }
  dispose() {
    window.removeEventListener("keydown", this.handleKeydownBinded);
    window.removeEventListener("keyup", this.handleKeyupBinded);
  }
}
