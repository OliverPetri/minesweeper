document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

function startGame () {
  generateBoard()
  for (var i = 0; i < board.cells.length; i++) {
    var currentCell = board.cells[i]
    var surroundingMines = countSurroundingMines(currentCell)
    board.cells[i].surroundingMines = surroundingMines
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  document.addEventListener('click', function (event) {
    var audio = new Audio('sounds/select.wav');
    audio.play();
    checkForWin()
  });
  document.addEventListener('contextmenu', function (event) {
    var audio = new Audio('sounds/select.wav');
    audio.play();
    checkForWin()
  });

  document.getElementById('reset-button').addEventListener('click', function (event) {
    resetBoard()
  });
}

// Generates the cells of a 6x6 board
// Uses a nested for loop to create the cells. A random number is generated to determine if the cell is a mine
// All cells begin hidden
function generateBoard () {
  var boardSize = 6
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      var randomNumber = Math.random() * 10;
      var isMine = false
      if (randomNumber < 3)
        isMine = true
      var cell = { row: i, col: j, hidden: true, isMine: isMine }
      board.cells.push(cell)
    }
  }

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  for (var i = 0; i < board.cells.length; i++) {
    var currentCell = board.cells[i]
    // if the current cell is mine, check if it th market property exists and is not false
    if (currentCell.isMine === true && !currentCell.isMarked) {
      return
    }

    if (currentCell.isMine === false && currentCell.hidden === true) {
      return
    }
  }

  var audio = new Audio('sounds/applause.wav');
  audio.play();
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var surroundingCount = 0
  for (var i = 0; i < surrounding.length; i++) {
    var currentCell = surrounding[i]
    if (currentCell.isMine === true) {
      surroundingCount++
    }
  }

  return surroundingCount
}

// Reset the board
// Delete all child elements from the board element, after, hide and unmark all cells and finally call initboard
function resetBoard () {
  var boardNode = document.getElementsByClassName('board')[0]
  while (boardNode.hasChildNodes()) {
    boardNode.removeChild(boardNode.lastChild);
  }
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].isMarked = false
    board.cells[i].hidden = true
  }
  lib.initBoard()
}

