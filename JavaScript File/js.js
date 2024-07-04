const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[cellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.style.backgroundColor = currentPlayer === 'X' ? 'deeppink' : 'darkgoldenrod';

  if (checkWin()) {
    statusMessage.textContent = `${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusMessage.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusMessage.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameState.every(cell => {
    return cell !== '';
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusMessage.textContent = `${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#3498db';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
