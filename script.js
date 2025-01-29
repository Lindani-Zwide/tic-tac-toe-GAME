// Get all cells
const cells = document.querySelectorAll('.cell');

// Get game mode selector
const gameModeSelector = document.querySelector('.game-mode-selector');
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');

// Get players
const playersElement = document.getElementById('players');

// Get winner announcement
const winnerAnnouncement = document.querySelector('.winner-announcement');
const winnerText = document.getElementById('winner-text');

// Get reset game button
const resetGameButton = document.getElementById('reset-game');

// Game variables
let currentPlayer = 'X';
let gameMode = 'computer';
let gameOver = false;
let your_score = 0;
let opponent_score = 0;
let isDropDownOpen = false;
let winningCells = [];
// Function to handle cell click
function handleCellClick(event) {
  if (gameOver) return;
  const cell = event.target;
  if (cell.innerHTML !== '') return;
  cell.style.pointerEvents = 'none'; // Disable pointer events
  cell.innerHTML = `<img src="Assets/${currentPlayer}.png" alt="${currentPlayer}-icon" height="50" width="50">`;
  if (checkWin()) {
    winningCells = getWinningCells();
    highlightWinningCells();
    updateScores();
    winnerText.textContent = `Player ${currentPlayer} wins!`;
    winnerAnnouncement.style.display = 'flex';
    gameOver = true;
    disableCells();
  } else if (checkDraw()) {
    winnerText.textContent =   `t\'s a draw!`;
    winnerAnnouncement.style.display = 'flex';
    gameOver = true;
    disableCells();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  if (gameMode === 'computer' && !gameOver) {
    setTimeout(computerMove, 1000);
  }
}

// Function to check win
function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const condition of winConditions) {
    if (
      cells[condition[0]].innerHTML !== '' &&
      cells[condition[0]].innerHTML === cells[condition[1]].innerHTML &&
      cells[condition[0]].innerHTML === cells[condition[2]].innerHTML
    ) {
      return true;
    }
  }
  return false;
}

// Function to get winning cells
function getWinningCells() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const condition of winConditions) {
    if (
      cells[condition[0]].innerHTML !== '' &&
      cells[condition[0]].innerHTML === cells[condition[1]].innerHTML &&
      cells[condition[0]].innerHTML === cells[condition[2]].innerHTML
    ) {
      return condition;
    }
  }
  return [];
}

// Function to highlight winning cells
function highlightWinningCells() {
  winningCells.forEach((index) => {
    cells[index].style.backgroundColor = 'green';
  });
}

// Function to update scores
function updateScores() {
  if (currentPlayer === 'X') {
    your_score = 1;
    opponent_score = 0;
  } else {
    your_score = 0;
    opponent_score = 1;
  }
  playersElement.innerHTML = `<span>${your_score}</span>-You VS ${gameMode}-<span>${opponent_score}</span>`;
}

// Function to check draw
function checkDraw() {
  for (const cell of cells) {
    if (cell.innerHTML === '') return false;
  }
  return true;
}

// Function to disable cells
function disableCells() {
  cells.forEach((cell) => {
    cell.style.pointerEvents = 'none';
  });
}

// Function to enable cells
function enableCells() {
  cells.forEach((cell) => {
    cell.style.pointerEvents = 'auto';
  });
}

// Function to handle computer move
function computerMove() {
const emptyCells = Array.from(cells).filter((cell) => cell.innerHTML === '');
const bestMove = getBestMove(emptyCells);
bestMove.innerHTML = `<img src="Assets/O.png" alt="O-icon" height="50" width="50">`;
if (checkWin()) {
winningCells = getWinningCells();
highlightWinningCells();
updateScores();
winnerText.textContent = 'Computer wins!';
winnerAnnouncement.style.display = 'flex';
gameOver = true;
disableCells();
} else if (checkDraw()) {
winnerText.textContent = `It's a draw!`;
winnerAnnouncement.style.display = 'flex';
gameOver = true;
disableCells();
} else {
currentPlayer = 'X';
}
}

// Function to get best move
function getBestMove(emptyCells) {
const corners = emptyCells.filter((cell) => {
const index = Array.from(cells).indexOf(cell);
return [0, 2, 6, 8].includes(index);
});
if (corners.length > 0) {
return corners[0];
}
const center = emptyCells.find((cell) => {
const index = Array.from(cells).indexOf(cell);
return index === 4;
});
if (center) {
return center;
}
return emptyCells[0];
}

// Add event listeners to cells
cells.forEach((cell) => {
cell.addEventListener('click', handleCellClick);
});

// Add event listener to game mode selector
dropdownButton.addEventListener('click', toggleDropDown);

// Add event listeners to game mode options
document.querySelectorAll('.option').forEach((option) => {
option.addEventListener('click', () => {
gameMode = option.id;
playersElement.innerHTML = `<span>${your_score}</span>-You VS ${gameMode}-<span>${opponent_score}</span>`;
dropdownContent.classList.toggle('show');
toggleDropDown();
resetGame();
});
});

// Add event listener to reset game button
resetGameButton.addEventListener('click', resetGame);

// Function to reset game
function resetGame() {
dropdownButton.innerHTML=`SELECT OPPONENT &#11207`;
your_score = 0;
opponent_score = 0;
playersElement.innerHTML = `<span>${your_score}</span>-You VS ${gameMode}-<span>${opponent_score}</span>`;
cells.forEach((cell) => {
cell.innerHTML = '';
cell.style.backgroundColor = '';
});
winnerAnnouncement.style.display = 'none';
gameOver = false;
currentPlayer = 'X';
enableCells();
dropdownContent.classList.toggle('show');
}

// Function to toggle dropdown
function toggleDropDown() {
if (!isDropDownOpen) {
dropdownButton.innerHTML = `SELECT OPPONENT &#11206`;
isDropDownOpen = true;
} else {
dropdownButton.innerHTML = `SELECT OPPONENT &#11207`;
isDropDownOpen = false;
}
dropdownContent.classList.toggle('show');
}
