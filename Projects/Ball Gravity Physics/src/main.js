const BallWrapper = document.getElementById("BallWrapper");
const DebugWindow = document.getElementById("DebugWindow");

// variables
let debug = true;

let ballamnt = 10;

// physics
let LastTime = 0;
let DeltaTime = 0;

let maxVel = 50;

let effectors = [];
let balls = [];

let MouseEffector;

let ScreenSize = new Vector2(window.innerWidth, window.innerHeight);

let PageInFocus = true;
let ResetDeltaTime = false;

function createBall(x, y, r, color) {
    let b = new ball(r, color);
    b.pos = new Vector2(x, y);
    balls.push(b);
    return b;
}

function createRandomBall() {
    let x = Math.random() * ScreenSize.x;
    let y = Math.random() * ScreenSize.y;
    let r = Math.random() * 20 + 10;
    let color = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ", 0.5)";
    return createBall(x, y, r, color);
}

function createRandomBalls(n) {
    arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(createRandomBall());
    }
    return arr;
}

function getTime() {
    return new Date().getTime();
}

function updateDeltaTime(){
    if (ResetDeltaTime) {
        LastTime = getTime();
        ResetDeltaTime = false;
        return;
    }

    let time = getTime();
    DeltaTime = (time - LastTime) / 1000;
    LastTime = time;
}

function updateScreenSize() {
    ScreenSize = new Vector2(window.innerWidth, window.innerHeight);
}


function getMousePos(e) {
    return new Vector2(e.clientX, e.clientY);
}

function update() {
    updateScreenSize();
    updateDeltaTime();

    // update balls
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < effectors.length; j++) {
            balls[i].applyEffector(effectors[j]);
        }
    }

    // apply physics
    for (let i = 0; i < balls.length; i++) {
        balls[i].applyPhysics();
    }

    // apply velocity
    for (let i = 0; i < balls.length; i++) {
        balls[i].applyVelocity();
    }

    // draw balls
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }

    // update debug window
    DebugWindow.innerHTML =
    "FPS: " + Math.round(1 / DeltaTime, 2)
    + "<br>DeltaTime: " + DeltaTime
    + "<br>ScreenSize: " + ScreenSize.x + ", " + ScreenSize.y
    + "<br>MousePos: " + MouseEffector.pos.x + ", " + MouseEffector.pos.y
    + "<br>MouseStrength: " + MouseEffector.strength
    + "<br> BallAmount: " + balls.length;

    window.requestAnimationFrame(update);
}

function start() {
    balls = createRandomBalls(ballamnt);

    MouseEffector = new effector();
    MouseEffector.pos = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
    MouseEffector.strength = 1000;
    effectors.push(MouseEffector);

    // effector2 = new effector();
    // effector2.pos = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
    // effector2.strength = 500;
    // effectors.push(effector2);

    LastTime = getTime();
    window.requestAnimationFrame(update);
}

document.addEventListener("mousemove", (e) => {
    MouseEffector.pos = getMousePos(e);
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        PageInFocus = false;
    } else {
        if (PageInFocus == false) {
            PageInFocus = true;
            ResetDeltaTime = true;
        }
    }
});

if (debug){
    DebugWindow.style.display = "block";
}

start();