function main() {
  var webGl = new WebGL("webgl_canvas"),
  	verticesAndTexture = new Float32Array([
  		-0.5, 0.5, 0.0, 1.0,
  		-0.5, -0.5, 0.0, 0.0,
      0.5, 0.5, 1.0, 1.0,
      0.5, -0.5, 1.0, 0.0
  		]);
    webGl.drawInterLeavingPoint(verticesAndTexture);
}