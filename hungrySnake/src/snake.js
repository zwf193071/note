export default class Snake {
    constructor() {
        this.data = [
            { x: 6, y: 2, color: "blue"},
            { x: 5, y: 2, color: "white"},
            { x: 4, y: 2, color: "white"},
            { x: 3, y: 2, color: "white"},
        ];
        this.direction = "right";
    }
    eatFood() {
        this.data.push(this.lastData);
    }
    move() {
        let i = this.data.length - 1;
        this.lastData = {
            x: this.data[i].x,
            y: this.data[i].y,
            color: this.data[i].color
        }
        for (i; i > 0; i--) {
            this.data[i].x = this.data[i-1].x;
            this.data[i].y = this.data[i-1].y;
        }
        switch(this.direction) {
            case "left":
                this.data[0].x--;
                break;
            case "right":
                this.data[0].x++;
                break;
            case "top":
                this.data[0].y--;
                break;
            case "bottom":
                this.data[0].y++;
                break;   
        }
    }
    changeDir(dir) {
        if (this.direction === "left" || this.direction === "right") {
            if (dir === "left" || dir === "right") return false;
            this.direction = dir;
        } else {
            if (dir === "top" || dir === "bottom") return false;
        }
        this.direction = dir;
        return true;
    }
}