class ball {
    constructor(r, color) {
        // physics
        this.pos = new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        this.drag = 0.8;
        this.mass = 1;
        this.radius = r;

        // rendering
        this.element = document.createElement("div");
        this.element.style.position = "fixed";
        this.element.style.width = r * 2 + "px";
        this.element.style.height = r * 2 + "px";
        this.element.style.borderRadius = "50%";
        this.element.style.backgroundColor = color;
        this.element.style.left = "0px";
        this.element.style.top = "0px";

        BallWrapper.appendChild(this.element);
    }

    draw() {
        this.element.style.left = (this.pos.x - this.radius) + "px";
        this.element.style.top = (this.pos.y - this.radius) + "px";
    }

    applyEffector(eff) {
        let effDir = Vector2.sub(eff.pos, this.pos);
        let effDist = effDir.len();
        effDir.normalize();

        const clampAt = 10;
        if (effDist < clampAt) {
            effDist = clampAt;
        }

        // let force = Vector2.mult(effDir, new Vector2(eff.strength * effDist / 10000)); // spring
        let force = Vector2.mult(effDir, new Vector2(eff.strength / effDist)); // gravity
        this.vel.add(Vector2.mult(force, new Vector2(DeltaTime)));
    }

    applyPhysics() {
        // apply drag
        this.vel.mult(new Vector2(Math.pow(this.drag, DeltaTime)));

        // apply random force
        let rand = (new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1)).normalize();
        rand.mult(new Vector2(Math.random() * 0.01));
        this.vel.add(rand);

        // apply wall collision
        if (this.pos.x - this.radius < 0) {
            this.vel.x = Math.abs(this.vel.x);
        }
        if (this.pos.x + this.radius > ScreenSize.x) {
            this.vel.x = -Math.abs(this.vel.x);
        }
        if (this.pos.y - this.radius < 0) {
            this.vel.y = Math.abs(this.vel.y);
        }
        if (this.pos.y + this.radius > ScreenSize.y) {
            this.vel.y = -Math.abs(this.vel.y);
        }

        // clamp velocity
        let totalVel = this.vel.len();
        if (totalVel > maxVel) {
            this.vel.normalize();
            this.vel.mult(new Vector2(maxVel));
        }
    }

    applyVelocity() {
        this.pos = Vector2.add(this.pos, Vector2.mult(this.vel, new Vector2(1)));
    }
}