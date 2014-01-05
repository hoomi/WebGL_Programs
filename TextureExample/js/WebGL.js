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

WebGL.prototype.initInterleavingBuffers = function (vertices, VERTEX_SHADER, FRAGMENT_SHADER) {
  'use strict';
  var vertexBuffers = this.gl.createBuffer(),
  pointPosition,
  textureCoords,
  FSIZE = vertices.BYTES_PER_ELEMENT;
  if (!vertexBuffers) {
    console.error("Failed to create the buffer vertexBuffers");
    return  -1;
  }
  if (!initShaders(this.gl, VERTEX_SHADER, FRAGMENT_SHADER)) {
    console.error("Could not initialize the shaders");
    return  -1;
  }

  // They have to be in this order.
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffers);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
  pointPosition = this.gl.getAttribLocation(this.gl.program,"pointPosition");
  if (pointPosition < 0) {
    console.error("Could not find the attribute pointPosition");
    return -1;
  }
  this.gl.vertexAttribPointer(pointPosition,2,this.gl.FLOAT,false,FSIZE * 4,0);
  this.gl.enableVertexAttribArray(pointPosition);

  textureCoords = this.gl.getAttribLocation(this.gl.program,"textureCoords");
  if (textureCoords < 0) {
    console.error("Could not find the attribute textureCoords");
    return -1;
  }
  this.gl.vertexAttribPointer(textureCoords,2,this.gl.FLOAT,false,FSIZE * 4,FSIZE * 2);
  this.gl.enableVertexAttribArray(textureCoords);
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  return 4;
}

WebGL.prototype.initTexture = function(n) {
  var texture =  this.gl.createTexture(),
  u_Sampler = this.gl.getUniformLocation(this.gl.program,"u_Sampler"),
  image = new Image(),
  that = this,
  loadTexture = function(n, texture, sampler,image) {
    that.gl.pixelStorei(that.gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    // Enable the texture unit 0
    that.gl.activeTexture(that.gl.TEXTURE0);
    // Bind the texture object to the target
    that.gl.bindTexture(that.gl.TEXTURE_2D, texture);
    // Set the texture parameters
    that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_MIN_FILTER, that.gl.LINEAR);
    // Set the texture image
    that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGB, that.gl.RGB, that.gl.UNSIGNED_BYTE, image);

   // Set the texture unit 0 to the sampler
   that.gl.uniform1i(u_Sampler, 0);

   that.gl.clear(that.gl.COLOR_BUFFER_BIT);

   that.gl.drawArrays(that.gl.TRIANGLE_STRIP, 0, n); // Draw a rectangle
  };
  if (!texture) {
    console.error("Could not create a texture");
    return -1;
  }

  if (u_Sampler < 0) {
    console.error("Could not find the attribute u_Sampler");
    return -1;
  }
  image.onload = function() {loadTexture(n,texture,u_Sampler,image);};
  // The image needs to have the sizes with width and height power-2
  image.src = "images/ball.png";
}

WebGL.prototype.drawInterLeavingPoint = function(vertices) {
  'use strict';
  var n,
  VERTEX_SHADER = "attribute vec4 pointPosition;\n" +
  "attribute vec2 textureCoords;\n" +
  "varying vec2 v_TextureCoords;\n" +
  "void main () {\n" +
  "gl_Position = pointPosition;\n" +
  "v_TextureCoords = textureCoords;\n"+
  "}\n",
  FRAGMENT_SHADER = "#ifdef GL_ES\n" +
  "precision mediump float;\n"+ 
  "#endif\n"+ 
  "uniform sampler2D u_Sampler;\n" +
  "varying vec2 v_TextureCoords;\n" +
  "void main() {\n" +
  "gl_FragColor = texture2D(u_Sampler, v_TextureCoords);\n" +
  "}\n";


  n = this.initInterleavingBuffers(vertices,VERTEX_SHADER,FRAGMENT_SHADER);
  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.initTexture(n);
  // this.gl.drawArrays(this.gl.POINTS,0,3);
}