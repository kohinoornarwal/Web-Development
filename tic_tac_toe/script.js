// Project by Kohinoor Narwal | GF202676017
const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreDEl = document.getElementById("scoreD");

// All 8 ways to win (positions 0-8 on the board)
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0, D: 0 };

// Returns the winning pattern, or null if nobody has won
function checkWinner() {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return winPatterns[i];
    }
  }
  return null;
}

function handleClick(index) {
  // Ignore clicks if game is over or the cell is taken
  if (gameOver || board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());

  const winPattern = checkWinner();

  if (winPattern) {
    statusEl.textContent = "Player " + currentPlayer + " wins!";
    winPattern.forEach(function (i) { cells[i].classList.add("win"); });
    scores[currentPlayer]++;
    gameOver = true;
  } else if (!board.includes("")) {
    statusEl.textContent = "It's a draw!";
    scores.D++;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = "Player " + currentPlayer + "'s turn";
  }
  updateScores();
}

function updateScores() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDEl.textContent = scores.D;
}

// Reset the board (scores are kept)
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusEl.textContent = "Player X's turn";
  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.className = "cell";
  });
}

cells.forEach(function (cell, index) {
  cell.addEventListener("click", function () { handleClick(index); });
});
restartBtn.addEventListener("click", resetGame);
