import Event from './event.js'
import Map from './map.js';
import Food from './food.js';
import Snake from './snake.js';

export default class Game extends Event{
    constructor(el, rect) {
        super();
        this.map = new Map(el, rect);
        this.food = new Food(this.map.cells, this.map.rows);
        this.snake = new Snake();   
        this.createFood()
        this.render();
        this.timer = 0;
        this.interval = 200;
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
            this.dispatch("win")
        } else {
            this.dispatch("over")
        }
        this.stop(); 
    }
    changeGrade() {
        this.dispatch("changeGrade", this.grade);
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
        this.dispatch("control");
        window.addEventListener("keydown", this.keyDown);
    }
    addControl(fn) {
        fn.call(this);
        window.removeEventListener("keydown", this.keyDown);
    }
}