var toggleAnimation;
function main() {
	var canvas = $("#webgl_canvas")[0],
	 	gl,
	 	triangle,
	 	tick,
	 	g_last,
	 	animationId = -1,
	 	ANGLE_STEP = 45,
	 	findAngle = function (currentAngle) {
	 		var now = Date.now(),
	 			elapsed = now - g_last,
	 			newAngle;
	 		g_last = now;
	 		newAngle = currentAngle + (ANGLE_STEP * elapsed) / 1000.0;
			return newAngle %= 360;
	 	};
	gl = getWebGLContext(canvas,DEBUG);
	if (!gl) {
		console.error("WebGl is not enabled on this browser");
		return;
	}
	gl.clearColor(0.0,0.0,0.0,1.0);
	triangle = new Triangle(gl);
	triangle.draw();
	tick = function() {
		var degree = findAngle(triangle.currentAngle);
		// Without ailliasing
		triangle.rotate(triangle.currentAngle - degree, 0,0,1);
		// With ailliasing
		// triangle.rotate(degree, 0,0,1);
		animationId = requestAnimationFrame(tick);
	};
	toggleAnimation = function() {
		if (animationId < 0) {
			g_last = Date.now();
			tick();
		} else {
			cancelAnimationFrame(animationId);
			animationId = -1;
		}
	}
}