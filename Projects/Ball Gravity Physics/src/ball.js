class ball {
    constructor(r, color, wrapper) {
        // physics
        this.pos = new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        this.force = new Vector2(0, 0);
        this.drag = 0.5;
        this.mass = 5;
        this.radius = r;

        this.worldScale = 1;

        // rendering
        this.element = document.createElement("div");
        this.element.style.position = "fixed";
        this.element.style.width = r * 2 + "px";
        this.element.style.height = r * 2 + "px";
        this.element.style.borderRadius = "50%";
        this.element.style.backgroundColor = color;
        this.element.style.left = "0px";
        this.element.style.top = "0px";

        wrapper.appendChild(this.element);
    }

    draw() {
        this.element.style.left = (this.pos.x - this.radius) + "px";
        this.element.style.top = (this.pos.y - this.radius) + "px";
    }

    applyEffector(eff, DeltaTime) {
        let effDir = Vector2.sub(eff.pos, this.pos);
        let effDist = effDir.len() / this.worldScale;
        effDir.normalize();

        const clampAt = 10;
        if (effDist < clampAt) {
            effDist = clampAt;
        }

        this.force.add(Vector2.multF(effDir, eff.gravityFunc(effDist)));
    }

    applyPhysics(DeltaTime) {
        // drag
        this.force.add(Vector2.multF(this.vel, -Math.pow(this.drag, DeltaTime)));

        // random force
        // let rand = (new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1)).normalize();
        // rand.multF(Math.random() * 0.02);
        // this.force.add(rand);

        // wall collision
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
    }

    applyVelocity(DeltaTime) {
        // apply force
        this.vel.add(Vector2.multF(this.force, DeltaTime / this.mass));
        this.force = new Vector2(0, 0);

        // clamp velocity
        const maxVel = 100
        let totalVel = this.vel.len();
        if (totalVel > maxVel) {
            this.vel.normalize();
            this.vel.multF(maxVel);
        }

        // apply velocity and scale
        this.pos.add(Vector2.multF(this.vel, DeltaTime).multF(this.worldScale));
    }
}
