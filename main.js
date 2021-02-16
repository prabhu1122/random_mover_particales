var w = [];
var boxLength = 2;

function setup() {
    // body...
    createCanvas(displayWidth, displayHeight - 80);
    pos = createVector(150, 100);
    vel = createVector(.5, .5);
    for (var particals = 0; particals < boxLength; particals++) {
        w.push(new walker(random(width), random(height)));
    }
}

function draw() {
    // body...
    background(0);
    for (var particals = 0; particals < boxLength; particals++) {
        for (var other = 0; other < boxLength; other++) {
            if (particals !== other) {
                //w[particals].connect(w[other]);
            }
        }
        w[particals].show();
        w[particals].update();
    }
}