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