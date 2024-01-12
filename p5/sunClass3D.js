

class Sun {
    constructor(tempX, tempY, tempM) {
        this.position = createVector(tempX, tempY);
        this.mass = tempM;
        // this.radius = sqrt(this.mass) * 5;
        this.mr = (height / 10) + 1;
        this.dr = (height / 11)
        if (desktop) {
            this.radius = this.dr;
        } else {
            this.radius = this.mr;
        }
        this.warpW = 50;
        this.slice = createGraphics(this.warpW, this.radius);
        // this.slice = createGraphics(this.radius, this.radius, P2D);
        this.angle = 0;
        this.sineRot = 0;
        this.x = 0;
        this.jitter = 1.75
        this.angleY = 0;
        this.rot = 0;

        this.starsSize = 1.5;
        this.starsDiameter = height / 2.5;
        this.starsAngle = 0;
        this.pointCount = 20;
        this.starsRings = 6;
        this.starsRotate = 0;
        this.starsRotationSpeed = 6 / 100000;
    }


    BHshow() {
        if (desktop) {

            // const clientWaitAsync = function (gl, sync, flags = 0, interval_ms = 10) {
            //     return new Promise(function (resolve, reject) {
            //         var check = function () {
            //             var res = gl.clientWaitSync(sync, flags, 0);
            //             if (res == gl.WAIT_FAILED) {
            //                 reject();
            //                 return;
            //             }
            //             if (res == gl.TIMEOUT_EXPIRED) {
            //                 setTimeout(check, interval_ms);
            //                 return;
            //             }
            //             resolve();
            //         };
            //         check();
            //     });
            // };

            // const readPixelsAsync = function (gl, width, height, buffer) {
            //     const bufpak = gl.createBuffer();
            //     gl.bindBuffer(gl.PIXEL_PACK_BUFFER, bufpak);
            //     gl.bufferData(gl.PIXEL_PACK_BUFFER, buffer.byteLength, gl.STREAM_READ);
            //     gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, 0);
            //     var sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
            //     if (!sync) return null;
            //     gl.flush();
            //     return clientWaitAsync(engine, sync, 0, 10).then(function () {
            //         gl.deleteSync(sync);
            //         gl.bindBuffer(gl.PIXEL_PACK_BUFFER, bufpak);
            //         gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, buffer);
            //         gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
            //         gl.deleteBuffer(bufpak);
            //         return buffer;
            //     });
            // };

            // const canvas = document.getElementById('myCanvas');
            // const gl = canvas.getContext("webgl");
            // const framebuffer = gl.createFramebuffer();

            // // Bind your framebuffer
            // gl.bindFramebuffer(gl.READ_FRAMEBUFFER, framebuffer);

            // // Provide output target
            // const data = new Uint8Array(width * height * 4);
            // await readPixelsAsync(gl, width, height, data);





            // function clientWaitAsync(gl, sync, flags, interval_ms) {
            //     return new Promise((resolve, reject) => {
            //       function test() {
            //         const res = gl.clientWaitSync(sync, flags, 0);
            //         if (res === gl.WAIT_FAILED) {
            //           reject();
            //           return;
            //         }
            //         if (res === gl.TIMEOUT_EXPIRED) {
            //           setTimeout(test, interval_ms);
            //           return;
            //         }
            //         resolve();
            //       }
            //       test();
            //     });
            //   }

            //   async function getBufferSubDataAsync(
            //     gl,
            //     target,
            //     buffer,
            //     srcByteOffset,
            //     dstBuffer,
            //     /* optional */ dstOffset,
            //     /* optional */ length,
            //   ) {
            //     const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
            //     gl.flush();

            //     await clientWaitAsync(gl, sync, 0, 10);
            //     gl.deleteSync(sync);

            //     gl.bindBuffer(target, buffer);
            //     gl.getBufferSubData(target, srcByteOffset, dstBuffer, dstOffset, length);
            //     gl.bindBuffer(target, null);

            //     return dest;
            //   }

            //   async function readPixelsAsync(gl, x, y, w, h, format, type, dest) {
            //     const buf = gl.createBuffer();
            //     gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf);
            //     gl.bufferData(gl.PIXEL_PACK_BUFFER, dest.byteLength, gl.STREAM_READ);
            //     gl.readPixels(x, y, w, h, format, type, 0);
            //     gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);

            //     await getBufferSubDataAsync(gl, gl.PIXEL_PACK_BUFFER, buf, 0, dest);

            //     gl.deleteBuffer(buf);
            //     return dest;
            //   }



            noStroke();
            imageMode(CENTER);
            // this.slice.background(255, 0, 0);
            this.slice.copy(base, int((width / 2) - this.warpW / 2), int((height / 2) - this.radius / 2), int(this.radius), int(this.radius), this.x, 0, int(this.radius), int(this.radius));
            // this.x = (this.x + this.warpW) % this.slice.width;


            this.jitter += random(0.5, -0.5);
            if (this.jitter >= 4) {
                this.jitter = 3.9;
            } if (this.jitter <= 2) {
                this.jitter = 2.1;
            }

            // Rotating background projection
            push();
            rotateY(this.angleY);
            translate(0, 0, -this.radius / 1.25);
            // blendMode(LIGHTEST);
            ambientLight(255);
            texture(this.slice);
            rotateY(PI);
            rotateZ(this.angle);
            sphere(this.radius / 1.25);
            rotateZ(-this.angle)
            this.angle += 0.1;
            pop()

            // Zoomed background projection
            push();
            ambientLight(255);
            rotateY(this.angleY);
            texture(this.slice);
            ellipse(0, 0, this.radius * 1.3);
            blendMode(BLEND);
            translate(0, 0, 2);
            emissiveMaterial(0);
            rotateZ(this.angle);
            ellipse(0, 0, this.radius);
            strokeWeight(random(1, 6));
            noFill();
            ellipse(0, 0, this.radius * 1.3)
            pop();

            // Inner sphere
            push();
            rotateY(this.angleY);
            noStroke();
            // blendMode(REPLACE);
            translate(0, 0, this.radius);
            // emissiveMaterial(1);
            // ambientMaterial(255);
            fill(0);
            sphere(this.radius / 2.2);
            blendMode(BLEND)
            pop();

            this.angleY += cam.angleY;

            this.rot += 3;
            const numberOseg = 16;
            // const segment = (height / 2) / numberOseg;
            // const gapSize = segment * 0.8;
            let maxDiameter = this.radius / 4.5;
            for (let y = 1; y < numberOseg; y++) {
                let currentDiameter = maxDiameter * (numberOseg - y);


                // rotateY(PI);
                push();
                noStroke();
                // blendMode(LIGHTEST);
                emissiveMaterial(255);
                // emissiveMaterial(cc.R, cc.G, cc.B);
                // fill(cc.R, cc.G, cc.B);
                // translate(0, 0, -sun.radius / 2.5);
                translate(0, 4, 0)
                rotateX(PI / 2);
                rotateX(random(-0.03, -0.025));
                rotateZ(-this.angleY);
                // rotateZ(this.rot);
                translate(0, 0, 0 + y)
                strokeWeight(1);
                // stroke(cc.highlight);
                stroke(cc.R, cc.G, cc.B);
                ellipse(0, 0, currentDiameter / 1.3, currentDiameter * 1.25);
                // blendMode(BLEND);
                pop();

                push();
                // translate(-sun.radius / 2, 0, 0);
                rotateY(this.angleY + PI / random(5.3, 5.5) + (map(sin(this.sineRot), -1, 1, 5, 6.5)));
                // this.sineRot += 0.5;
                this.sineRot += 5;
                translate(0, 0, 0 + y)
                // blendMode(LIGHTEST);
                fill(255, 8);
                ellipse(0, 0, currentDiameter);
                // blendMode(BLEND);
                pop();
            }
        } else {
            // 2D blackhole visual
            let shake = random(1.075, 1.125);
            push();
            noStroke();
            fill(cc.R, cc.G, cc.B, 150);
            ellipse(center.x, center.y, this.radius * shake);
            fill(cc.R, cc.G, cc.B, 50);
            ellipse(center.x, center.y, this.radius * 1.25);

            fill(0);
            ellipse(center.x, center.y, this.radius);
            pop();
        }
    }


