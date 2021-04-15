//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var radius = [];
var boxSize = 50;
var x, y, dis, button;
var rad = 12;
var startDis = 40;
var col = ['red', 'purple', 'green', 'pink', 'white', 'orange', 
'cyan', 'yellow', 'blue', 'gray', 'brown', 'skyblue', 'lightgreen'];

function distanceCheck(x1, y1, x2, y2, r1, r2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  if (dist < r1 + r1) {
    return true;
  } else {
    return false;
  }
}

function setup() {
  // body...
  colorMode(HSB);
  createCanvas(innerWidth, innerHeight);
  for (var i = 0; i < boxSize; i++) {
    rad = getRandom(5, 20);
    x = getRandom(rad, innerWidth - rad);
    y = getRandom(rad, innerHeight - rad);
    if (i !== 0) {
      for (var j = 0; j < wkr.length; j++) {
        //check the touch between ball so that they don't overlap on eachother
        if (distanceCheck(x, y, wkr[j].pos.x, wkr[j].pos.y, radius[i], radius[j])) {
          x = getRandom(rad, innerWidth - rad);
          y = getRandom(rad, innerHeight - rad);
          j = -1; //call same loop till the new ball got no overlap
        }
      }
    }
    radius.push(rad);
    wkr.push(new walker(x, y, startDis, radius[i], col[getRandom(0, col.length)]));
  }
  button = createButton('Go');
}

function draw() {
  // body...
  background(0);
  for (var partical = 0; partical < wkr.length; partical++) {
    for (var other = partical; other < wkr.length; other++) {
      let d = wkr[partical].checkDist(wkr[other]);
      if (d < startDis) {
        if (d <= wkr[partical].radius + wkr[other].radius) {
          wkr[partical].resolveCollision(wkr[other]);
        }
        wkr[partical].connect(wkr[other]);
        wkr[partical].attract(wkr[other]);
      }
    }

    wkr[partical].show();
    wkr[partical].update();
  }
}

function getRandom(l, h) {
  return Math.floor(Math.random() * (h - l) + l);
}