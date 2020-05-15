let winningCombos = [
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

let gameEl = document.querySelector('.container');
let cellEls = document.querySelectorAll('.cell');
let turnSpan = document.getElementById('turnSpan');
let newGameBtn = document.getElementById('newGameBtn');
let undoBtn = document.getElementById('undoBtn');

newGameBtn.addEventListener('click', x => {
  cells = [null, null, null, null, null, null, null, null, null];
  turn = 'x';
  renderGame();
  gameOver = false;
  return;
});

undoBtn.addEventListener('click', e => {
  turns.pop();
  gameOver = false;
  cells = turns[turns.length - 1];
  turn = turn === 'x' ? 'o' : 'x';
  return renderGame();
});

gameEl.addEventListener('click', e => {
  if (e.target.className !== 'cell' || cells[e.target.id] !== null || gameOver) return;
  cells[e.target.id] = turn;
  turn = turn === 'x' ? 'o' : 'x';
  renderGame();
  let temp = [...cells];
  turns = [...turns, temp];
  checkWinner();
  if (gameOver) {
    alert(`${turn === 'x' ? 'o' : 'x'} wins!`);
  }
  if (!cells.includes(null)) alert("It's a tie");
  return;
});

const renderGame = () => {
  cells.forEach((x, i) => {
    cellEls[i].innerHTML = x;
  });
  turnSpan.innerHTML = turn.toUpperCase();
};

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
