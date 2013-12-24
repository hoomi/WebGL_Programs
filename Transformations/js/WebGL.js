function WebGL(canvasId) {
  $canvas = $("#" + canvasId ),
  that = this;
  this.canvas = $canvas[0];
  this.gl = getWebGLContext(this.canvas,DEBUG);
  if (!this.gl) {
    console.error("Could not get the WebGL context");
    return undefined;
  }
  this.gl.clearColor(0.0,0.0,0.0,1.0);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  var initVertexBuffers = function (gl,vertices, VERTEX_SHADER, FRAGMENT_SHADER) {
    var vertexBuffer = gl.createBuffer();
    if (!initShaders(gl,VERTEX_SHADER,FRAGMENT_SHADER)) {
      console.error("Could not initialize the shaders");
      return  undefined;
    }
    if (!vertexBuffer) {
      console.error("Failed to create the buffer object");
      return  -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  }

  this.drawTranslatedTriangle = function() {
    var vertices = new Float32Array([
      0.0, 0.5,
      -0.5,-0.5,
      0.5,-0.5]),
      n = 3,
      VERTEX_SHADER = "attribute vec4 pointPosition;\n" + 
                      "uniform mat4 translationMatrix;\n" +
                      "void main(){\n" +
                      "gl_Position = translationMatrix * pointPosition;\n" +
                      "}\n",
      FRAGMENT_SHADER =  "void main(){ \n" +
                    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                    "}\n", 
      a_position,
      transformation,
      tx = 0.5,
      ty = 0.5,
      tz = 0.0,
      gl = that.gl,
      transformationMatrix = new Float32Array([
        1.0,0.0,0.0,0.0,
        0.0,1.0,0.0,0.0,
        0.0,0.0,1.0,0.0,
        tx,ty,tz,1.0]);
    initVertexBuffers(that.gl, vertices, VERTEX_SHADER, FRAGMENT_SHADER);
    a_position = gl.getAttribLocation(gl.program,"pointPosition");
    transformation = gl.getUniformLocation(gl.program,"translationMatrix");
    if(a_position <  0 || transformation < 0){
      console.error("Could not get the location of the attribute");
      return -1;
    }
    if (!transformationMatrix) {
      transformationMatrix = [0.0,0.0,0.0,0.0];
    }
    gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
    gl.uniformMatrix4fv(transformation, false, transformationMatrix);
    gl.enableVertexAttribArray(a_position);
    that.gl.drawArrays(that.gl.TRIANGLES,0,n);
  }

  this.drawRotatedTriangle = function(angleDegree) {
    var vertices = new Float32Array([
      0.0, 0.5,
      -0.5,-0.5,
      0.5,-0.5]),
      n = 3,
      VERTEX_SHADER = "attribute vec4 pointPosition;\n" + 
                      "uniform mat4 u_rotationMatrix;\n" +
                      "void main(){\n" +
                      "gl_Position = u_rotationMatrix * pointPosition;\n" +
                      "}\n",
      FRAGMENT_SHADER =  "void main(){ \n" +
                    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                    "}\n", 
      a_position,
      radian = Math.PI * angleDegree / 180,
      cosb = Math.cos(radian),
      sinb = Math.sin(radian),
      gl = that.gl,
      rotationMatrix = new Float32Array([
        cosb, sinb, 0.0 , 0.0,
        -sinb, cosb, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0 
        ]),
      u_rotationMatrix;
    initVertexBuffers(gl, vertices, VERTEX_SHADER, FRAGMENT_SHADER);
    a_position = gl.getAttribLocation(gl.program,"pointPosition");
    u_rotationMatrix =  gl.getUniformLocation(gl.program,"u_rotationMatrix");
    if(a_position <  0 || u_rotationMatrix < 0){
      console.error("Could not get the location of the attribute");
      return -1;
    }
    gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
    gl.uniformMatrix4fv(u_rotationMatrix,false, rotationMatrix);
    gl.enableVertexAttribArray(a_position);
    that.gl.drawArrays(that.gl.TRIANGLES,0,n);
  }
}


