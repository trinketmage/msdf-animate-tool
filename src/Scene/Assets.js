import {
  TextureLoader,
} from "three";

export const loader = new TextureLoader();

const assets = {
  fonts: {
    regular: loader.load("/assets/fonts/Love2.png")
  }
};

export default assets;
