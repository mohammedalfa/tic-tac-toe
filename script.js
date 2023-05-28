const gameBoard = (function() {
  const _boardArray = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const getBoard = () => _boardArray;

  const placeSymbol = (symbol, index) => {
    if (_boardArray[index] !== "") return;
    _boardArray[index] = symbol
  }

  return {
    getBoard,
    placeSymbol,
  };
})();


function newPlayer(name, symbol) {
  const wins = 0;
  const getName = () => name;
  const getSymbol = () => symbol;
  const getWins = () => wins;
  const addWin = () => wins++;

  return {getName, getSymbol, getWins, addWin};
}

let player1 = newPlayer("1", "X");
let player2 = newPlayer("2", "O");

const gameController = (function(board, player1, player2) {
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;
  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  return {
    getCurrentPlayer,
    switchCurrentPlayer,
  };
})(gameBoard, player1, player2);


const displayController = (function() {
  

  return {

  };
})();