var VERTEX_SHADER = "attribute vec4 point_position;\n" +
                    "attribute float point_size;\n" +
                    "void main() {\n" +
                    "gl_Position = point_position;\n" + 
                    "gl_PointSize = point_size;\n" +
                    "}",
    FRAGMENT_SHADER = "void main() {\n" + 
                      "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                      "}";
function main() {
  console.debug("main function");
  var canvas,
      webGLContext,
      pointPosition,
      pointSize;
  canvas = $("#webgl_canvas")[0];
  webGLContext = getWebGLContext(canvas,DEBUG);
  if (!webGLContext) {
    console.error("Could not get WebGL Context");
    return;
  }

  if (!initShaders(webGLContext,VERTEX_SHADER,FRAGMENT_SHADER)) {
    console.error("Error in initilizing the shaders");
    return;
  }

  try {
    pointPosition = webGLContext.getAttribLocation(webGLContext.program,"point_position");
    pointSize = webGLContext.getAttribLocation(webGLContext.program,"point_size");
  } catch (e) {
    console.error("Error when trying to get the attribute from the shader: " + e.toString());
  }
  if (pointPosition < 0) {
    console.error("Could not get the position of the point");
    return;
  }
  // var position = new Float32Array([0.0,0.0,0.0,0.0]);
  // webGLContext.vertexAttrib4f(pointPosition,position);
  webGLContext.vertexAttrib3f(pointPosition,0.0,0.0,0.0,0.0);
  webGLContext.vertexAttrib1f(pointSize,20.0);
  webGLContext.clearColor(0.0,0.0,0.0,1.0);
  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT);

  webGLContext.drawArrays(webGLContext.POINTS, 0, 1);
}
