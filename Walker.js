var angle = 3;
var strok = 4;
var lifespan = 255;
class walker {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(random(-1, 1), random(-1, 1))
        this.show = function() {
            // body...
            strokeWeight(strok);
            stroke(200);
            point(this.pos.x, this.pos.y);
        }

        this.update = function() {
            // body...
            this.vel.add(this.acc)
            this.vel.rotate(random(-0.8, 0.8));
            //this.vel.mult(.8);
            this.pos.add(this.vel);
            if (this.pos.x >= innerWidth) {
                this.pos.x = 0;
            }
            if (this.pos.x <= 0) {
                this.pos.x = innerWidth;
            }
            if (this.pos.y >= innerHeight) {
                this.pos.y = 0;
            }
            if (this.pos.y <= 0) {
                this.pos.y = innerHeight;
            }
            this.vel.mult(0);
        }
        this.connect = function(other) {
            stroke(200,lifespan);
            strokeWeight(1);
            line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        }

        this.checkDist = function(other) {
            var dx = this.pos.x - other.pos.x;
            var dy = this.pos.y - other.pos.y;
            var dist = Math.sqrt(Math.pow(dx, 2), Math.pow(dy, 2));
            return dist;
        }
    }
}