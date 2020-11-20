const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const playerDown = new Image();
playerDown.src = './images/character-down.png';
const playerUp = new Image();
playerUp.src = './images/character-up.png';
const playerLeft = new Image();
playerLeft.src = './images/character-left.png';
const playerRight = new Image();
playerRight.src = './images/character-right.png';

const treasure = new Image();
treasure.src = './images/treasure.png';
const width = canvas.width;
const height = canvas.height;

class Character {
    constructor(x, y) {
        this.col = x;
        this.row = y;
    }

    moveUp() {
        this.row -= 1;
    }
    moveRight() {
        this.col++;
    }
    moveDown() {
        this.row++;
    }
    moveLeft() {
        this.col--;
    }
}

class Treasure {
    constructor(x, y) {
        this.col = x;
        this.row = y;
    }
    setRandomPosition() {
        this.col = Math.floor(Math.random() * 10) + 1;
        this.row = Math.floor(Math.random() * 10) + 1;
    }
}

const character = new Character(5, 8);
const treasureObj = new Treasure(1, 1);
treasureObj.setRandomPosition();

//first time loading
playerDown.addEventListener('load', () => {
    drawPlayer(playerDown);
});
//first time loading
treasure.addEventListener('load', () => {
    drawTreasure();
});

function drawGrid() {
    // 10*10 grid ond 500*500canvas
    //-> grid sqare ->50*50
    console.log('grid');
    //draw vertical lines
    for (let i = 0; i <= width; i += 50) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, height);
        context.closePath();
        context.stroke();
    }

    //draw horizontal lines
    for (let i = 0; i <= height; i += 50) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(width, i);
        context.closePath();
        context.stroke();
    }
}

function drawPlayer(player) {
    //takes x value for columnd and y value for row -> not 0 indexed but starting at 1 through 10
    let x = character.col;
    let y = character.row;

    //updating
    context.drawImage(player, (x - 1) * 50, (y - 1) * 50, 50, 50);
}

function drawTreasure() {
    let x = treasureObj.col;
    let y = treasureObj.row;

    //updating
    context.drawImage(treasure, (x - 1) * 50, (y - 1) * 50, 50, 50);
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawEverything(p) {
    console.log('drawing');

    clear();
    drawGrid();
    drawPlayer(p);
    drawTreasure();
}

window.addEventListener('keydown', (event) => {
    // Stop the default behavior (moving the screen to the left/up/right/down)
    event.preventDefault();

    let player = playerDown;
    // React based on the key pressed
    switch (event.key) {
        case 'ArrowLeft':
            character.col--;
            player = playerLeft;
            break;
        case 'ArrowUp':
            character.row--;
            player = playerUp;
            break;
        case 'ArrowRight':
            character.col++;
            player = playerRight;
            break;
        case 'ArrowDown':
            character.row++;
            player = playerDown;
            break;
    }
    //console.log(character);
    if (character.col === treasureObj.col && character.row === treasureObj.row) {
        treasureObj.setRandomPosition();
    }

    //console.log(treasureObj.col, treasureObj.row);
    drawEverything(player);
});

drawEverything();