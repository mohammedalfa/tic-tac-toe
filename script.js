const gameBoard = (function() {
  const _boardArray = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const getBoard = () => _boardArray;
  const clearBoard = () => {
    for (let i = 0; i < _boardArray.length; i++) {
      _boardArray[i] = "";
    }
  };

  const placeSymbol = (index, symbol) => {
    if (_boardArray[index] !== "") return 0;
    _boardArray[index] = symbol
    return 1;
  };

  return {
    getBoard,
    placeSymbol,
    clearBoard,
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

  const getPlayerOne = () => player1;
  const getPlayerTwo = () => player2;
  const getTies = () => _ties;
  const getCurrentPlayer = () => _currentPlayer;
  const switchCurrentPlayer = () => {
    _currentPlayer = _currentPlayer === player1 ? player2 : player1;
  };

  const checkBoard = () => {
    let cBoard = board.getBoard();
    let tie = true;
    let winner = false;

    // check for tie
    for (let i = 0; i < cBoard.length; i++) {
      if (cBoard[i] === "") {
        tie = false;
        break;
      }
    }
    if (tie) {
      _ties++;
      return "tie";
    }

    // check rows
    if (cBoard[0] === cBoard[1] && cBoard[0] === cBoard[2]) winner = cBoard[0];
    if (cBoard[3] === cBoard[4] && cBoard[3] === cBoard[5]) winner = cBoard[3];
    if (cBoard[6] === cBoard[7] && cBoard[6] === cBoard[8]) winner = cBoard[6];

    // check columns
    if (cBoard[0] === cBoard[3] && cBoard[0] === cBoard[6]) winner = cBoard[0];
    if (cBoard[1] === cBoard[4] && cBoard[1] === cBoard[7]) winner = cBoard[1];
    if (cBoard[2] === cBoard[5] && cBoard[2] === cBoard[8]) winner = cBoard[2];

    // check diagonals
    if (cBoard[0] === cBoard[4] && cBoard[0] === cBoard[8]) winner = cBoard[0];
    if (cBoard[2] === cBoard[4] && cBoard[2] === cBoard[6]) winner = cBoard[2];

    if (winner === player1.getSymbol()) {
      player1.addWin();
    } else if (winner === player2.getSymbol()) {
      player2.addWin();
    }
    console.log(winner);
    return winner;
  };

  return {
    getPlayerOne,
    getPlayerTwo,
    getTies,
    getCurrentPlayer,
    switchCurrentPlayer,
    checkBoard,
  };
})(gameBoard, player1, player2);


const displayController = (function(game, board, doc) {
  const _gameInfoDiv = doc.querySelector(".game-info");
  const _gameGridDiv = doc.querySelector(".grid");
  const _gameScoreDiv = doc.querySelector(".game-score");
  
})(document);