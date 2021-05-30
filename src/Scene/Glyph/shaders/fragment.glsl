#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float opacity;
uniform float vAlpha;
uniform float mixRatio;
uniform vec3 color;
uniform sampler2D map;
uniform sampler2D alphaMap;

varying float lerp;
varying vec2 vAuv;
varying vec2 vGuv;
// varying vec2 vUv;

float threshold = 0.1;
float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

void main() {
  vec2 fontUv = vGuv;
  
  vec3 s = texture2D(map, fontUv).rgb;
  float sigDist = median(s.r, s.g, s.b) - 0.5;
  float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);
  
  vec3 mask = texture2D(map, vAuv).rgb;
  float r = (1.0 - lerp) * (1.0 + threshold * 2.0) - threshold;
  float mixf=clamp(((1.0 - mask.r) - r)*(1.0/threshold), 0.0, 1.0);

  gl_FragColor = vec4(color.rgb, smoothstep(0.0, 0.1, mixf) * alpha);
  if (gl_FragColor.a < 0.0001) discard;
}