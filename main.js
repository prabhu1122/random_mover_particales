//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var radiusBox = [];
var boxSize = 2;
var rad = 5;
var eccentricity = 0.7;
var startDis = 60;
var acc;
var col = ['red', 'purple', 'green', 'pink', 'black', 'orange',
'cyan', 'yellow', 'blue', 'gray', 'brown', 'skyblue', 'lightgreen'];

function getRandom(l, h) {
  return Math.floor(Math.random() * (h - l) + l);
}

function distanceCheck(x1, y1, x2, y2, r1, r2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  if (dist < r1 + r1 + 1) {
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
    //rad = getRandom(3, 10);
    x = getRandom(rad, innerWidth - rad);
    y = getRandom(rad, innerHeight - rad);
    if (i !== 0) {
      for (var j = 0; j < wkr.length; j++) {
        //check the distance between particles so that they shouldn't overlap eachother
        if (distanceCheck(x, y, wkr[j].pos.x, wkr[j].pos.y, radiusBox[j], radiusBox[i])) {
          x = getRandom(rad, innerWidth - rad);
          y = getRandom(rad, innerHeight - rad);
          j = -1; //loop till the new ball got no overlap
        }
      }
    }
    radiusBox.push(rad);
    pos = createVector(x, y);
    wkr.push(new walker(pos, startDis, radiusBox[i], col[getRandom(0, col.length)], eccentricity));
  }
}

function draw() {
  background('#F0FFFF');
  wkr.forEach((each, eachIndex) => {
    wkr.forEach((other, otherIndex) => {
      if (each.distance(other) < startDis) {
        if (each.distance(other) <= each.radius + other.radius) {
          each.resolveCollision(other);
        }
        //each.connect(other);
        each.attract(other);
      }
    });
    each.show();
    each.update(acc, 5, .05); //update(velocity limit, acc limit)
    each.setBoundry(true);
  });
}

window.addEventListener("deviceorientation", (event) => {
  acc = createVector(event.gamma.toFixed(0) * .1, event.beta.toFixed() * .1);
});

window.addEventListener("devicemotion", (event) => {
  acceleration = event.acceleration.y.toFixed(5);
});
