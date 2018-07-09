/*
*
*Enemy Constructor and Prototype
*
*/
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;    
    let randomY = ((Math.ceil(Math.random() * 3)) * 83) - 20;
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


/*
*
*Player Constructor and Prototype
*
*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 395;
    this.score = 0;
    this.lives = 3;
}

//update the player position.
//parameters: x and y are of the new position
Player.prototype.update = function(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
}

//Draw the player and lives on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    let heartImg = Resources.get('images/heart.png');
    livesEle.innerHTML = '';
    for(let i=0; i<this.lives; i++){
        livesEle.appendChild(heartImg.cloneNode());
    }
}

//receives input from event listener and redirects the input
//to update the position or reject to update
//or announce a win
Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0) {this.update((this.x - 101), this.y)}
    else if (key === 'right' && this.x < 404) {this.update((this.x + 101), this.y)}
    else if (key === 'up' && this.y > -20 ) {this.update(this.x,(this.y - 83))}
    else if (key === 'down' && this.y < 395) {this.update(this.x,(this.y + 83))}
    //call the win function
    if(this.y === -20) {this.win();}
}

//called once by handleInput().. the player reached water and its a win
Player.prototype.win = function() {
    this.score += 100;
    this.update(202, 395);
    updateUpperDeck(this.lives, this.score);
}

//called by enemy objects update method
//refers to a collision between the player and one of the enemies
Player.prototype.lose = function() {
    this.lives--;
    if(this.lives === 0){
        gameOver(this.score);
    }
    else{
        this.update(202, 395);
    }
}

//update the score at the upper deck to match
//score variable
function updateUpperDeck(lives, score) {
    scoreEle.innerText = `score: ${score}`;
}

//called by the lose() method when the player consumes all lives
function gameOver(score) {
    //remove canvas and upper deck
    document.querySelector('canvas').classList.add('hidden');
    upperDeck.classList.add('hidden');

    //build game over board 
    let gameOverBoard = document.createElement('div');
    let restart = document.createElement('div');
    let results = document.createElement('div');

    gameOverBoard.id = 'game-over-board';
    gameOverBoard.appendChild(restart);
    gameOverBoard.insertAdjacentHTML('beforeend','<div></div>')
    gameOverBoard.appendChild(results);

    let restartIco = Resources.get('images/restart.ico').cloneNode();
    restart.appendChild(restartIco);
    
    let newScore = document.createElement('p');
    newScore.innerText = score;

    //check if local storage supported or not
    //local storage not support - old browser -
    if(!window.localStorage) {
        results.innerHTML = '<p>Your Score:</p>';
        results.appendChild(newScore);
    }
    //local storage supported
    else {
        //new top score
        if(!window.localStorage.topScore || score > window.localStorage.topScore) {
            window.localStorage.topScore = score;
            results.innerHTML = '<p>New Top Score:</p>';
            results.appendChild(newScore);
        }
        //score
        else {
            results.innerHTML = '<p>Your Score:</p>';
            results.appendChild(newScore);
            results.insertAdjacentHTML('beforeend', '<p>Top Score:</p>');
            results.insertAdjacentHTML('beforeend','<p>'+window.localStorage.topScore+'</p>');
        }
    }
    document.getElementById('container').appendChild(gameOverBoard);

    //listen for reset
    restartIco.addEventListener('click',resetCanvas);
}

//reset the game
//called by event listeners at the upper deck and at the game over board
function resetCanvas(){
    if(document.getElementById('game-over-board')){
        document.getElementById('game-over-board').remove()
    };
    player.score = 0;
    player.lives = 3;
    player.update(202, 395);
    updateUpperDeck(player.lives, player.score);
    document.querySelector('canvas').classList.remove('hidden');
    upperDeck.classList.remove('hidden');
    init();
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
