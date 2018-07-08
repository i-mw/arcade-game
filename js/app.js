// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    let randomY = ((Math.ceil(Math.random() * 3)) * 83) - 20;
    this.x = -101;
    this.y = randomY;
    this.speed = (Math.random() * 350) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 505){
        Enemy.call(this);
    } else {
        this.x += this.speed * dt;
    }

    if(this.y === player.y && this.x + 101 >= player.x + 25 && this.x <= player.x + 76) {
        player.lose();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 395;
}

Player.prototype.update = function(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0) {this.update((this.x - 101), this.y)}
    else if (key === 'right' && this.x < 404) {this.update((this.x + 101), this.y)}
    else if (key === 'up' && this.y > -20 ) {this.update(this.x,(this.y - 83))}
    else if (key === 'down' && this.y < 395) {this.update(this.x,(this.y + 83))}
    
    if(this.y === -20) {this.win();}
}

Player.prototype.win = function() {
    this.update(202, 395);
}

Player.prototype.lose = function() {
    this.update(202, 395);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(), new Enemy(), new Enemy()];

let player = new Player();

//allEnemies.forEach(function(enemy){enemy.update(); enemy.render();});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
