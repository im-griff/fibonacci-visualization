var r = 128;              // radius of circle
var angle, step;
var steps;
var points = [];          // this stores the points on the circle [x][y]
var opacity = 255;        // opacity for lines

// html elements
var rangeSlider;
var alphaSlider;
var spanMod;
var spanOpacity;
var pickBg, pickLine;
var canvasA;

var cBackground, cLine;      // colors

var maxNums = 32;         // maxNums to calculate
var fibonacciNums = [];   // array to hold fibonacci sequence
var modulo;               // current mod (comes from slider)
var modFibNums = [];      // array to hold fibonacci sequence modulos

var showPoints = true;

const fibonacci = n => {  // fibonacci function: fibonacci(i) returns the number
  let a = 0, b = 1, c = n;
  
  for(let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
};

function setup() {
  canvasA = createCanvas(700, 500);
  canvasA.parent('#canvasA');
  
  // set colors
  cBackground = color('#ebe600');
  cLine = color('#140f00');
  
  // get html
  spanMod     = select("#spanMod");
  rangeSlider = select("#rangeSlider");
  alphaSlider = select("#alphaSlider");
  spanOpacity = select("#spanOpacity")
  
  pickBg      = select("#pickBg");
  pickLine    = select("#pickLine");
  
  
  // set which functions the html elements trigger
  rangeSlider.input(setPoints);
  alphaSlider.input(setOpacity);
  
  pickBg.input(setColors);
  pickLine.input(setColors);
  
  pickBg.value(rgbToHex(cBackground));
  pickLine.value(rgbToHex(cLine));
  
  // set sides/mod
  setPoints();

  // populate the fibonacciNums array with the numbers
  for(i=0;i<maxNums;i++) {
    append(fibonacciNums, fibonacci(i));
  }
  
  setOpacity();
  console.log(fibonacciNums);
}

function draw() {
  background(cBackground);
  fill(cLine);
  noStroke();
  
  text(fibonacciNums,4,16);
  text(modFibNums,4,42);
  text("Pisano period: " + pisano(modulo),4,68)
  
  fill(0,100);
  text("Griff#1998 | github.com/im-griff", 4, 400);
  // move 0,0 to the center of the screen
  translate(width/2, height/2);
  

  
  // set the colors
  cLine.setAlpha(opacity);
  stroke(cLine);
  fill(cBackground);
  strokeWeight(5);  
  

  
  // draw circle
  ellipse(0,0,r*2);
  
  // loop the length of the pisano period
  for(i=0; i<pisano(modulo); i++) {
    // the point used is the modulo (modFibNums[i]) and access x = [0] or y = [1]
    if (modFibNums.length > 0) {
      var xm = points[modFibNums[i]][0];
      var ym = points[modFibNums[i]][1];
      var xm2, ym2;

      if (i != pisano(modulo) - 1) {
        xm2 = points[modFibNums[i+1]][0];
        ym2 = points[modFibNums[i+1]][1];
      } else {
        xm2 = points[0][0];
        ym2 = points[0][1];
      }

      // draw the line
      line(xm,ym, xm2, ym2);
    }
  }
  cLine.setAlpha(255);

}

function setMod() {
  // set the modulo based on that html slider
  modFibNums = [];
  modulo = rangeSlider.value();
  spanMod.html(modulo);
  for(i=0; i<pisano(modulo); i++) {
    // populate the array modFibNums
    append(modFibNums, fibonacci(i) % modulo)  
  }
}

function setPoints() {
  setMod();
  steps = rangeSlider.value();
  
  // initialize variables
  points = [];
  angle = 0;
  step  = TWO_PI/steps; // in radians equivalent of 360/steps in degrees
  
  for(i=0; i<steps; i++) {
    // get points and translate them to x and y values
    var x = r * sin(angle);
    var y = r * cos(angle);
    append(points, [x, y]); 
  
    angle = angle + step;
  }  
}

// helper functions
function setOpacity() {
  opacity = alphaSlider.value();
  spanOpacity.html(opacity);
}
function setColors() {
  cBackground = color('' + pickBg.value());
  cLine = color('' + pickLine.value());
  
}
function rgbToHex(_color) {
  return "#" + hex(_color.levels[0],2) + hex(_color.levels[1],2) + hex(_color.levels[2],2);  
}
