class effector {
    constructor() {
        this.pos = new Vector2(0, 0);
        this.strength = 200;
        this.gravityFunc = (effDist) => this.strength / effDist;
    }
}