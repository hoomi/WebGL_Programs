function WebGL(canvasId) {
  'use strict';
  var $canvas = $("#" + canvasId),
    canvas = $canvas[0];
  this.gl = getWebGLContext(canvas, DEBUG);
  if (!this.gl) {
    console.error("Could not get the WebGL context");
    return undefined;
  }
}

WebGL.prototype.initVertexBuffers = function (vertices, pointSizes, VERTEX_SHADER, FRAGMENT_SHADER) {
  'use strict';
  var vertexBuffer = this.gl.createBuffer(),
    sizeBuffer = this.gl.createBuffer(),
    pointPosition,
    pointSize;
  if (!initShaders(this.gl, VERTEX_SHADER, FRAGMENT_SHADER)) {
    console.error("Could not initialize the shaders");
    return  -1;
  }
  if (!vertexBuffer || !sizeBuffer) {
    console.error("Failed to create the buffer object");
    return  -1;
  }
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
  pointPosition = this.gl.getAttribLocation(this.gl.program,"pointPosition");
  if (pointPosition < 0) {
    console.error("Could not find the attribute pointPosition");
    return;
  }
  this.gl.vertexAttribPointer(pointPosition,2,this.gl.FLOAT,false,0,0);
  this.gl.enableVertexAttribArray(pointPosition);

  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, sizeBuffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, pointSizes, this.gl.STATIC_DRAW);
  pointSize = this.gl.getAttribLocation(this.gl.program, "pointSize");
  if (pointSize < 0) {
    console.error("Could not find the attribute pointSize");
    return;
  }
  this.gl.vertexAttribPointer(pointSize,1,this.gl.FLOAT,false,0,0);
  this.gl.enableVertexAttribArray(pointSize);
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
}

WebGL.prototype.drawPoint = function(vertices, pointSizes) {
  'use strict';
  var VERTEX_SHADER = "attribute vec4 pointPosition;\n" +
  "attribute float pointSize;\n" +
  "void main () {\n" +
  "gl_Position = pointPosition;\n" +
  "gl_PointSize = pointSize;\n"+
  "}\n",
  FRAGMENT_SHADER = "void main() {\n" +
  "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
  "}\n";
 
  this.initVertexBuffers(vertices,pointSizes,VERTEX_SHADER,FRAGMENT_SHADER);
  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  this.gl.drawArrays(this.gl.POINTS,0,3);
}