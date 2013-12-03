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

  webGLContext.clearColor(0.0,0.0,0.0,1.0);
  webGLContext.clear(webGLContext.COLOR_BUFFER_BIT);
}
