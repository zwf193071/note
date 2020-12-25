class Map {
    constructor(el, rect) {
        this.el = el;
        this.rect = rect;
        this.data = [];
        this.rows = Math.ceil(Map.getStyle(this.el, "height") / rect);
        this.cells = Math.ceil(Map.getStyle(this.el, "width") / rect);
        Map.setStyle(this.el, "width", this.cells * rect);
        Map.setStyle(this.el, "height", this.rows * rect);
    }
    static getStyle(el, attr) {
        return parseFloat(getComputedStyle(el)[attr]);
    }
    static setStyle(el, attr, val) {
        el.style[attr] = val + "px";
    }
    setData(newData) {
        this.data = this.data.concat(newData);
    }
    clearData() {
        this.data.length = 0;
    }
    include(newData) {
        return this.data.find(item => (item.x == newData.x && item.y == newData.y));
    }
    render() {
        this.el.innerHTML = this.data.map(item => {
            return `<span style="position:absolute;left:${item.x * this.rect}px;top:${item.y * this.rect}px;width:${this.rect}px;height:${this.rect}px;background:${item.color};"></span>`
        }).join("");
    }
}
class Food {
    constructor(cells = 10, rows = 10, colors = ["red", "blue", "yellow", "pink"]) {
        this.cells = cells;
        this.rows = rows;
        this.colors = colors;
        this.data = null;
        this.create();
    }
    create() {
        let x = Math.floor(Math.random() * this.cells);
        let y = Math.floor(Math.random() * this.rows);
        let color = this.colors[parseInt(Math.random() * this.colors.length)];
        this.data = {x, y, color}
    }
}
class Snake {
    constructor(map) {
        this.data = [
            { x: 6, y: 2, color: "blue"},
            { x: 5, y: 2, color: "white"},
            { x: 4, y: 2, color: "white"},
            { x: 3, y: 2, color: "white"},
        ];
        this.map = map;
        this.direction = "right";
        this.map.setData(this.data);
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
class Game {
    constructor(el, rect, toControl = null, toGrade=null, toOver=null) {
        this.map = new Map(map, rect);
        this.food = new Food(this.map.cells, this.map.rows);
        this.snake = new Snake(this.map);   
        this.createFood()
        this.render();
        this.timer = 0;
        this.interval = 200;
        this.toControl = toControl;
        this.toGrade = toGrade;
        this.toOver = toOver;
        this.keyDown = this.keyDown.bind(this);
        this.grade = 0;
        this.control();
    }
    // 向地图渲染数据
    render() {
        this.map.clearData();
        this.map.setData(this.snake.data);
        this.map.setData(this.food.data);
        this.map.render();
    }
    createFood() {
        this.food.create();
        if (this.map.include(this.food.data)) {
            this.createFood();
        }
    }
    start() {
        this.move();
    }
    stop() {
        clearInterval(this.timer);
    }
    move() {
        this.stop();
        this.timer = setInterval(() => {
            this.snake.move();
            if (this.isEat()) {
                this.grade++;
                this.snake.eatFood();
                this.food.create();
                this.changeGrade();
                this.interval *= .9;
                this.stop();
                this.start();
                if (this.grade >= 3) {
                    this.over(1)
                }
            }
            if (this.isOver()) {
                this.over();
                return;
            }
            this.render();
        }, this.interval);
    }
    isEat() {
        return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y
    }
    isOver() {
        if (this.snake.data[0].x < 0
        || this.snake.data[0].x > this.map.cells
        || this.snake.data[0].y < 0
        || this.snake.data[0].y > this.map.rows) {
            return true;
        }
        for (let i = 1; i < this.snake.data.length; i++) {
            if (this.snake.data[0].x == this.snake.data[i].x && this.snake.data[0].y == this.snake.data[i].y) {
                return true;
            }
        }
        return false;
    }
    over(status) {
        if (status) {
            this.toWin() && this.toOver();
        } else {
            this.toOver && this.toOver();
        }
        this.stop(); 
    }
    changeGrade() {
        this.toGrade && this.toGrade(this.grade);
    }
    keyDown({keyCode}) {
        let isDir;
        switch(keyCode) {
            case 37:
                isDir = this.snake.changeDir("left");
                break;
            case 38:
                isDir = this.snake.changeDir("top");
                break;
            case 39:
                isDir = this.snake.changeDir("right");
                break;
            case 40:
                isDir = this.snake.changeDir("bottom");
                break;  
        }
    }
    control() {
        if (this.toControl) {
            this.toControl();
            return;
        }
        window.addEventListener("keydown", this.keyDown);
    }
    addControl(fn) {
        fn.call(this);
        window.removeEventListener("keydown", this.keyDown);
    }
}

{
    let el = document.querySelector("#map");
    let game = new Game(el, 10);
    // w 87
    // d 68
    // s 83
    // a 65
    game.addControl(function(){
        window.addEventListener("keydown", ({keyCode}) => {
            switch(keyCode) {
                case 37:
                    this.snake.changeDir("left");
                    break;
                case 38:
                    this.snake.changeDir("top");
                    break;
                case 39:
                    this.snake.changeDir("right");
                    break;
                case 40:
                    this.snake.changeDir("bottom");
                    break;  
            }
        });
    })
    game.toGrade = function(grade) {
        document.querySelector("#score").innerHTML = grade;
    }
    game.toOver = function() {
        alert("游戏结束");
    }
    game.toWin = function() {
        alert("太棒啦，您完成了游戏");
    }
    document.onclick = function() {
        game.start();
    }
}