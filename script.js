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
    if (board[row][column] !== 1||2) {
      board[row][column].addToken(player);
    } else {
      alert('Space already taken.')
      return;
    }
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
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Placing ${getActivePlayer().name}'s token into row ${row}, column ${column}...`
    );
    board.setToken(row, column, getActivePlayer().token);
  switchPlayerTurn();
  printNewRound();
  };
  
  printNewRound();
  

  return {
    playRound,
    getActivePlayer, 
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

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render thew visual board 
    let cellNum = 1
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
    if (!selectedColumn) return;
    
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();