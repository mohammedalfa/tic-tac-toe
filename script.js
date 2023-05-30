const gameBoard = (function() {
  const _boardArray = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const getBoard = () => _boardArray;
  const clearBoard = () => {
    for (let i = 0; i < 9; i++) {
      _boardArray[i] = "";
    }
  };

  const placeSymbol = (index, symbol) => {
    if (_boardArray[index] !== "") return 1;
    _boardArray[index] = symbol
    return 0;
  };

  const printBoard = () => {
    let board = [];
    let count = 0;
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = _boardArray[count];
        count++;
      }
    }
    console.table(board);
  };

  return {
    getBoard,
    clearBoard,
    placeSymbol,
    printBoard,
  };
})();


function newPlayer(name, symbol) {
  let _wins = 0;
  const getName = () => name;
  const getSymbol = () => symbol;
  const getWins = () => _wins;
  const addWin = () => _wins++;

  return {getName, getSymbol, getWins, addWin};
}

let player1 = newPlayer("1", "X");
let player2 = newPlayer("2", "O");

const gameController = (function(board, player1, player2) {
  let _ties = 0;
  let _currentPlayer = player1;
  const _board = board.getBoard(); 

  const getPlayerOne = () => player1;
  const getPlayerTwo = () => player2;
  const getTies = () => _ties;
  const getCurrentPlayer = () => _currentPlayer;
  const switchCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === player1 ? player2 : player1;
  };

  const checkBoard = () => {
    let tie = true;
    let winner = false;

    // check for tie
    for (let i = 0; i < 9; i++) {
      if (_board[i] === "") {
        tie = false;
        break;
      }
    }
    if (tie) {
      _ties++;
      return "tie";
    }

    // check rows
    if (_board[0] === _board[1] && _board[0] === _board[2]) winner = _board[0];
    else if (_board[3] === _board[4] && _board[3] === _board[5]) winner = _board[3];
    else if (_board[6] === _board[7] && _board[6] === _board[8]) winner = _board[6];

    // check columns
    if (_board[0] === _board[3] && _board[0] === _board[6]) winner = _board[0];
    else if (_board[1] === _board[4] && _board[1] === _board[7]) winner = _board[1];
    else if (_board[2] === _board[5] && _board[2] === _board[8]) winner = _board[2];

    // check diagonals
    if (_board[0] === _board[4] && _board[0] === _board[8]) winner = _board[0];
    else if (_board[2] === _board[4] && _board[2] === _board[6]) winner = _board[2];

    if (winner === player1.getSymbol()) {
      player1.addWin();
    } else if (winner === player2.getSymbol()) {
      player2.addWin();
    }
    console.log(winner);
    return winner;
  };

  const printRound = () => {
    board.printBoard();
    console.log(`${_currentPlayer.getName()}'s turn`);
  }

  const playRound = (index) => {
    let status = checkBoard();
    if (status === "tie") {
      console.log("tie");
      return 3;
    } else if (status === player1.getSymbol()) {
      console.log(`${player1.getName()} won`);
      return 1;
    } else if (status === player2.getSymbol()) {
      console.log(`${player2.getName()} won`);
      return 2;
    }
    if (board.placeSymbol(index, _currentPlayer.getSymbol()) === 1) {
      console.log(`Cannot play at ${index}`);
      return 0;
    }
    switchCurrentPlayer();
    printRound();
    return 0;
  };

  const playGame = () => {
    printRound();
    let status;
    do {
      let move = prompt("Enter move: ");
      status = playRound(move);
    } while (status === 0);
  }

  return {
    getPlayerOne,
    getPlayerTwo,
    getTies,
    getCurrentPlayer,
    switchCurrentPlayer,
    checkBoard,
    printRound,
    playRound,
    playGame,
  };
})(gameBoard, player1, player2);


const displayController = (function(game, board, doc) {
  const _gameInfoDiv = doc.querySelector(".game-info");
  const _gameGridDiv = doc.querySelector(".grid");
  const _gameScoreDiv = doc.querySelector(".game-score");

  const _clickHandler = function(e) {
    game.playRound(e.target.id);
    updateDisplay();
  };

  const displayInfo = () => {
    _gameInfoDiv.textContent = `${game.getCurrentPlayer().getName()}'S TURN`;
  };
  
  const displayGrid = () => {
    _gameGridDiv.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      let tile = doc.createElement("div");
      tile.classList.add("tile");
      tile.id = i;
      tile.textContent = board.getBoard()[i];
      tile.addEventListener("click", _clickHandler);
      _gameGridDiv.appendChild(tile);
    }
  };

  const displayScore = () => {
    _gameScoreDiv.querySelector(".p1-win").textContent = 
      `${game.getPlayerOne().getSymbol()}: ${game.getPlayerOne().getWins()}`;
    _gameScoreDiv.querySelector(".tie").textContent = `TIE: ${game.getTies()}`;
    _gameScoreDiv.querySelector(".p2-win").textContent = 
      `${game.getPlayerTwo().getSymbol()}: ${game.getPlayerTwo().getWins()}`;
  };

  const updateDisplay = () => {
    displayInfo();
    displayGrid();
    displayScore();
  }

  return {
    displayInfo,
    displayGrid,
    displayScore,
    updateDisplay,
  };
})(gameController, gameBoard, document);

displayController.updateDisplay();