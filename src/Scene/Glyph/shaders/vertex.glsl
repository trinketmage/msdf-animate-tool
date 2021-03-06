attribute float index;
attribute float weight;
attribute vec2 auv;
attribute vec2 guv;
attribute vec2 uv;
attribute vec4 position;
uniform float mixRatio;
uniform float total;
uniform float duration;
uniform float direction;
uniform float stagger;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float lerp;
varying vec2 vAuv;
varying vec2 vGuv;
// varying vec2 vUv;

void main() {
  float vIdx = index;
  vAuv = auv;
  vGuv = guv;
  // vUv = uv;

  float staggers = (total * stagger);
  float totalDuration = duration + weight * stagger;
  
  float maxDuration = totalDuration + staggers;
  float space = totalDuration / maxDuration;

  float offset = (mix(vIdx, (total - vIdx), direction) * stagger) / maxDuration;

	lerp = smoothstep(offset, offset + space, mixRatio);
  
  gl_Position = projectionMatrix * modelViewMatrix * position;
}
