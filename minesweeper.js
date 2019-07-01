document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, hidden: true },
    { row: 0, col: 1, isMine: false, hidden: true },
    { row: 0, col: 2, isMine: false, hidden: true },
    { row: 0, col: 3, isMine: false, hidden: true },

    { row: 1, col: 0, isMine: false, hidden: true },
    { row: 1, col: 1, isMine: false, hidden: false },
    { row: 1, col: 2, isMine: false, hidden: true },
    { row: 1, col: 3, isMine: false, hidden: true },

    { row: 2, col: 0, isMine: true, hidden: true },
    { row: 2, col: 1, isMine: false, hidden: true },
    { row: 2, col: 2, isMine: true, hidden: true },
    { row: 2, col: 3, isMine: false, hidden: true },

    { row: 3, col: 0, isMine: true, hidden: true },
    { row: 3, col: 1, isMine: false, hidden: true },
    { row: 3, col: 2, isMine: false, hidden: true },
    { row: 3, col: 3, isMine: false, hidden: true }
  ]
}

function startGame () {
  for (var i = 0; i < board.cells.length; i++) {
    var currentCell = board.cells[i]
    var surroundingMines = countSurroundingMines(currentCell)
    board.cells[i].surroundingMines = surroundingMines
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  document.addEventListener('click', function (event) {
    checkForWin()
  });
  document.addEventListener('contextmenu', function (event) {
    checkForWin()
  });
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

    if(currentCell.isMine === false && currentCell.hidden === true){
      return
    }
  }

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

