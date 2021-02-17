////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var strok = 4;

class walker {
    constructor(x, y, d) {
        this.radius = 5;
        this.startConDist = d;
        this.pos = createVector(x, y);
        this.vel = createVector(random(-.51, .51), random(-.51, .51));
        //this.acc = createVector(random(-1, 1), random(-1, 1))
        this.show = function() {
            // body...
            strokeWeight(strok);
            stroke(10);
            point(this.pos.x, this.pos.y);
            noFill();
            strokeWeight(1);
            stroke(50);
            ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        }
        /*
         * @param mathod| update
         * @discription function this.update() is use as animate the sketch
         */

        this.update = function() {
            this.pos.add(this.vel);
            if (this.pos.x >= innerWidth) {
                this.vel.x *= -1;
                //this.pos.x= innerWidth- this.strok;
            }
            if (this.pos.x <= 0) {
                this.vel.x *= -1;
            }
            if (this.pos.y >= innerHeight) {
                this.vel.y *= -1;
            }
            if (this.pos.y <= 0) {
                this.vel.y *= -1;
            }
        }

        this.checkDist = function(other) {
            var dx = this.pos.x - other.pos.x;
            var dy = this.pos.y - other.pos.y;
            var distance = Math.sqrt(((this.pos.x - other.pos.x) * (this.pos.x - other.pos.x)) + ((this.pos.y - other.pos.y) * (this.pos.y - other.pos.y)));
            return distance;
        }

        this.connect = function(other) {
            let dis = this.checkDist(other);
            let lifespan = map(dis, this.startConDist, 0, 0, 255);
            let thikness = map(lifespan, 0,50,0,.51);
            stroke(50, lifespan);
            strokeWeight(thikness);
            line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        }
    }
}