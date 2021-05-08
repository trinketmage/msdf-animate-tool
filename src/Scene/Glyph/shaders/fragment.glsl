#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform float opacity;
uniform float vAlpha;
uniform vec3 color;
uniform sampler2D map;
uniform sampler2D alphaMap;
varying float mixf;
varying vec2 vAuv;
varying vec2 vGuv;
varying vec2 vUv;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

void main() {
  vec2 fontUv = vGuv;
  
  vec3 s = texture2D(map, fontUv).rgb;
  float sigDist = median(s.r, s.g, s.b) - 0.5;
  float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);
  

  vec3 mask = texture2D(map, vAuv).rgb;
  float sigDist2 = median(mask.r, mask.g, mask.b) - 0.25;
  float transitionTexel = clamp(sigDist2/fwidth(sigDist2) + 0.5, 0.0, 1.0);
  // vec4 transitionTexel = texture2D( alphaMap, vUv );
  // float r = mixf * (1.0 + threshold * 2.0) - threshold;

	float mixff = mixf * transitionTexel;


  gl_FragColor = vec4(color.rgb, alpha * (1.0 - step(vUv.y, mixff)) * vAlpha);
  if (gl_FragColor.a < 0.0001) discard;
}