//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var boxLength = 50;
var dis;
var startDis = 40;

function setup() {
    // body...
    createCanvas(displayWidth, displayHeight - 80);
    //colorMode(HSB);
    //pos = createVector(150, 100);
    //vel = createVector(.5, .5);
    for (var particals = 0; particals < boxLength; particals++) {
        wkr.push(new walker(random(width), random(height), startDis));
    }
}

function draw() {
    // body...
    background(120);
    for (var particals = 0; particals < wkr.length; particals++) {
        for (var other = 0; other < wkr.length; other++) {
            let d = wkr[particals].checkDist(wkr[other]);
            if (particals !== other && d < startDis) {
                wkr[particals].connect(wkr[other]);
            }
        }
        wkr[particals].show();
        wkr[particals].update();
    }
    if (random(1) < 0.3) {
        if (mouseIsPressed) {
            //wkr.push(new walker(mouseX, mouseY));
        }
    }
}