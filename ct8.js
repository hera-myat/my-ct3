let stars = [];
let shootingStars = []; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    for (let i = 0; i < 1000; i++) {
        stars.push(new Star(random(width), random(height), random(1, 3)));
    }

    const alienImage = document.querySelector('.alien-image');
    alienImage.addEventListener('click', triggerShootingStars);
}

function draw() {
    background(0); 
    
    for (let star of stars) {
        star.update();
        star.show();
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].update();
        shootingStars[i].show();

        if (shootingStars[i].x < 0 || shootingStars[i].x > width || shootingStars[i].y < 0 || shootingStars[i].y > height) {
            shootingStars.splice(i, 1);
        }
    }
}

function triggerShootingStars() {
    for (let i = 0; i < 5; i++) { 
        shootingStars.push(new ShootingStar(random(width), random(height), random(3, 6)));
    }
}

class Star {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.originalSize = size;
        this.brightness = random(100, 255); 
        this.alpha = 255; 
    }

    update() {
        let d = dist(mouseX, mouseY, this.x, this.y);
        
        if (d < 100) {
            this.brightness = map(d, 0, 100, 0, 255);  
            this.alpha = map(d, 0, 100, 255, 0);      
            this.size = map(d, 0, 100, this.originalSize * 2, this.originalSize); 
        } else {
            this.brightness = map(d, 100, 500, 100, 255); 
            this.alpha = 255; 
            this.size = this.originalSize; 
        }
    }

    show() {
        fill(this.brightness, this.brightness, this.brightness, this.alpha); 
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class ShootingStar {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = random(5, 10);
        this.alpha = 255;
    }

    update() {
        this.x += this.speed;
        this.y -= this.speed;

        this.alpha -= 5;
    }

    show() {
        stroke(255, this.alpha);
        strokeWeight(this.size);
        point(this.x, this.y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}