var VERTEX_SHADER = "void main() {\n" +
                    "gl_Position = vec4(0.5,-0.5,0.0,1.0);\n" + 
                    "gl_PointSize = 10.0;\n" +
                    "}",
    FRAGMENT_SHADER = "void main() {\n" + 
                      "gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +
                      "}";
function main() {
  console.debug("main function");
  var canvas,
      webGLContext;
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
  webGLContext.clearColor(0.0,0.0,0.0,1.0);
  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT);

  webGLContext.drawArrays(webGLContext.POINTS, 0, 1);
}
