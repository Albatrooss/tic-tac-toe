const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let cells = [null, null, null, null, null, null, null, null, null];
let turns = [[null, null, null, null, null, null, null, null, null]];
let turn = 'x';
let gameOver = false;
let someoneWon = false;

/*------- DOM Elements ----------*/

let gameEl = document.querySelector('.container');
let cellEls = document.querySelectorAll('.cell');
let turnEl = document.querySelector('main > h2');
let turnSpan = document.getElementById('turnSpan');
let newGameBtn = document.getElementById('newGameBtn');
let undoBtn = document.getElementById('undoBtn');
let message = document.querySelector('.message');
let messageTxt = document.querySelector('.message > h3');
let confetti = document.querySelector('.confetti');
let banana = document.querySelector('.banana');
let audio = document.getElementById('yay');
audio.volume = 0.2;

/*------- Even Listeners ----------*/

newGameBtn.addEventListener('click', newGame);

undoBtn.addEventListener('click', undo);

/*------- Functions ----------*/

const renderGame = () => {
  cells.forEach((x, i) => {
    cellEls[i].innerHTML = x;
  });
  turnSpan.innerHTML = turn.toUpperCase();
};

const nextTurn = () => {
  turn = turn === 'x' ? 'o' : 'x';
};

const logTurn = () => {
  let temp = [...cells];
  if (turns.length === 1) {
    turns = [[null, null, null, null, null, null, null, null, null], temp];
  } else {
    turns = [...turns, temp];
  }
};

function newGame() {
  cells = [null, null, null, null, null, null, null, null, null];
  turns = [[null, null, null, null, null, null, null, null, null]];
  turn = 'x';
  renderGame();
  gameOver = false;
  if (someoneWon) {
    confetti.classList.toggle('hide');
    banana.classList.toggle('hider');
  }
  turnEl.style.opacity = 1;
  someoneWon = false;
  return message.classList.toggle('hidden');
}

function undo() {
  if (turns.length < 2) return;
  turns.pop();
  gameOver = false;
  cells = turns[turns.length - 1];
  nextTurn();
  return renderGame();
}

const checkWinner = () => {
  winningCombos.forEach(x => {
    if (
      ('x' === cells[x[0]] || 'o' === cells[x[0]]) &&
      cells[x[0]] === cells[x[1]] &&
      cells[x[0]] === cells[x[2]]
    ) {
      gameOver = true;
    }
  });
};

const winner = () => {
  displayMessage(`${turn === 'x' ? 'o' : 'x'} wins!`);
  confetti.classList.toggle('hide');
  banana.classList.toggle('hider');
  turnEl.style.opacity = 0;
  audio.play();
  someoneWon = true;
};

const displayMessage = msg => {
  message.classList.toggle('hidden');
  messageTxt.innerHTML = msg;
};

gameEl.addEventListener('click', e => {
  if (!e.target.classList.value.includes('cell') || cells[e.target.id] !== null || gameOver) return;
  cells[e.target.id] = turn;
  nextTurn();
  renderGame();
  logTurn();
  checkWinner();
  if (gameOver) {
    winner();
  } else if (!cells.includes(null)) {
    displayMessage("It's a tie!");
  }
  return;
});
