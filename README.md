frontend-nanodegree-arcade-game
===============================

![the game](images/screenshot.png)

Classic Arcade Game is part of Udacity front-end nanodegree projects which brings focus on object oriented programming and its practices.

Play the game live here: https://i-mw.github.io/arcade-game

## Table of Contents

* [How to play/run](#how-to-playrun)
* [Hot to run locally](#how-to-run-locally)
* [Game Logic](#game-logic)
* [Code Dependencies](#code-dependencies)
* [Contributing](contributing)

## How to play/run
The game/code execution is triggered by keyboard arrow clicks.

## How to run locally
To run this code locally, download the whole repository code using the `Download` button above.
Or clone it using command line interface:
```
git clone https://github.com/i-mw/arcade-game.git
```

## Game Logic
* The player starts with 3 lives and 0 score
* Game win logic: the player crosses all the bugs untouched and reaches water. That adds 100 points to the player score
* Game lose logic: when the player is hit by one of the bugs. That deduct one life from him. If the player has more lives, he is reset to his start positions. If the player has no more lives -lives = 0- game ends and the player is shown his final score.

## Code Dependencies
The game depends on no outer libraries.

## Contributing
As this project is part of a program and meant only for personal improvement, Its not open for contribution. But you can refer to a feature or a bug in Issues section.