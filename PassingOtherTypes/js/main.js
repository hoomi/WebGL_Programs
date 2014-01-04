function main() {
  var webGl = new WebGL("webgl_canvas"),
  	vertices =  new Float32Array([
  		0.0, 0.5,
  		0.5, 0.5,
  		0.5, -0.5
  		]),
  	pointSizes = new Float32Array([
  		5.0, 10.0, 20.0
  		]);
  webGl.drawPoint(vertices,pointSizes);
}
