let stars = [];
let shootingStars = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (let i = 0; i < 100; i++) {
        stars.push(new Star(random(width), random(height)));
    }
}

function draw() {
    background(0, 0, 0, 25);
    
    for (let star of stars) {
        star.show();
        star.update();
    }
    
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].show();
        
        if (shootingStars[i].isOffScreen()) {
            shootingStars.splice(i, 1);
        }
    }

    if (random() < 0.05) {
        shootingStars.push(new ShootingStar());
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(1, 3);
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }

    update() {
        this.x += random(-0.1, 0.1);
        this.y += random(-0.1, 0.1);
    }
}

class ShootingStar {
    constructor() {
        this.x = random(windowWidth);
        this.y = random(windowHeight); 
        this.length = random(40, 100);
        this.speed = random(5, 10);
        this.angle = random(PI / 6, PI / 3);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        line(this.x, this.y, this.x - this.length * cos(this.angle), this.y + this.length * sin(this.angle));
    }

    update() {
        this.x -= this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }

    isOffScreen() {
        return (this.x < 0 || this.y > height);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}