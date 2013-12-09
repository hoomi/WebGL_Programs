function WebGL(canvasId) {
  var VERTEX_SHADER = "attribute vec4 pointPosition;\n" +
                      //"attribute float pointSize;\n" + 
                      "void main(){\n" +
                      "gl_Position = pointPosition;\n" +
                      "gl_PointSize = 10.0;\n" +
                      "}\n",
  //FRAGMENT_SHADER = "precision mediump float;\n" +
                   // "uniform vec4 pointColor;\n" +
  FRAGMENT_SHADER =  "void main(){ \n" +
                    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                    "}\n"; 
  $canvas = $("#" + canvasId ),
  that = this;
  this.canvas = $canvas[0];
  this.gl = getWebGLContext(this.canvas,DEBUG);
  if (!this.gl) {
    console.error("Could not get the WebGL context");
    return undefined;
  }
  if (!initShaders(this.gl,VERTEX_SHADER,FRAGMENT_SHADER)) {
    console.error("Could not initialize the shaders");
    return  undefined;
  }
  this.gl.clearColor(0.0,0.0,0.0,1.0);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  var initVertexBuffers = function (gl) {
    var vertices = new Float32Array([
        0.0, 0.5,
        -0.5,-0.5,
        0.5,-0.5]),
        n = 3,
        a_position,
        vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.error("Failed to create the buffer object");
      return  -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    a_position = gl.getAttribLocation(gl.program,"pointPosition");
    if(a_position <  0){
      console.error("Could not get the location of the attribute");
      return -1;
    }
    gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_position);
    
    return n;
  }
  var n = initVertexBuffers(this.gl);
  if (n<0) {
    console.log("Failed to create buffers");
    return -1;
  }
  
  this.gl.drawArrays(this.gl.POINTS,0,n);
}
