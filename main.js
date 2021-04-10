//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var r = [];
var boxSize = 40;
var dis;
var radius;
var startDis = 40;
var col = ['red', 'purple', 'green', 'pink', 'black', 'orange','cyan','yellow','blue'];

function setup() {
  // body...
  createCanvas(displayWidth, displayHeight - 80);
  for (var particals = 0; particals < boxSize; particals++) {
    radius = getRandom(11);
    r.push(radius);
    wkr.push(new walker(random(radius, width - radius), random(radius, height - radius), startDis, radius, col[5]));
  }
  console.log(r);
}

function draw() {
  // body...
  background(255);
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

function getRandom(limit) {
  return Math.ceil(Math.random() * limit);
}