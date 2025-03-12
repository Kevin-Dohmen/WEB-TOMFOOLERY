class Vector2 {
    constructor(x, y = null) {
        if (y == null) {
            y = x;
        }
        this.x = x;
        this.y = y;
    }

    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    
    static sub(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    static mult(v1, v2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    static div(v1, v2) {
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
    }

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