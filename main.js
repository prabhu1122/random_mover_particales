//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var boxSize = 50;
var dis;
var radius = 5;
var startDis = 40;

function setup() {
  // body...
  createCanvas(displayWidth, displayHeight - 80);
  for (var particals = 0; particals < boxSize; particals++) {
    wkr.push(new walker(random(radius, width - radius), random(radius, height - radius), startDis, radius));
  }
}

function draw() {
  // body...
  background(255);
  for (var partical = 0; partical < wkr.length; partical++) {
    for (var other = partical; other < wkr.length; other++) {
      let d = wkr[partical].checkDist(wkr[other]);
      if (d < startDis) {
        if (d <= 2 * radius) {
          wkr[partical].resolveCollision(wkr[other]);
        }
        wkr[partical].connect(wkr[other]);
        wkr[partical].attract(wkr[other]);
      }
    }
    wkr[partical].show();
    wkr[partical].update();
  }
  for (var partical = 0; partical < wkr.length; partical++) {
    for (var other = partical; other < wkr.length; other++) {
      let d = wkr[partical].checkDist(wkr[other]);
      if (d < 2 * radius) {
        wkr.splice(wkr.indexOf(other),0);
      }
    }
  }
}