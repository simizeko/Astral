let font;
let debug;
let muteWht;
let muteBlk;
let menuWht;
let fullScrn = false;
let fullOpen;

function preload() {
    debug = loadFont('./assets/hindRegular.otf');
    font = loadFont('./assets/hindLight.otf');
    muteWht = 'url(./design/mute1.svg)';
    muteBlk = 'url(./design/muteblk1.svg)';
    menuWht = 'url(./design/menu-thin.svg)';
    fullOpen = 'url(./design/fullOpen.svg)';
    fullClose = 'url(./design/fullClose.svg)'
}

let base;
let planets = [];
let dust = [];
let sun;
let center;
let grow;

let mapSwayX;
let mapswayY;
let swayX;
let swayY;
let timer = 5000;

let createPlanet = true;
let showMenu = false;
let showGravity = false;
let showInfluence = false;

let sunRadius = 4;
let sunMass = 120;
let initialPlanets = 0;
let planetInfluence = 2;
// let planetGravityStrength = 0.65;
let planetGravityStrength = 0.15;
let mergePlanets = true;

let orbitSpeed = {
    initialMag: 1.25,
    // c: 2.65
}
let slow = false, medium = true, fast = false;
let rotatation = true;

let sounds;
let midi;
let midiDevice = true;
let resetCounter = 0;

let cam;
let camPosition;
let cc;
let fov;

let angleX = 0;	// initialize angle variable
let angleY = 0;
let scalar;  // set the radius of camera  movement circle
let startX = 0;	// set the x-coordinate for the circle center
let startY = 0;	// set the y-coordinate for the circle center

let desktop = true;
let debugMode = true;
let leftSide;
let topSide;

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function FindCenter() {
    if (desktop) {
        center = createVector(0, 0, 0);
        leftSide = -width / 2;
        topSide = -height / 2;
    } else {
        center = createVector(windowWidth / 2, windowHeight / 2);
        leftSide = 0;
        topSide = 0;
    }
}

