function main() {
  var webGl = new WebGL("webgl_canvas");
  // webGl.drawTranslatedTriangle();
  // webGl.drawRotatedTriangle(90);
  // webGl.drawScaledTriangle();
  webGl.drawTranslatedRotatedTriangle(45);
}
