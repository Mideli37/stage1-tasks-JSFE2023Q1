/* eslint-disable no-continue */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import './style.scss';

class Cell {
  constructor(yCord, xCord, parent) {
    this.x = xCord;
    this.y = yCord;
    const element = document.createElement('button');
    parent.append(element);
    element.classList.add('cell', 'closed');
    this.element = element;
    this.bombCount = 0;
    element.textContent = this.bombCount;
  }

  setTextContent(text) {
    this.element.textContent = text;
  }

  changeBombCount(num) {
    this.bombCount = num;
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

function buildField(parent) {
  const cells = [];
  for (let i = 1; i <= 10; i += 1) {
    const row = addEl('div', parent, 'row');
    for (let j = 1; j <= 10; j += 1) {
      const newCell = new Cell(i, j, row);
      cells.push(newCell);
    }
  }
  return cells;
}

function openCell(list) {
  list.forEach((cell) => {
    cell.element.addEventListener('click', () => {
      console.log(cell);
      cell.openCell();
    });
  });
}

function getCell(list, cord1, cord2) {
  return list.find((element) => element.x === cord1 && element.y === cord2);
}

function findNearCells(cell, list) {
  const nearCells = [];
  let curXCord = cell.x - 1;
  let curYCord = cell.y - 1;
  for (let i = 0; i < 3; i += 1) {
    if (curXCord < 1 || curXCord > 10) {
      curXCord += 1;
      continue;
    }
    for (let j = 0; j < 3; j += 1) {
      if (curYCord < 1 || curYCord > 10) {
        curYCord += 1;
        continue;
      }
      console.log(curXCord, curYCord);
      const nearCell = getCell(list, curXCord, curYCord);
      console.log(nearCell);
      nearCells.push(getCell(list, curXCord, curYCord));
      curYCord += 1;
    }
    curYCord = cell.y - 1;
    curXCord += 1;
  }
  return nearCells;
}

function giveNumber(bombCell, list) {
  const nearCells = findNearCells(bombCell, list);
  nearCells.forEach((cell) => {
    cell.changeBombCount(cell.bombCount + 1);
    cell.setTextContent(cell.bombCount);
  });
}

function generateBombs(minesCount, list) {
  for (let i = 0; i < minesCount; ) {
    const randomNum = Math.floor(Math.random() * (list.length - 1));
    if (!list[randomNum].element.classList.contains('bomb')) {
      list[randomNum].element.classList.add('bomb');
      list[randomNum].setTextContent(i);
      console.log(i);
      i += 1;
      giveNumber(list[randomNum], list);
    }
  }
}

function buildLayout() {
  const main = addEl('main', document.body, 'main');
  const field = addEl('div', main, 'field');
  const cells = buildField(field);
  openCell(cells);
  generateBombs(10, cells);
}

buildLayout();
