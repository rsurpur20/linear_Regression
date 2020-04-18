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
  var learning_rate = 0.09; //reduces size of error- orginally was .05
  for (var i = 0; i < data.length; i++) { //look through all the data
    var x = data[i].x; //x value data point
    var y = data[i].y; //y value data point
    var guess = m * x + b; //machine learning recipe
    var error = y - guess; //error= actual-guess
    m = m + error * x * learning_rate; //for every data point, change m and b to be more accurate
    b = b + error * learning_rate;


    var guess_parb= a*x*x+b*x+c;
    var error_parab=y-guess_parb;
    a= a+x*x*error_parab* learning_rate;
    b_2=b_2+error_parab * x * learning_rate;
    c=c+error_parab *learning_rate;
    // console.log(a);
    // console.log(b_2);
    // console.log(c);
  }
}

function drawParabola(a,b,c){
  for (var i=0;i<400;i++){
    point(i-1,400-(a*i*i+b*i+c))
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
// a=((a*x1*x1)-(a*x2*x2))/2;
// b_2=((b_2*x1)-(b_2*x2))/2;
//a is width
//b and c are height
// var a = map(a, 0, 1, 0, width);
// var b_2 = map(b_2, 0, 1, height, 0);
// var c = map(c, 0, 1, height, 0);
drawParabola(a,b_2,c);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(x1, y1);
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

function plotPoint(){
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}
function redraw(){
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fill();
}


function draw() {
  background(51);
  redraw();
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(255);
    stroke(255);
    ellipse(x, y, 8, 8);
  }
  plotPoint();
  if (data.length > 1) {

    gradientDescent();
    drawLine();

  }
}
