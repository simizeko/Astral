

class Cameras {
    constructor() {
        this.easycam = createEasyCam();
        this.orbitCam = 0;
        this.timer = 1000; //miliseconds until counter goes up by 1
        this.counter = 0;
        this.zSpeed = 0;
        // this.defaultD = (height / 2) / tan(PI / 6);
        this.defaultD = 800; // New value for p5 update


        this.state1 = {
            distance: this.defaultD,
            center: [0, 0, 0],
            rotation: [1, 0, 0, 0]
            // viewport : [x, y, w, h]
        }

        // this.angleX = -0.00045;
        this.angleY = 0.000;

        this.state2 = {
            distance: (windowHeight / 2) / tan(PI / 6),
            center: [0, 0, 0],
            rotation: [1, 0, 0, 0]
        }

    }


    init() {
        setInterval(this.timeIt, timer)
        this.easycam.removeMouseListeners();
        this.easycam.setState(this.state1, 0);
        this.easycam.pushResetState();

    }


    update() {
        let d = this.defaultD;

        this.easycam.rotateY(this.angleY);

        this.easycam.zoom(this.zSpeed);
        if (this.counter === 10 && rotate) {
            this.zSpeed = -0.07;
        }

        if (this.easycam.getDistance() <= d / 1.5) {
            this.zSpeed *= -1;
        }
        if (this.easycam.getDistance() > d) {
            this.zSpeed *= -1;
        }
    }

    Resize() {
        // Recalculates the new defaultD based on window height
        this.state1 = {
            distance: this.defaultD,
            center: [0, 0, 0],
            rotation: [1, 0, 0, 0]
        }

        // Sets the camera to the updated state
        this.easycam.setState(this.state1, 0);
    }


    debugHUD() {
        // 2D screen-aligned rendering section
        this.easycam.beginHUD();
        noLights();
        textSize(14);
        textFont(debug);
        let state = this.easycam.getState();
        let x = 20;
        let y = 20;

        let cw = width;
        let ch = height;
        let ww = windowWidth;
        let wh = windowHeight;
        let dw = displayWidth;
        let dh = displayHeight;
        let dd = displayDensity();
        let pd = pixelDensity();
        let m = meter.getValue();
        let windowSize = ww + 'x' + wh;
        let canvasSize = cw + 'x' + ch;
        let displaySize = dw + 'x' + dh;

        let lbls = ['distance', 'center', ' rotation', 'framerate', 'canvas size', 'window size', 'display size', "display's density", 'active pixel density', 'max voices', 'blackhole radius', 'audio meter'];
        let stats = [nfs(state.distance, 1, 2), nfs(state.center, 1, 2), nfs(state.rotation, 1, 3), round(frameRate()), canvasSize, windowSize, displaySize, dd, pd, MAX_POLYPHONY, round(sun.radius), round(m)];

        // // Render the background box for the HUD
        // push();
        // noStroke();
        // fill(255, 15); // a bit of transparency
        // rect(x - 20, y - 20, 200, 21 * lbls.length);
        // pop();

        push();
        fill(255);
        if (desktop) {
            for (let i = 0; i < lbls.length; i++) {
                text(lbls[i] + ': ' + stats[i], x, 20 * (1 + i));
            }
        } else {
            for (let i = 0; i < lbls.length - 4; i++) {
                text(lbls[3 + i] + ': ' + stats[3 + i], x, 20 * (1 + i));
            }
        }
        pop();

        // Render the labels
        // fill(255);
        // text("Distance:", x + 35, y + 25);
        // text("Center:  ", x + 35, y + 25 + 20);
        // text("Rotation:", x + 35, y + 25 + 40);
        // text("Framerate:", x + 35, y + 25 + 60);

        // Render the state numbers
        // fill(200);
        // text(nfs(state.distance, 1, 2), x + 125, y + 25);
        // text(nfs(state.center, 1, 2), x + 125, y + 25 + 20);
        // text(nfs(state.rotation, 1, 3), x + 125, y + 25 + 40);
        // text(nfs(frameRate(), 1, 2), x + 125, y + 25 + 60);
        
        this.easycam.endHUD();

        // frame boundary
        push();
        noFill();
        strokeWeight(1);
        stroke(255, 0, 0);
        rect(-width / 2, -height / 2, width, height)
        pop();
    }
}
