const container = document.getElementById('game-container');
const restartBtn = document.getElementById('restart');

const size = 4;
let grid = [];
let selected = [];

function init() {
  grid = [];
  container.innerHTML = '';
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      // Random initial value 1–5
      const value = Math.floor(Math.random() * 5) + 1;
      grid[i][j] = value;
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.row = i;
      tile.dataset.col = j;
      tile.textContent = value;
      updateTileColor(tile, value);
      tile.addEventListener('click', handleTileClick);
      container.appendChild(tile);
    }
  }
  selected = [];
}

function updateTileColor(tile, value) {
  const colors = {
    1: '#ffeb3b',
    2: '#4caf50',
    3: '#2196f3',
    4: '#9c27b0',
    5: '#ff5722',
    6: '#3f51b5',
    8: '#00bcd4',
    10: '#cddc39',
    12: '#e91e63',
    15: '#673ab7',
    20: '#795548',
    24: '#8bc34a',
    30: '#ffc107',
    40: '#ff9800',
    50: '#607d8b',
    60: '#f44336',
    80: '#009688',
    100: '#3e2723',
    120: '#ff1744'
  };
  tile.style.background = colors[value] || '#ffffff';
  tile.style.color = (value >= 10 ? '#fff' : '#000');
}

function handleTileClick(e) {
  const tile = e.currentTarget;
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);

  // Select or deselect
  if (tile.classList.contains('selected')) {
    tile.classList.remove('selected');
    selected = selected.filter(s => !(s.row === row && s.col === col));
  } else {
    if (selected.length < 2) {
      tile.classList.add('selected');
      selected.push({ row, col, element: tile });
    }
  }

  // If two tiles selected, multiply
  if (selected.length === 2) {
    const val1 = grid[selected[0].row][selected[0].col];
    const val2 = grid[selected[1].row][selected[1].col];
    const newVal = val1 * val2;

    // Update first tile with new value
    grid[selected[0].row][selected[0].col] = newVal;
    selected[0].element.textContent = newVal;
    updateTileColor(selected[0].element, newVal);

    // Reset second tile to 1
    grid[selected[1].row][selected[1].col] = 1;
    selected[1].element.textContent = 1;
    updateTileColor(selected[1].element, 1);

    // Clear selection
    selected[0].element.classList.remove('selected');
    selected[1].element.classList.remove('selected');
    selected = [];
  }
}

restartBtn.addEventListener('click', () => {
  init();
});

init();
