/* eslint-disable no-console */
import './style.scss';

class Cell {
  constructor(xCord, yCord, parent) {
    this.x = xCord;
    this.y = yCord;
    const element = document.createElement('button');
    parent.append(element);
    element.classList.add('cell', 'closed');
    this.element = element;
  }

  openCell() {
    if (this.element.classList.contains('closed')) {
      this.element.classList.remove('closed');
    }
  }
}

function addEl(tag, parent, className, text) {
  const el = document.createElement(tag);
  if (parent) {
    parent.append(el);
  }
  if (className) {
    el.className = className;
  }
  if (text) {
    el.append(text);
  }
  return el;
}

const main = addEl('main', document.body, 'main');
const field = addEl('div', main, 'field');
const cells = [];

for (let i = 0; i < 10; i += 1) {
  const row = addEl('div', field, 'row');
  for (let j = 0; j < 10; j += 1) {
    const newCell = new Cell(i, j, row);
    cells.push(newCell);
  }
}

cells.forEach((cell) => {
  cell.element.addEventListener('click', () => {
    cell.openCell();
  });
});

function generateMines(minesCount) {
  for (let i = 0; i < minesCount; ) {
    const randomNum = Math.floor(Math.random() * (cells.length - 1));
    if (!cells[randomNum].element.classList.contains('bomb')) {
      cells[randomNum].element.classList.add('bomb');
      cells[randomNum].element.textcontent = i;
      console.log(i);
      i += 1;
    }
  }
}

generateMines(97);
