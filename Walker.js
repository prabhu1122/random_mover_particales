////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var strok = 4;

class walker {
  constructor(pos, d, r, c, e) {
    //colorMode(HSB,10);
    this.radius = r;
    this.startConDist = d;
    this.col = c;
    this.pos = pos;
    this.vel = createVector(0, 0);

    this.show = function() {
      // body...
      noFill();
      //stroke(color(this.col[random(0,5)]));
      stroke(this.col);
      //fill(this.col);
      strokeWeight(1);
      ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
      /*strokeWeight(strok);
      stroke(10);
      strokeWeight(1);
      fill('black');
      ellipse(this.pos.x, this.pos.y, 2);*/
    }
    /**
     * This is use as animate the sketch
     * @param mathod | update
     * @return none | void
     */

    this.update = function(acc, a, f) {
      this.mouse = createVector(mouseX, mouseY);
      this.acc = p5.Vector.sub(this.mouse, this.pos);
      //comment the line below to de-activate gyrosensor
      this.acc = acc;
      this.acc.setMag(f);
      this.vel.add(this.acc);
      this.vel.limit(a);
      this.pos.add(this.vel);
    }
    /**
     * Check the distance b/w thw two particles
     * @param object | other | An other particles
     * @return float |distance| The distance b/w the particales
     * 
     */

    this.distance = function(other) {
      let dx = this.pos.x - other.pos.x;
      let dy = this.pos.y - other.pos.y;
      let distance = Math.sqrt(((this.pos.x - other.pos.x) * (this.pos.x - other.pos.x)) + ((this.pos.y - other.pos.y) * (this.pos.y - other.pos.y)));
      return distance;
    }
    // checking the outer circle distance and return dist    
    this.orbitCheck = function(other) {

      let dx = this.pos.x - other.pos.x;
      let dy = this.pos.y - other.pos.y;
      let orbitDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      return orbitDistance;
    }

    this.connect = function(other) {
      let dis = this.distance(other);
      let lifespan = map(dis, this.startConDist, 0, 0, 255);
      let thikness = map(lifespan, 0, 50, 0, .15);
      stroke(200, 150, 100, lifespan);
      strokeWeight(thikness);
      line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

    }

    /**
     * This is perform an acc towords the 
     * another particle from a distance by 
     * the particle
     * @ param object| other | An another particales
     * 
     */
    this.attract = function(other) {
      this.acc = p5.Vector.sub(other.pos, this.pos);
    }

    this.setBoundry = function(boolean) {
      if (boolean === true) {
        if (this.pos.y >= height - this.radius) {
          this.pos.y = height - this.radius;
          this.vel.y *= -e;
        }
        if (this.pos.y <= this.radius) {
          this.pos.y = this.radius;
          this.vel.y *= -e;
        }
        if (this.pos.x >= width - this.radius) {
          this.pos.x = width - this.radius;
          this.vel.x *= -e;
        }
        if (this.pos.x <= this.radius) {
          this.pos.x = this.radius;
          this.vel.x *= -e;
        }
      } else {
        this.vel.mult(1);
      }
    }

    //collision resolving

    //Utility functions
    /**
     * Rotates coordinate system for velocities

     * Takes velocities and alters them as if the coordinate system they're on was rotated
     * @param  Object | velocity | The velocity of an individual particle
     * @param  Float  | angle    | The angle of collision between two objects in radians
     * @return Object | The altered x and y velocities after the coordinate system has been rotated
     */

    function rotateAng(velocity, angle) {
      const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
      };
      return rotatedVelocities;
    }

    /**
     * 
     * Swaps out two colliding particles' x and y velocities after running through
     * an elastic collision reaction equation
     *
     * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
     * @param  Object | otherParticle | An otherParticle object with x and y coordinates, plus velocity
     * @return Null | Does not return a value
     */
    this.resolveCollision = function(other) {
      const xVelocityDiff = this.vel.x - other.vel.x;
      const yVelocityDiff = this.vel.y - other.vel.y;

      const xDist = other.pos.x - this.pos.x;
      const yDist = other.pos.y - this.pos.y;

      // Prevent accidental overlap of particles
      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(other.pos.y - this.pos.y, other.pos.x - this.pos.x);

        // Store mass in var for better readability in collision equation
        const m1 = 1;
        const m2 = 1;
        //const m1 = other.radius;
        //const m2 = this.radius;
        // Velocity before equation

        const u1 = rotateAng(this.vel, angle);
        const u2 = rotateAng(other.vel, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2  / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2  / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotateAng(v1, -angle);
        const vFinal2 = rotateAng(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        this.vel.x = vFinal1.x;
        this.vel.y = vFinal1.y;

        other.vel.x = vFinal2.x;
        other.vel.y = vFinal2.y;
      }
    };

  }
}
