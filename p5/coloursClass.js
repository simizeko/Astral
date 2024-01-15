// let ccbg = [];
// let ccsun = [];
// let ccstars = [];
// let ccHighlight = [];
// let ccR;
// let ccG;
// let ccB;

class Colours {
    constructor(initial) {

        // this.normalSphere = initial.normalSphere;
        // this.gradient = initial.gradient;

        this.counter = 0;

        this.bg = color(5);
        this.sun = color(255, 255, 255);
        this.stars = color(255, 255, 255);
        this.highlight = 255;
        if (desktop) {
            this.alpha = 50;
            this.alphaReset = 50;
        } else {
            this.alpha = 80
            this.alphaReset = 80;
        }
        this.R = 255;
        this.G = 255;
        this.B = 255;

        this.mono = {
            bg: color(5),
            sun: color(255, 255, 255),
            stars: color(255, 255, 255),
            highlight: 255,
            R: 255,
            G: 255,
            B: 255,
        }

        this.red = {
            bg: color(0, 0, 0),
            sun: color(0, 0, 0),
            stars: color(255, 150, 0),
            highlight: 255,
            R: 240,
            G: 85,
            B: 50
        }

        this.purple = {
            bg: color(65, 23, 85),
            sun: color(0, 0, 0),
            stars: color(200),
            highlight: 255,
            R: 130,
            G: 81,
            B: 255
        }

        this.blue = {
            bg: color(1, 22, 64),
            sun: color(0, 0, 0),
            stars: color(255),
            highlight: 255,
            R: 255,
            G: 50,
            B: 255
        }

        this.orange = {
            bg: color(217, 70, 37),
            sun: color(0, 0, 0),
            stars: color(255),
            highlight: 255,
            R: 255,
            G: 255,
            B: 255
        }

        this.palettes = [this.mono, this.red, this.blue, this.purple, this.orange];
        // shuffle(this.palettes);
    }

    transition(next) {
        this.bg = lerpColor(this.bg, next.bg, 0.03);
        this.sun = lerpColor(this.sun, next.sun, 0.03);
        this.stars = lerpColor(this.stars, next.stars, 0.03);
        this.highlight = lerp(this.highlight, next.highlight, 0.03);
        this.R = lerp(this.R, next.R, 0.03);
        this.G = lerp(this.G, next.G, 0.03);
        this.B = lerp(this.B, next.B, 0.03);
    }

    fadeout(timer) {
        if (timer >= 7) {
            this.alpha += -0.5;
        }
        else { this.alpha = this.alphaReset }
        // if (cc.alpha <= 0) {
        //     return true;
        // } return false;
    }

    colourChange() {
        // if (planets.length == 3) {
        //     // this.transition(this.mono, this.red);
        //     this.active(this.palettes[1])
        // } if (planets.length >= 6) {
        //     // this.transition(this.red, this.mono);
        //     this.active(this.palettes[2])
        // } if (planets.length >= 9) {
        //     // this.transition(this.red, this.mono);
        //     this.active(this.palettes[3])
        // }

        // if (cam.counter = 5000) {
        // if (planets.length <= 2) {
        //     this.transition(this.mono);
        // }
        if (colVal) {
            if (this.counter < 20) {
                this.transition(this.palettes[0]);
            }

            if (this.counter >= 20 && this.counter < 40) {
                this.transition(this.palettes[1]);
            }

            if (this.counter >= 40 && this.counter < 60) {
                this.transition(this.palettes[2]);
            }

            if (this.counter >= 60 && this.counter < 80) {
                this.transition(this.palettes[3]);
            }

            if (this.counter >= 80 && this.counter < 100) {
                this.transition(this.palettes[4]);
            }
        }

        // Counter resets when reaches 100 to loop back through colours
        if (this.counter >= 100) {
            this.counter = 0
        }
    }
}
