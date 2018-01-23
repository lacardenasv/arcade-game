var numRows = 6;
var numCols = 5;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var Position = function(x, y) {
    this.x = x;
    this.y = y;
}

var LiveObject = function(x,y) {
    this.sprite;
    this.position = new Position(x,y);
}

LiveObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x * 101, this.position.y *83);
}

var Enemy = function(y, velocity, sprite) {
    var initX = -1;
    LiveObject.call(this, initX, y);
    this.sprite = sprite;
    this.velocity = velocity;
};

Enemy.prototype = Object.create(LiveObject.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.position.x = this.position.x + this.velocity * dt;
    var middleX = Math.floor(numCols/2)
    // collision
    var xPosFloor = Math.floor(this.position.x);
    var xPosCeil = Math.ceil(this.position.x);
    var yPosFloor = Math.floor(this.position.y);
    var yPosCeil = Math.ceil(this.position.y);
    if(
        (xPosFloor === player.position.x || player.position.x===xPosCeil)
        && (yPosFloor === player.position.y || player.position.y === yPosCeil)
    ) {
        player.position.x = middleX;
        player.position.y = numRows - 1;
        player.update();
    }

    if(xPosFloor === numRows){
        var randomVel = getRandomInt(2,10);
        var randomY = getRandomInt(1, numRows - 1);
        this.position.x = -1;
        this.position.y = randomY;
        this.velocity = randomVel;
    }
    this.render();
};

var Player = function(x,y) {
    LiveObject.call(this, x, y);
    this.sprite = 'images/battleship.png';
}

Player.prototype = Object.create(LiveObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(action){
    // body...
    this.render();
    if (this.position.y == 0) {
        alert("Win!!!");
    }
};

Player.prototype.handleInput = function(action) {
    var position = this.position;
    switch (action) {
        case 'left':
            if (position.x > 0) {
                this.position.x -=1;
            } else {
                this.position.x = numCols;
            }
            break;
        case 'up':
            if (position.y > 0) {
                this.position.y -= 1;
            }
            break;
        case 'right':
            if (position.x < numCols - 1) {
                this.position.x += 1;
            } else {
                this.position.x = 0;
            }
            break;
        case 'down':
            if(position.y < numRows - 1) {
                this.position.y +=1;
            }
            break;
        default:
            console.log('invalid move');
            break;
    }
    this.update();
}

var numEnemies = 4;
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
    var sprite = 'images/shaded.png';
    var randomVel = getRandomInt(1, 10);
    var randomY = getRandomInt(1, numRows - 1);
    allEnemies.push(new Enemy(randomY, randomVel, sprite));
}

var player = new Player(2,5);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
});
