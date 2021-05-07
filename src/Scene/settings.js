import { Vector3, Color } from "three";

export default {
  camera: {
    position: {
      x: 0,
      y: 1.838,
      z: 1.152
    },
    rotation: new Vector3(0, 0, 0),
    initFrame: {
      position: new Vector3(0, 0, 30),
      // rotation: new Vector3(0, -0.464, 0),
      light: new Vector3(0, 1.838, 1.152)
    }
  },
  background: {
    color: new Color(0xfffdf9)
  },
};
