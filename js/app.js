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
    this.score = 0;
    this.lives = 3;
}

Player.prototype.update = function(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // resetBut.appendChild(Resources.get('images/restart.ico'));
    let heartImg = Resources.get('images/heart.png');
    livesEle.innerHTML = '';
    for(let i=0; i<this.lives; i++){
        livesEle.appendChild(heartImg.cloneNode());
    }
}

Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0) {this.update((this.x - 101), this.y)}
    else if (key === 'right' && this.x < 404) {this.update((this.x + 101), this.y)}
    else if (key === 'up' && this.y > -20 ) {this.update(this.x,(this.y - 83))}
    else if (key === 'down' && this.y < 395) {this.update(this.x,(this.y + 83))}
    
    if(this.y === -20) {this.win();}
}

Player.prototype.win = function() {
    this.score += 100;
    this.update(202, 395);
    updateDeck(this.lives, this.score);
}

Player.prototype.lose = function() {
    this.lives--;
    if(this.lives === 0){
        gameOver(this.score);
    }
    else{
        this.update(202, 395);
    }
}

function updateDeck(lives, score) {
    scoreEle.innerText = `score: ${score}`;
}

function gameOver(score) {
    document.querySelector('canvas').classList.add('hidden');
    deck.classList.add('hidden');

    let board = document.createElement('div');
    let restart = document.createElement('div');
    let results = document.createElement('div');

    board.id = 'board';
    board.appendChild(restart);
    board.insertAdjacentHTML('beforeend','<div></div>')
    board.appendChild(results);

    // restart.innerHTML = '<p>Game Over</p>';
    let restartIco = Resources.get('images/restart.ico').cloneNode();
    // let restartWords = document.createElement('p');
    // restartWords.innerText = 'Play Again';
    restart.appendChild(restartIco);
    // restart.appendChild(restartWords);
    
    let newScore = document.createElement('p');
    newScore.innerText = score;

    if(!window.localStorage) {
        results.innerHTML = '<p>Your Score:</p>';
        results.appendChild(newScore);
    }
    else {
        if(!window.localStorage.topScore || score > window.localStorage.topScore) {
            window.localStorage.topScore = score;
            results.innerHTML = '<p>New Top Score:</p>';
            results.appendChild(newScore);
        }
        else {
            results.innerHTML = '<p>Your Score:</p>';
            results.appendChild(newScore);
            results.insertAdjacentHTML('beforeend', '<p>Top Score:</p>');
            results.insertAdjacentHTML('beforeend','<p>'+window.localStorage.topScore+'</p>');
            // results.appendChild(document.createElement('p').appendChild(document.createTextNode(window.localStorage.topScore)));
        }
    }
    document.getElementById('container').appendChild(board);

    restartIco.addEventListener('click',resetCanvas);
    // debugger
}

function resetCanvas(){
    if(document.getElementById('board')){
        document.getElementById('board').remove()
    };
    player.score = 0;
    player.lives = 3;
    player.update(202, 395);
    updateDeck(player.lives, player.score);
    document.querySelector('canvas').classList.remove('hidden');
    deck.classList.remove('hidden');
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
