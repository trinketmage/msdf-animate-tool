attribute float indices;
attribute vec2 auv;
attribute vec2 guv;
attribute vec2 uv;
attribute vec4 position;
uniform float opacity;
uniform float total;
uniform float stagger;
uniform float fontSize;
uniform vec2 translate;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
varying float mixf;
varying vec2 vAuv;
varying vec2 vGuv;
varying vec2 vUv;

float exponentialOut(float t) {
  return t * t;
}

void main() {
  float vIdx = indices;
  vAuv = auv;
  vGuv = guv;
  vUv = uv;

  float threshold = stagger * total;

  float transitionTexel = (vIdx / total);
  float r = opacity * (1.5 + threshold);

	mixf = 1.0 - smoothstep(transitionTexel * threshold, 1.0 + threshold * transitionTexel, r);
  
  // position.y += 0.001;
  vec4 posAr = position;
  
  posAr.xy = posAr.xy + translate;
  posAr.y += mixf * fontSize;
  vec4 pos =  projectionMatrix * modelViewMatrix * posAr;
  // float expo = exponentialOut(mixf);
  // pos.x += expo * 0.1 * 6.0;
  gl_Position = pos;
}
