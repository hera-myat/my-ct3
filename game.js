const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let score = 0;
let ufo;
let spacecrafts = [];
let gameInterval;
let alienSpeed = 2; 
let ufoSpeed = 5;
let gameOver = false;
let isPaused = false;

const pauseButton = document.getElementById("pauseButton");
const continueButton = document.getElementById("continueButton");

const ufoImg = new Image();
ufoImg.src = 'media/ufo.png';
const spacecraftImg = new Image();
spacecraftImg.src = 'media/spacecraft.png'; 

class UFO {
  constructor() {
    this.x = canvas.width / 2 - 25;
    this.y = canvas.height - 50;
    this.width = 50;
    this.height = 50;
    this.speed = ufoSpeed;
  }

  move(left, right) {
    if (left && this.x > 0) {
      this.x -= this.speed;
    }
    if (right && this.x < canvas.width - this.width) {
      this.x += this.speed;
    }
  }

  draw() {
    ctx.drawImage(ufoImg, this.x, this.y, this.width, this.height);
  }
}

class Spacecraft {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
  }

  update() {
    this.y += alienSpeed;
  }

  draw() {
    ctx.drawImage(spacecraftImg, this.x, this.y, this.width, this.height);
  }
}

function createSpacecraft() {
  const x = Math.random() * (canvas.width - 40);
  spacecrafts.push(new Spacecraft(x, 0));
}

function drawGame() {
  if (isPaused || gameOver) return; 

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ufo.draw();

  spacecrafts.forEach((spacecraft, index) => {
    spacecraft.update();
    spacecraft.draw();

    if (
      spacecraft.x < ufo.x + ufo.width &&
      spacecraft.x + spacecraft.width > ufo.x &&
      spacecraft.y < ufo.y + ufo.height &&
      spacecraft.y + spacecraft.height > ufo.y
    ) {
      endGame(); 
      return;
    }

    if (spacecraft.y > canvas.height) {
      spacecrafts.splice(index, 1);
      score++; 

      if (score === 10) {
        alienSpeed += 2; 
      }
    }
  });

  document.getElementById("score").textContent = score;
}

function endGame() {
  clearInterval(gameInterval); 
  gameOver = true;
  drawGameOverScreen();
}

function drawGameOverScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.font = "48px 'Press Start 2P', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

  ctx.fillStyle = "white";
  ctx.font = "24px 'Press Start 2P', sans-serif";
  ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 20);

  ctx.fillStyle = "yellow";
  ctx.font = "16px 'Press Start 2P', sans-serif";
  ctx.fillText("PRESS R TO RESTART", canvas.width / 2, canvas.height / 2 + 60);
}

function startGame() {
  ufo = new UFO();
  spacecrafts = [];
  score = 0;
  alienSpeed = 2; 
  gameOver = false;
  isPaused = false;
  document.getElementById("score").textContent = score;

  pauseButton.disabled = false;
  continueButton.disabled = true;

  setInterval(createSpacecraft, 2000);

  gameInterval = setInterval(() => {
    if (!isPaused && !gameOver) {
      moveUFO();
      drawGame();
    }
  }, 1000 / 60); 
}

let left = false;
let right = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    left = true;
  }
  if (e.key === "ArrowRight") {
    right = true;
  }
  if (e.key === "r" || e.key === "R") {
    if (gameOver) {
      startGame(); 
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    left = false;
  }
  if (e.key === "ArrowRight") {
    right = false;
  }
});

pauseButton.addEventListener("click", () => {
  isPaused = true;
  pauseButton.disabled = true;
  continueButton.disabled = false;
});

continueButton.addEventListener("click", () => {
  isPaused = false;
  pauseButton.disabled = false;
  continueButton.disabled = true;
});

function moveUFO() {
  ufo.move(left, right);
}

startGame();

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
  history.back(); 
});