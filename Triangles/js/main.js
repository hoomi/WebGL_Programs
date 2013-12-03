function main() {
  var canvas,
      webGL = null;
  canvas = $("#rectangle_canvas")[0];
  //try {
  //  webGL = canvas.getContext("experiment-webgl");
  //} catch (e) {
  //  webGL = null;
  //}
  draw2D(canvas);
}

function draw2D(canvas) {
  var context;
  if (!canvas) {
    console.error("canvas cannot be null");
    return;
  }

  try {
    context = canvas.getContext("2d");
  } catch (e) {
    conosle.error(e.toString);
  }

  if (!context) {
    console.error("Could not get the context from the canvas");
    return;
  }

  context.fillStyle = "rgba(0,0,255,1.0);";
  context.fillRect(100,10,150,150); 
}
