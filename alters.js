let stars = [];
let projectiles = []; 

class Star {
    constructor(x, y, speed, size) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
    }

    update() {
        this.y += this.speed; 
        if (this.y > height) {
            this.y = 0; 
        }
    }

    display() {
        noStroke();
        fill(255, 255, 255, 150); 
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class Projectile {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.radius = 10;
    }

    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }

    display() {
        fill(255, 0, 0); 
        ellipse(this.x, this.y, this.radius * 2);
    }
}

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragEndX = 0;
let dragEndY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight); 

    for (let i = 0; i < 200; i++) {
        let star = new Star(random(width), random(height), random(1, 3), random(1, 3));
        stars.push(star);
    }
}

function draw() {
    background(0); 

    for (let star of stars) {
        star.update();
        star.display();
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        projectiles[i].update();
        projectiles[i].display();

        if (projectiles[i].x < 0 || projectiles[i].x > width || projectiles[i].y < 0 || projectiles[i].y > height) {
            projectiles.splice(i, 1); 
        }
    }

    if (isDragging) {
        stroke(255, 0, 0); 
        line(dragStartX, dragStartY, dragEndX, dragEndY); 
    }
}

function mousePressed() {
    isDragging = true;
    dragStartX = mouseX;
    dragStartY = mouseY;
}

function mouseReleased() {
    isDragging = false;

    let angle = atan2(dragEndY - dragStartY, dragEndX - dragStartX);
    let speed = dist(dragStartX, dragStartY, dragEndX, dragEndY) / 10;

    projectiles.push(new Projectile(dragStartX, dragStartY, angle, speed));
}

function mouseDragged() {
    dragEndX = mouseX;
    dragEndY = mouseY;
}