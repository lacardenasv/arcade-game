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
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    LiveObject.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(LiveObject.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log('move or shut');
    var random = Math.floor(Math.random() * 2);
    this.position.x = this.position.x + 1 * dt;
    this.render();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    LiveObject.call(this, x, y);
    this.sprite = 'images/char-horn-girl.png';
}

Player.prototype = Object.create(LiveObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(action){
    // body...
    this.render();
    //console.log('move, win, or die');
};

Player.prototype.handleInput = function(action) {
    var position = this.position;
    switch (action) {
        case 'left':
            if (position.x > 0) {
                this.position.x -=1;
            } else {
                this.position.x = 4;
            }
            break;
        case 'up':
            if (position.y > 0) {
                this.position.y -= 1;
            }
            break;
        case 'right':
            if (position.x < 4) {
                this.position.x += 1;
            } else {
                this.position.x = 0;
            }
            break;
        case 'down':
            if(position.y < 5) {
                this.position.y +=1;
            }
            break;
        default:
            console.log('invalid move');
            break;
    }
    this.update();
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable pe player
var allEnemies = [ new Enemy(0,0), new Enemy(2,3), new Enemy(2,4)]
var player = new Player(2,5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
