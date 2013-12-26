
function Triangle(gl) {
    var that = this,
        vertexBuffer = gl.createBuffer(),
        vertices =  new Float32Array([
            0.0, 0.5,
            -0.5,-0.5,
            0.5,-0.5]);
    this.n = 3;
    this.gl = gl;
    this.currentAngle = 0;
    this.transforamtionMatrix  = new Matrix4();
    this.transforamtionMatrix.setTranslate(0.0,0.0,0.0);
    if (!vertexBuffer) {
      console.error("Failed to create the buffer object");
      return  undefined;
    }
    if (!initShaders(gl,this.VERTEX_SHADER,this.FRAGMENT_SHADER)) {
      console.error("Could not initialize the shaders");
      return  undefined;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    this.v_transformationMatrix = gl.getUniformLocation(gl.program,"v_transformationMatrix");
    this.pointPosition = gl.getAttribLocation(gl.program,"pointPosition");
    if ( this.pointPosition * this.v_transformationMatrix < 0) {
        console.error("Could not find the GLSL variables");
        return undefined;
    }
}

Triangle.prototype.FRAGMENT_SHADER = "void main(){ \n" +
                    "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                    "}\n";

Triangle.prototype.VERTEX_SHADER = "attribute vec4 pointPosition;\n" + 
                      "uniform mat4 v_transformationMatrix;\n" +
                      "void main(){\n" +
                      "gl_Position = v_transformationMatrix * pointPosition;\n" +
                      "}\n";

Triangle.prototype.draw = function() {
    var gl = this.gl;
    gl.vertexAttribPointer(this.pointPosition,2,gl.FLOAT,false,0,0);
    gl.uniformMatrix4fv(this.v_transformationMatrix, false ,this.transforamtionMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enableVertexAttribArray(this.pointPosition);
    gl.drawArrays(gl.TRIANGLES,0,this.n);
};

Triangle.prototype.rotate = function (angleDegree,x,y,z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;
    angleDegree = angleDegree || 0;
    this.transforamtionMatrix.rotate(angleDegree,x,y,z);
    this.currentAngle = angleDegree;
    this.draw();
};

Triangle.prototype.setTranformationMatrix = function (newTransformationMatrix) {
    if (newTransformationMatrix && newTransformationMatrix instanceof Matrix4) {
        this.transforamtionMatrix = newTransformationMatrix 
    }
};