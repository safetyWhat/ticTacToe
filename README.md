# ticTacToe
The Odin Project Tic Tac Toe Project

Start with the bones . . .

Create the game board. As an array inside a game board object.
Create the players in objects.
Create an object to control the flow of the game.

receive player, and selection row[column]
read current board to see if row and column intersect is available.
if so, place player token row[column]

place token via board[row][column]
refresh board

------------

What if . . .
Gameboard is an array[1,2,3...7,8,9]
As players make selections the numbers are placed in their own array.
If their array contains 3 numbers contained in the winning combinations, they win.

------------
How do I determine winner?
For/If Loop? It would have to loop through all possible combinations of a win after each turn. (8 combinations)
Player arrays? As each player takes their turn, their "cells" are logged into an array. After each turn the player arrays get searched
for winning combinations. If one is found that player gets recognized as the winner. Actually only have to search the array of the player that just took their turn.
Place function within playRound to search player array for winning combination.
Currently able to create ID for each button in DOM creation of board. Should be able to use that to log which squares are claimed by 
players. Once a player has a winning combination, they are declared.
Created array of winning arrays. Used a loop to check players claimed squares against winning arrays with an if statement to determine when a player has a winning set of parameters.

-----------
Now to determine a "cat's" game.
Another if statement? Once all squares are claimed.
*Used an if statement to see if on player had 5 squares without a winning scenario.

-----------
Stop play on win or tie. I was able to use an if statement to stop cycling the playRound function, but the board will still take button presses.

-----------
Add buttons to clear board and start over.
Add a way for players to enter their names. Done!
