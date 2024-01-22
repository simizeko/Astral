

class Planets {
    constructor(tempX, tempY, tempM, center, tempNote) {
        this.position = createVector(tempX, tempY);
        this.pastPosition = this.position.copy();

        this.initialD = p5.Vector.sub(center, this.position);
        // this.initialD.normalize(); //sets initial velocity to 1
        // this.initialD.setMag(1.25 * orbitSpeed.initialMag);
        this.initialD.setMag(1 * orbitSpeed.initialMag);
        this.initialVelocity = this.initialD.rotate(PI / -2);

        this.velocity = createVector(this.initialVelocity.x, this.initialVelocity.y);
        this.accel = createVector(0, 0);
        this.mass = tempM;
        this.radius = calculateMass(this.mass);
        // this.influence = this.mass * planetInfluence;
        this.influence = this.mass;
    }


    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.accel.add(f);
    }


    update() {
        this.pastPosition = this.position.copy();
        this.velocity.add(this.accel);
        this.position.add(this.velocity);
        this.velocity.limit(orbitSpeed.c);
        this.accel.set(0, 0);
        // let temp = this.velocity.mag();

        if (this.influence < 2) {
            this.influence = 2
        }
    }

    show() {
        if (desktop) {
            push();
            ambientMaterial(255);
            translate(this.position.x, this.position.y, 0);
            sphere(this.radius / 2, planetResolution, planetResolution);
            pop();
        } else {
            push();
            noStroke();
            fill(cc.R, cc.G, cc.B);
            ellipse(this.position.x, this.position.y, this.radius);
            pop();
        }
        if (debugMode) {
            push();
            textSize(16);
            text('mass: ' + round(this.mass, 2), this.position.x + 12, this.position.y + 35);
            pop();
        }

    }

    showGravity(depth) {
        if (showGravity) {
            push();
            stroke(cc.highlight, 100);
            line(this.position.x, this.position.y, center.x, center.y);
            pop();
        }

        if (showInfluence) {
            push();
            noStroke();
            fill(255, 35);
            if (desktop) {
                    translate(0, 0, -depth / 100);
            }
            ellipse(this.position.x, this.position.y, this.radius * this.influence * 2);
            pop();
        }
    }

    intersects(other) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (d < this.radius / 2 + other.radius / 2) {
            if (mergePlanets) {
                let sum = PI * this.radius * this.radius + PI * other.radius * other.radius; //sum of areas
                let newRadius = sqrt(sum / PI);
                other.radius = sqrt(sum / PI); // Makes the other planet when bigger
                // other.radius = lerp(other.radius, newRadius, this.counterP);
                other.mass += this.mass * 1;
                other.influence = ((other.mass + this.mass) * planetInfluence);
            }

            // Keep the sun from gaining mass and growing in size
            sun.mass = sunMass;
            if (desktop) {
                sun.radius = sun.dr;
            } else {
                sun.radius = sun.mr;
            }

            return true;
        } else {
            return false;
        }
    }


    proximity(other) {
        let p = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (p < this.radius * this.influence) {
            // background(255, 50);
            // return true;
            let force = p5.Vector.sub(this.position, other.position);
            let distanceSq = constrain(force.magSq(), 10000, 25000);
            let G = planetGravityStrength; // gravity strength
            let strength = G * (this.mass * other.mass) / distanceSq;
            force.setMag(strength);
            other.applyForce(force);

            if (showGravity) {
                push();
                stroke(255, 100);
                line(this.position.x, this.position.y, other.position.x, other.position.y)
                pop();
            }
        }
    }



    edges() {
        if (desktop) {
            if (this.position.y + this.radius / 2 >= height / 2) {
                this.position.y = height / 2 - this.radius / 2;
                this.velocity.y *= -0.02;
            } else if (this.position.y - this.radius / 2 <= -height / 2) {
                this.position.y = -height / 2 + this.radius / 2;
                this.velocity.y *= -0.02;
            }

            if (this.position.x + this.radius / 2 >= width / 2) {
                this.position.x = width / 2 - this.radius / 2;
                this.velocity.x *= -0.02;
            } else if (this.position.x - this.radius / 2 <= -width / 2) {
                this.position.x = -width / 2 + this.radius / 2;
                this.velocity.x *= -0.02;
            }
        }
    }

    attachSounds(sounds) {
        this.sounds = sounds
    }
}





