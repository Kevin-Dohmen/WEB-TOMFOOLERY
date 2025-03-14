class Vector2 {
    constructor(x, y = null) {
        if (y == null) {
            y = x;
        }
        this.x = x;
        this.y = y;
    }

    static add(v1, v2)  { return new Vector2(v1.x + v2.x, v1.y + v2.y); }
    static sub(v1, v2)  { return new Vector2(v1.x - v2.x, v1.y - v2.y); }
    static mult(v1, v2) { return new Vector2(v1.x * v2.x, v1.y * v2.y); }
    static div(v1, v2)  { return new Vector2(v1.x / v2.x, v1.y / v2.y); }

    static addF(v, f) { return new Vector2(v.x + f, v.y + f); }
    static subF(v, f) { return new Vector2(v.x - f, v.y - f); }
    static multF(v, f) { return new Vector2(v.x * f, v.y * f); }
    static divF(v, f) { return new Vector2(v.x / f, v.y / f); }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    mult(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    div(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    addF(f) {
        this.x += f;
        this.y += f;
        return this;
    }
    subF(f) {
        this.x -= f;
        this.y -= f;
        return this;
    }
    multF(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    divF(f) {
        this.x /= f;
        this.y /= f;
        return this;
    }



    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let l = this.len();
        if (l == 0) {
            return this;
        }
        this.x /= l;
        this.y /= l;
        return this;
    }

}