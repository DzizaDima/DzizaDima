var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
function Point(px, py) {

  var color = document.getElementsByName('colors')[0].options[document.getElementsByName('colors')[0].selectedIndex].value;
  var colors = ["white", "red", "green", "blue", "orange"];
 /*  ctx.fillStyle = colors[color];
  ctx.fillRect(px, py, 1, 1); */
  ctx.beginPath();
  ctx.arc(px, py, 1, 0, 2);
	ctx.fillStyle = colors[color];
	ctx.fill();
  console.log(colors[color]);


}
function Start() {
  var x1 = Math.round(document.getElementsByName('xstart')[0].value);
  var y1 = Math.round(document.getElementsByName('ystart')[0].value);
  var x2 = Math.round(document.getElementsByName('xend')[0].value);
  var y2 = Math.round(document.getElementsByName('yend')[0].value);
  var deltaX = Math.abs(x1 - x2);
  var deltaY = Math.abs(y1 - y2);
  var length = Math.max(deltaX, deltaY);
  var dx = (x2 - x1) / length;
  var dy = (y2 - y1) / length;
  var x = x1;
  var y = y1;
  if (x1 < 700 && x2 < 700 && y1 < 500 && y2 < 500 && x1 > 0 && x2 > 0 && y1 > 0 && y2 > 0) {
    for (var i = 0; i <= length; i++) {
      Point(x, y);
      x += dx;
      y += dy;
    }
  }
  else {
    alert("Вы вышли за границы дозволеного!");
  }
}
function Clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  xstart.value = null;
  ystart.value = null;
  xend.value = null;
  yend.value = null;

}