    attract(planets) {
        let force = p5.Vector.sub(this.position, planets.position);
        let distanceSq = constrain(force.magSq(), 4000, 20000);
        let G = orbitSpeed.sunGravity; // gravity strength
        let strength = G * (this.mass * planets.mass) / distanceSq;
        force.setMag(strength);
        planets.applyForce(force);
    }


    stars() {
        if (desktop) {
            push();
            stroke(cc.stars);
            strokeWeight(2);
            let r = (height / 2) / tan(PI / 6); // size of sphere made of dots
            // let r = cam.defaultD;
            let total = 10;
            for (let i = 0; i < total; i++) {
                let longitude = map(i, 0, total, -PI, PI);
                for (let j = 0; j < total; j++) {
                    let latitude = map(j, 0, total, -PI / 2, PI / 2);
                    let x = r * sin(longitude) * cos(latitude);
                    let y = r * sin(latitude) * sin(longitude);
                    let z = r * cos(longitude);
                    point(x, y, z);
                }
            }
            pop();
        } else {
            push();
            translate(width / 2, height / 2,);
            stroke(cc.stars);
            strokeWeight(this.starsSize);
            this.starsRotate += this.starsRotationSpeed;
            for (let j = 0; j <= this.starsRings; j++) {
                rotate(this.starsRotate);
                for (let i = this.starsAngle; i < radians(360 + this.starsAngle); i += radians(360 / (this.pointCount * j / 2))) {
                    let x = (this.starsDiameter / 2 * Math.cos(i)) * j + width / 2;
                    let y = (this.starsDiameter / 2 * Math.sin(i)) * j + height / 2;
                    point(x - width / 2, y - height / 2);
                }
            }
            pop();
        }
    }
}





