const BallWrapper = document.getElementById("BallWrapper");
const DebugWindow = document.getElementById("DebugWindow");

// variables
let debug = false;

let ballamnt = 100;

// physics
let LastTime = 0;
let DeltaTime = 0;

let frameUpdateLastTime = 0;
let frameUpdateDeltaTime = 0;

const worldScale = 50; // 1 unit = 50 pixels

let effectors = [];
let balls = [];

let MouseEffector;

let ScreenSize = new Vector2(window.innerWidth, window.innerHeight);

let PageInFocus = true;
let ResetDeltaTime = false;

function createBall(x, y, r, color) {
    let b = new physicsBall(r, color, BallWrapper);
    b.pos = new Vector2(x, y);
    b.worldScale = worldScale;
    balls.push(b);
    return b;
}

function createRandomBall() {
    let x = Math.random() * ScreenSize.x;
    let y = Math.random() * ScreenSize.y;
    let mass = Math.random() * 20 + 10;
    let r = mass * .25;
    let color = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ", 0.75)";
    let ball = createBall(x, y, r, color);
    ball.drag = 0;
    ball.mass = mass*10;
    ball.gravityFunc = (effDist) => (ball.mass*10) / (effDist * effDist);

    // random velocity
    let velDir = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    let vel = Math.random() * 3;
    ball.vel = Vector2.multF(velDir, vel);
    
    return ball;
}

function createRandomBalls(n) {
    arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(createRandomBall());
        effectors.push(arr[i]);
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

function updateFrame() {
    let time = getTime();
    frameUpdateDeltaTime = (time - frameUpdateLastTime) / 1000;
    frameUpdateLastTime = time;

    // draw balls
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }

    // update debug window
    if (debug) {
        DebugWindow.innerHTML =
        "Sim FPS: " + Math.round(1 / DeltaTime, 2)
        + "<br>Frame FPS: " + Math.round(1 / frameUpdateDeltaTime, 2)
        + "<br>DeltaTime: " + DeltaTime
        + "<br>ScreenSize: " + ScreenSize.x + ", " + ScreenSize.y
        + "<br>MousePos: " + MouseEffector.pos.x + ", " + MouseEffector.pos.y
        + "<br>MouseStrength: " + MouseEffector.strength
        + "<br>BallCount: " + balls.length
        + "<br>EffectorCount: " + effectors.length
        + "<br>AVG Vel: " + Math.round(balls.reduce((acc, b) => acc + b.vel.len(), 0), 2) / balls.length
        ;
    }

    window.requestAnimationFrame(updateFrame);
}

function updatePhysics(){
    if (PageInFocus) {
        updateScreenSize();
        updateDeltaTime();

        // update balls
        for (let i = 0; i < balls.length; i++) {
            for (let j = 0; j < effectors.length; j++) {
                balls[i].applyEffector(effectors[j], DeltaTime);
            }
        }

        // apply physics
        for (let i = 0; i < balls.length; i++) {
            balls[i].applyPhysics(DeltaTime);
        }

        // apply velocity
        for (let i = 0; i < balls.length; i++) {
            balls[i].applyVelocity(DeltaTime);
        }
    }
}

function start() {
    balls = createRandomBalls(ballamnt);

    MouseEffector = new effector();
    MouseEffector.pos = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
    MouseEffector.strength = 1000;
    // effectors.push(MouseEffector);

    // effector2 = new effector();
    // effector2.pos = new Vector2(window.innerWidth / 2, window.innerHeight / 2);
    // effector2.strength = 500;
    // effectors.push(effector2);

    LastTime = getTime();
    setInterval(updatePhysics, 0);
    window.requestAnimationFrame(updateFrame);
    
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
