uniform vec3 baseColor;
uniform vec3 lightColor;
uniform vec3 shadowColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Fixed light direction

  float dotProduct = dot(normal, lightDir);
  float intensity = step(0.5, dotProduct * 0.5 + 0.5); // Toon ramp (binary lit/unlit)

  vec3 litColor = mix(shadowColor, baseColor, intensity);
  gl_FragColor = vec4(litColor, 1.0);
}