function ColourMode(type, colour) {
    let colourType;
    if (desktop && type == 'emissive') {
        colourType = emissiveMaterial(colour)
    } else {
        colourType = fill(colour);
    }
    return colourType;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        showGravity = true;
    } else if (keyCode === RIGHT_ARROW) {
        showGravity = false;
    }

    if (keyCode === UP_ARROW) {
        showInfluence = true;
    } else if (keyCode === DOWN_ARROW) {
        showInfluence = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    menu.muteB.remove();
    menu.menuB.remove();
    menu.fullB.remove()
    menu.MenuButtons();

    FindCenter();
    sun = new Sun(center.x, center.y, sunMass);

    if (desktop) {
        cam.Resize();
        perspective(PI / 3, width / height);
    }

    // Checks to see if menu needs resizing
    if (openMenu) {
        menu.container.remove();
        menu.bgFull.remove();
        menu.bgHalf.remove();
        menu.Container();
        if (midiOptions) {
            menu.OpenMidiPage();
        }
    }
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function setup() {
    // setAttributes('antialias', true);
    // setAttributes('version', 2);
    setAttributes({ version: 2 });
    // setAttributes({ alpha: true });

    if (desktop) {
        base = createCanvas(windowWidth, windowHeight, WEBGL);
        cam = new Cameras();
        cam.init();
        perspective(PI / 3, width / height);
    } else {
        base = createCanvas(windowWidth, windowHeight);
    }
    base.id('myCanvas');
    base.style('position: fixed');
    // pixelDensity(1);
    FindCenter();


    // const canvas = document.getElementById("myCanvas");
    // let gl = canvas.getContext("webgl");
    // let tt = gl.getParameter(gl.VERSION);
    // print(tt);
    // print(webglVersion);

    sounds = new Sounds();
    midi = new MidiOut();
    midi.setup();

    // sunMass = height / sunRadius;
    sun = new Sun(center.x, center.y, sunMass);

    cc = new Colours();

    for (let i = 0; i < initialPlanets; i++) {
        planets[i] = new Planets(random(-width / 2 + 100, width / 2 - 100), random(-height / 2 + 100, height / 2 - 100), 1, center);
        planets[i].attachSounds(new Sounds(planets[i]));
    }

    menu = new Menu();
    if (openMenu) {
        menu.Container();
    }
    menu.MenuButtons();
    menu.FpsCounter();

    textSize(18);
    textFont(font);

    setInterval(timeIt, 1000);
    setInterval(addDust, 5000);
    setInterval(cc.colourChange(), 5000);
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function speedControl() {
    if (orbitVal === 'I') {
        orbitSpeed = {
            initialMag: 2,
            c: 0.8,
            sunGravity: 0.33
        }
    }
    if (orbitVal === 'II') {
        orbitSpeed = {
            initialMag: 1.3,
            c: 1.85,
            sunGravity: 1
        }
    }
    if (orbitVal === 'III') {
        orbitSpeed = {
            initialMag: 1.82,
            c: 2.65 * 1.5,
            sunGravity: 1 * 2
        }
    }
    return false;
}



function rotateCam() {
    if (rotatation && desktop) {
        let rot = map(planets.length, 0, 20, 0, 0.001);
        let rSpeed = constrain(rot, 0, 0.001);

        cam.angleY = rSpeed;
    }
}

function timeIt() {
    if (desktop) {
        cam.counter++;
        if (cam.counter > 10) {
            rotateCam();
        }
    }
    resetCounter++;
    cc.counter++;
}

function mousePressed() {
    // FindCenter();
    if (desktop) {
        angleY = 0;
        cam.angleY = 0;
        sun.angleY = 0;
        cam.easycam.setState(cam.state1, 0);
        cam.counter = 0;
        cam.zSpeed = 0;
    }
    resetCounter = 0;
}

function addDust() {
    let dustSize;
    let boundary = {
        w: [],
        h: []
    }
    if (desktop) {
        dustSize = 0.05;
        boundary.w = [width / 2, -width / 2];
        boundary.h = [height / 2, -height / 2];
    } else {
        dustSize = 0.1;
        boundary.w = [-width, width];
        boundary.h = [-height, height];
    }
    a = new Dust(random(boundary.w), random(-height, height), dustSize, center);
    dust.push(a);
    b = new Dust(random(-width, width), random(boundary.h), dustSize, center);
    dust.push(b);
}

function calculateMass(value) {
    return sqrt(value) * 10;
}

function mouseReleased() {
    if (createPlanet) {
        if (desktop) {
            let newPlanet = new Planets(mouseX - width / 2, mouseY - height / 2, grow, center);
            newPlanet.attachSounds(new Sounds(newPlanet));
            planets.push(newPlanet);
        } else {
            let newPlanet = new Planets(mouseX, mouseY, grow, center);
            newPlanet.attachSounds(new Sounds(newPlanet));
            planets.push(newPlanet);
        }

    }
    if (desktop) {
        cam.counter = 0;
    }
}


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function draw() {
    if (openMenu) {
        menu.Active();
    }
    if (menu.counterM < 10) {
        menu.Cooldown();
    }
    menu.Update();
    cc.colourChange();
    background(cc.bg);

    sounds.grid();
    speedControl();

    if (desktop) {
        swayX = map(mouseX - width / 2, 0, width, 3, - 3);
        swayY = map(mouseY - height / 2, 0, height, 3, - 3);
        swayX = lerp(0, swayX, 0.5);
        swayY = lerp(0, swayY, 0.5);

        // Lighting settings
        spotLight(cc.R, cc.G, cc.B, 0, 0, 550, 0, 0, -1, PI / 3, 300)
        spotLight(cc.R, cc.G, cc.B, 0, 0, -550, 0, 0, 1, PI / 3, 300)
        ambientLight(cc.bg);
        pointLight(cc.R, cc.G, cc.B, 0, 0, 0);
        pointLight(cc.R, cc.G, cc.B, 0, 0, 150);
        pointLight(cc.R, cc.G, cc.B, 0, 0, -150);
    }

    push();
    if (createPlanet && mouseIsPressed) {
        if (grow <= 2) {
            // emissiveMaterial(255, 255, 0, 150);
            ColourMode('emissive', [255, 255, 0]);
        } else
            if (grow <= 3) {
                // emissiveMaterial(0, 255, 255, 150);
                ColourMode('emissive', [0, 255, 255]);
            } else
                if (grow <= 4) {
                    // emissiveMaterial(255, 0, 255, 150);
                    ColourMode('emissive', [255, 0, 255]);
                } else
                    if (grow <= 5) {
                        // emissiveMaterial(0, 255, 0, 150);
                        ColourMode('emissive', [0, 255, 0]);
                    } else
                        if (grow <= 6) {
                            // emissiveMaterial(255, 255, 255, 150);
                            ColourMode('emissive', [255, 255, 255]);
                        } else
                            if (grow <= 7) {
                                // emissiveMaterial(255, 0, 0, 150);
                                ColourMode('emissive', [255, 0, 0]);
                            } else
                                if (grow <= 8) {
                                    // emissiveMaterial(0, 0, 255, 150);
                                    ColourMode('emissive', [0, 0, 255]);
                                } else
                                    if (grow <= 9) {
                                        // emissiveMaterial(50, 190, 150, 200);
                                        ColourMode('emissive', [50, 190, 150]);
                                    }
        if (desktop) {
            // translate(0, 0, 1);
            ellipse(mouseX - width / 2, mouseY - height / 2, calculateMass(grow));
            emissiveMaterial(cc.bg);
            ellipse(mouseX - width / 2, mouseY - height / 2, calculateMass(grow / 1.85));
        } else {
            ellipse(mouseX, mouseY, calculateMass(grow));
            push();
            fill(cc.bg);
            ellipse(mouseX, mouseY, calculateMass(grow / 2.5));
        }
        // grow += 0.037; //growth speed
        grow += 0.045; //growth speed
    }
    else {
        grow = 1; //size the circle resets to
    }

    if (grow >= 9) { //for when it reaches a certain size
        grow = 9;
    }
    pop();


    for (let i = planets.length - 1; i >= 0; i--) {
        if (planets[i].intersects(sun)) {
            planets.splice(i, 1);
        }
    }

    for (let i = planets.length - 1; i >= 0; i--) {
        let overlapping = false;
        for (let other of planets) {
            if (planets[i] !== other && planets[i].intersects(other)) {
                overlapping = true;
                planets[i].proximity(other);
            }
        }
        if (overlapping && mergePlanets) {
            planets.splice(i, 1);
        }
    }

    for (let i = dust.length - 1; i >= 0; i--) {
        dust[i].update();
        dust[i].show();
        sun.attract(dust[i]);
        if (dust[i].touches(sun)) {
            dust.splice(i, 1);
        }
    }

    //// this makes mass effected the same for gravity (falling at the same speed). Remeber to replace '(gravity)' with '(weight)' below.
    // let weight = p5.Vector.mult(gravity, planets.mass);

    for (let i = planets.length - 1; i >= 0; i--) {

        // sounds = new Sounds(planets[i]);
        // sounds.identifyTarget(planets[i]);
        // let proximity = false;

        for (let other of planets) { //this for loop shows the gravity line between planets
            if (planets[i] !== other && planets[i].proximity(other)) {
                // planets[i].proximity(other);
            }
        }

        sun.attract(planets[i]);

        // planets[i].applyForce(gravity);
        planets[i].update();
        planets[i].show();
        planets[i].showGravity();
        planets[i].edges();
        planets[i].sounds.calculateNote();
        planets[i].sounds.calculateVelocity();
        planets[i].sounds.trigger();
        planets[i].sounds.visualFeedback();
        // planets[i].sounds.resetVisual()
        // planets[i].sounds.calculateLength();
    }

    sun.stars();
    if (desktop) {
        cam.update();
        if (debugMode) {
            cam.debugHUD(); // Display camera position info for debug
        }
    }
    sun.BHshow();
    midi.listOuts();

    if (menu.midiMode & midiDevice) {
        midi.midiListen();
    }

    sounds.ModeSelect();
    if (debugMode && desktop == false) {
        Debug2D();
    }
}

function Debug2D() {
    push();
    let cw = width;
    let ch = height;
    let ww = windowWidth;
    let wh = windowHeight;
    let dw = displayWidth;
    let dh = displayHeight;
    let dd = displayDensity();
    let pd = pixelDensity();
    let m = meter.getValue();
    fill(255);
    textSize(14);
    text('canvas size: ' + cw + 'x' + ch, leftSide + 25, topSide + 25);
    text('window size: ' + ww + 'x' + wh, leftSide + 25, topSide + 50);
    text('display size: ' + dw + 'x' + dh, leftSide + 25, topSide + 75);
    text("display's density: " + dd, leftSide + 25, topSide + 100);
    text("active pixel density: " + pd, leftSide + 25, topSide + 125);
    text("max voices: " + MAX_POLYPHONY, leftSide + 25, topSide + 150);
    text("blackhole radius: " + round(sun.radius), leftSide + 25, topSide + 175);
    text("audio meter: " + round(m), leftSide + 25, topSide + 200);
    text("framerate: " + round(frameRate()), leftSide + 25, topSide + 225);
    pop();


    // fill(255, 0, 0);
    push();
    // emissiveMaterial(255, 0, 0)
    noFill();
    strokeWeight(1);
    stroke(255, 0, 0);
    if (desktop) {
        rect(-width / 2, -height / 2, width, height);
    } else {
        rect(0, 0, width, height);
    }
    // ellipse(width / 2 - (width / 2 * i), height / 2, 100);
    pop();
}



