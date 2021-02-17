//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var boxLength = 0;
var dis;

function setup() {
    // body...
    createCanvas(displayWidth, displayHeight - 80);
    colorMode(HSB);
    //pos = createVector(150, 100);
    //vel = createVector(.5, .5);
    for (var particals = 0; particals < boxLength; particals++) {
        wkr.push(new walker(random(width), random(height)));
    }
}

function draw() {
    // body...
    //background(0);
    for (var particals = 0; particals < wkr.length; particals++) {
        for (var other = 0; other < wkr.length; other++) {
            if (particals !== other) {
                wkr[particals].connect(wkr[other]);
            }
        }
        wkr[particals].show();
        wkr[particals].update();
    }
    if (random(1) < 0.3) {
        if (mouseIsPressed) {
            wkr.push(new walker(mouseX, mouseY));
        }
    }
}