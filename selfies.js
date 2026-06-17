let stars = [];
let shootingStars = [];
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, max(windowHeight, document.body.scrollHeight));
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); 
    canvas.style('position', 'fixed'); 
    
    for (let i = 0; i < 300; i++) {
        stars.push(new Star());
    }
    
    const images = document.querySelectorAll('.selfies-grid img');
    images.forEach(image => {
        image.addEventListener('click', () => {
            shootingStars.push(new ShootingStar());
        });
    });
}

function draw() {
    background(0, 0, 20); 

    for (let star of stars) {
        star.update();
        star.show();
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let shootingStar = shootingStars[i];
        shootingStar.update();
        shootingStar.show();

        if (shootingStar.isOffScreen()) {
            shootingStars.splice(i, 1);
        }
    }
}

class Star {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.z = random(width); 
        this.pz = this.z; 
    }

    update() {
        this.z -= 10; 

        if (this.z < 1) {
            this.z = width; 
            this.x = random(width); 
            this.y = random(height); 
            this.pz = this.z;
        }
    }

    show() {
        fill(255); 
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);

        let r = map(this.z, 0, width, 8, 0);
        ellipse(sx, sy, r, r);

        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        stroke(255);
        line(px, py, sx, sy);
    }
}

class ShootingStar {
    constructor() {
        this.x = random(width);
        this.y = random(height / 2); 
        this.length = random(50, 150);
        this.speed = random(15, 30);
        this.alpha = 255; 
        this.angle = random(PI / 4, 3 * PI / 4); 
    }

    update() {
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        this.alpha -= 5; 

        if (this.alpha <= 0) {
            this.alpha = 255;
            this.x = random(width);
            this.y = random(height / 2);
        }
    }

    show() {
        stroke(255, this.alpha);
        strokeWeight(2);
        line(this.x, this.y, this.x - this.length * cos(this.angle), this.y - this.length * sin(this.angle));
    }

    isOffScreen() {
        return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, max(windowHeight, document.body.scrollHeight));
}