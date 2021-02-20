//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var wkr = [];
var boxLength = 80;
var dis;
var radius = 5;
var startDis = 50;

function setup() {
    // body...
    createCanvas(displayWidth, displayHeight - 80);
    for (var particals = 0; particals < boxLength; particals++) {
        wkr.push(new walker(random(radius, width - radius), random(radius, height - radius), startDis, radius));
    }
}

function draw() {
    // body...
    background(255);
    for (var particals = 0; particals < wkr.length; particals++) {
        for (var other = particals; other < wkr.length; other++) {
            let d = wkr[particals].checkDist(wkr[other]);
            if (d < startDis) {
                if (d <= 2 * radius) {
                    wkr[particals].resolveCollision(wkr[other]);
                }
                wkr[particals].connect(wkr[other]);
            }
        }
        wkr[particals].show();
        wkr[particals].update();
    }
    if (random(1) < 0.01 && mouseX >= radius && mouseX <= width-radius) {
        if (mouseIsPressed) {
            //wkr.push(new walker(mouseX, mouseY, startDis, radius));
        }
        //wkr.push(new walker(mouseX, mouseY, startDis, radius));
    }
}