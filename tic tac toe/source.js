const bordEL = document.querySelector(".bord");
const cellsEL = document.querySelectorAll(".cell");

const board = Array(9).fill("");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let gameOver = false;

// Reset function
function resetBoard() {
  board.fill("");
  cellsEL.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  gameOver = false;
}

// Click handler
function handleCellClick(e) {
  const cellIndex = e.target.getAttribute("data-index");
  if (board[cellIndex] === "" && !gameOver) {
    board[cellIndex] = currentPlayer;
    // Only update the clicked cell
    cellsEL[cellIndex].textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
      alert(winner);
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Win check
function checkWin() {
  for (let [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return `Player ${board[a]} wins!`;
    }
  }

  if (!board.includes("")) {
    return "It's a draw!";
  }

  return null;
}

// Attach click events
cellsEL.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});