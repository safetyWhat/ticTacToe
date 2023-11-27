function Gameboard () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    };
  };  
  const getBoard = () => board;

  const setToken = (row, column, player) => {
    board[row][column].addToken(player);
  };
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  return { getBoard, setToken, printBoard };
}


function Cell() {
  let value = 0;
  const addToken = (player) => {
    value = player;
  };
  const getValue = () => value;
  return {
    addToken,
    getValue
  };
}

function GameController (
  playerOneName = prompt('Player 1 please enter your name.', 'Player One'),
  playerTwoName = prompt('Player 2, your name?', 'Player Two')
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1,
      score: []
    },
    {
      name: playerTwoName,
      token: 2,
      score: []
    }
  ];

  let activePlayer = players[0];
  let winner = '';
  let winResult = false

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const takeScore = (square) => { //Adds number to player array to represent selected square, then looks for winning combination.
    const score = activePlayer.score
    const winNum = [ //Winning combinations of squares
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
      ['1', '5', '9'],
      ['3', '5', '7'] 
    ]
    score.push(square);
    console.log(score);
    
    for(let i = 0; i < winNum.length; i++) { //Searches player score arrays for winning combinations or 5 numbers to give a tie
      winResult = winNum[i].every(num => score.includes(num));
      console.log(winResult);
      if (winResult === true) {
        winner = `${activePlayer.name} wins!`;
        return;
      } else if ((winResult === false)&&(score.length > 4)) {
        winner = 'Tie game!'
      }
    }
  }
  const getWinner = () => winner;

  const playRound = (row, column, square) => {
    console.log(
      `Placing ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
    );
    board.setToken(row, column, getActivePlayer().token);
    takeScore(square);
    
    if (winner !== '') { //If game has ended, stops GameController
      return;
    }
    switchPlayerTurn();
    printNewRound();
    };


  printNewRound();
  
  return {
    playRound,
    getActivePlayer, 
    getWinner,
    getBoard: board.getBoard
  };
}



function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const updateScreen = () => {
    boardDiv.textContent = "";// clear the board

    const board = game.getBoard(); // get the newest version of the board and player turn
    const activePlayer = game.getActivePlayer();
    const winner = game.getWinner();
    console.log(winner);
    if(winner === '') {
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
      } else {
        playerTurnDiv.textContent = winner;
      };

    // Render the visual board 
    let cellNum = 1 //This to provide individual number for id on each button
    board.forEach((row,rowIndex) => { 
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex; 
        cellButton.dataset.column = colIndex;
        cellButton.setAttribute('id',`${cellNum}`);
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
        cellNum++;
      })
    })
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row
    const selectedColumn = e.target.dataset.column;
    const selectedSquare = e.target.id;
    const selectedValue = e.target.textContent;
    if (!selectedColumn) return;
    console.log(selectedValue);
    if (selectedValue !== '0') return;
    game.playRound(selectedRow, selectedColumn, selectedSquare);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
}

ScreenController();