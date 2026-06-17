let stars = [];
let earth;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    for (let i = 0; i < 200; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            z: random(width),
            size: random(2, 5),
        });
    }
}

function draw() {
    background(0);

    for (let star of stars) {
        fill(255);
        let sx = map(star.x / star.z, 0, 1, 0, width);
        let sy = map(star.y / star.z, 0, 1, 0, height);
        let r = map(star.z, 0, width, 5, 0);
        circle(sx, sy, star.size);

        star.z -= 5;
        if (star.z < 1) {
            star.z = width;
            star.x = random(width);
            star.y = random(height);
        }
    }

    if (mouseIsPressed) {
        drawCosmicElement(mouseX, mouseY);
        popStar(mouseX, mouseY); 
    }
}

function drawCosmicElement(x, y) {
    let brushSize = map(mouseX, 0, width, 10, 50); 
    let colorIntensity = map(mouseY, 0, height, 100, 255);
    fill(random(150, 255), random(100, colorIntensity), 255, 150);
    ellipse(x, y, brushSize);

    for (let i = 0; i < 5; i++) {
        let sparkleX = x + random(-brushSize / 2, brushSize / 2);
        let sparkleY = y + random(-brushSize / 2, brushSize / 2);
        fill(255, random(150, 255), 255, 200);
        ellipse(sparkleX, sparkleY, random(2, 5));
    }
}

function popStar(x, y) {
    let star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x - 20}px`; 
    star.style.top = `${y - 20}px`;   
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 600); 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function goBack() {
    window.history.back(); 
}