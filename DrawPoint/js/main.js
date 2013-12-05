function WebGL(canvasId) {
  var VERTEX_SHADER = "attribute vec4 point_position;\n" +
                    "attribute float point_size;\n" +
                    "void main() {\n" +
                    "gl_Position = point_position;\n" + 
                    "gl_PointSize = point_size;\n" +
                    "}",
    FRAGMENT_SHADER = "void main() {\n" + 
                      "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                      "}",
    $canvas = $("#" + canvasId),
    that = this,
    canvasClick = function(event) {
      event.preventDefault();
      var x = event.clientX,
          y = event.clientY,
          rect = event.target.getBoundingClientRect();
      x = ((x - rect.left) - that.canvas.width / 2) / (that.canvas.width / 2);
      y = (that.canvas.height/ 2 - ( y - rect.top)) / (that.canvas.height / 2);
      that.draw(x,y);
    };
  this.canvas = $canvas[0];
  this.gl = getWebGLContext(this.canvas,DEBUG);
  this.pointPosition = -1;
  this.pointSize = -1;
  if (!this.gl) {
    console.error("Could not get the WebGL context");
    return undefined;
  }
  if (!initShaders(this.gl,VERTEX_SHADER,FRAGMENT_SHADER)) {
    console.error("Could not initialize the shaders");
    return  undefined;
  }
  try {
    this.pointPosition = this.gl.getAttribLocation(this.gl.program,"point_position");
    this.pointSize = this.gl.getAttribLocation(this.gl.program,"point_size");
  } catch (e) {
    console.error("Exception occured when tryng to get the attributes from GLSL");
    return undefined;
  }

  if (this.pointPosition < 0 || this.pointSize < 0 ) {
    console.error("Wrong attribute was returned");
    return undefined;
  }
  $canvas.mousedown(canvasClick);
  $canvas.mousemove(canvasClick);
  this.gl.clearColor(0.0,0.0,0.0,1.0);
  this.draw = function(x, y) {
    that.gl.clear(this.gl.COLOR_BUFFER_BIT);
    that.gl.vertexAttrib3f(that.pointPosition,x,y,0.0);
    that.gl.vertexAttrib1f(that.pointSize,20.0);
    that.gl.drawArrays(that.gl.POINTS,0,1);
  }
}

function main() {
  var webGL = new WebGL("webgl_canvas");
  webGL.draw(0.0,0.0);
}
