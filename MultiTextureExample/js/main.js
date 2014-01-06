function main() {
  var webGl = new WebGL("webgl_canvas"),
  	verticesAndTexture = new Float32Array([
  		-0.5, 0.5, 0.0, 1.0,
  		-0.5, -0.5, 0.0, 0.0,
      0.5, 0.5, 1.0, 1.0,
      0.5, -0.5, 1.0, 0.0
  		]); 	
  	// verticesAndTexture = new Float32Array([
  	// 	-0.5, 0.5, -0.3, 1.7,
  	// 	-0.5, -0.5, -0.3, -0.2,
   //    0.5, 0.5, 1.7, 1.7,
   //    0.5, -0.5, 1.7, -0.2
  	// 	]);
    webGl.drawInterLeavingPoint(verticesAndTexture);
}
