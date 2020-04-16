// https://www.youtube.com/watch?v=L-Lsfu4ab74
// https://github.com/CodingTrain/website/blob/master/Courses/intelligence_learning/session3/linear_regression_gradient_descent/sketch.js
var data = [];

var m = 0;
var b = 0;
//ax^2+bx+c
var a=0;
var b_2=0;
var c=0;
function setup() {
  createCanvas(400, 400);

}

function gradientDescent() {
  var learning_rate = 0.05; //reduces size of error- orginally was .05
  for (var i = 0; i < data.length; i++) { //look through all the data
    var x = data[i].x; //x value data point
    var y = data[i].y; //y value data point
    var guess = m * x + b; //machine learning recipe
    var error = y - guess; //error= actual-guess
    m = m + error * x * learning_rate; //for every data point, change m and b to be more accurate
    b = b + error * learning_rate;
    a= (a*x^2+error)* learning_rate
    b_2= b_2 + error * x * learning_rate;
    c= c+ error *learning_rate;
  }
}

function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);

  stroke(255);
  strokeWeight(2);
  line(x1, y1, x2, y2);
stroke(255,0,0);
line(m*x1^2+b*x1+c, y1, m*x2^2+b*x2+c, y2);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(x2, y2);
//ax^2+bx+c
ctx.quadraticCurveTo(a*x1^2+b_2*x1+c, y1, a*x2^2+b_2*x2+c, 0);
// either y1 and 0, or 0 and y2 works. but the first works better
ctx.stroke();
}

function mousePressed() {
  //when the button is pressed, get the x and y value and add it to the data list
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  var point = createVector(x, y);
  data.push(point);
}

function draw() {
  background(51);
  ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(255);
    stroke(255);
    ellipse(x, y, 8, 8);
  }

  if (data.length > 1) {
    gradientDescent();
    drawLine();
  }
}
