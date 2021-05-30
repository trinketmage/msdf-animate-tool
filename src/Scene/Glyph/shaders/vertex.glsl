attribute float indices;
attribute vec2 auv;
attribute vec2 guv;
attribute vec2 uv;
attribute vec4 position;
uniform float mixRatio;
uniform float total;
uniform float duration;
uniform float stagger;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float lerp;
varying vec2 vAuv;
varying vec2 vGuv;
// varying vec2 vUv;

void main() {
  float vIdx = indices;
  vAuv = auv;
  vGuv = guv;
  // vUv = uv;

  float threshold = stagger * total;

  float transitionTexel = (vIdx / total);



  float staggers = (total * stagger);
  float maxDuration = duration + staggers;

  float space = duration / maxDuration;
  // float relStagger = stagger / extent;

  float offset = (vIdx * stagger) / maxDuration;

	lerp = smoothstep(offset, offset + space, mixRatio);
	// lerp = smoothstep(0.0, 1.0, mixRatio);
  
  gl_Position = projectionMatrix * modelViewMatrix * position;
}
