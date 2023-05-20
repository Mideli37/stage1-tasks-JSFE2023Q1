/* eslint-disable no-continue */
/* eslint-disable prefer-const */
/* eslint-disable no-console */

import { Cell } from './cell';
import './style.scss';

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
class App {
  constructor() {
    this.size = 10;
    this.bombsOnField = 10;
    this.cells = [];
    this.buildLayout();
  }

  buildField(parent) {
    this.cells = [];
    for (let i = 1; i <= this.size; i += 1) {
      const row = addEl('div', parent, 'row');
      for (let j = 1; j <= this.size; j += 1) {
        const newCell = new Cell(i, j, row);
        this.cells.push(newCell);
      }
    }
  }

  buildLayout() {
    this.main = addEl('main', document.body, 'main');
    this.fieldWrapper = addEl('div', this.main, 'field-wrapper');
    this.field = addEl('div', this.fieldWrapper, 'field');
    this.buildField(this.field);
    this.buttons = addEl('div', this.main, 'buttons');
    this.resetButton = addEl('button', this.buttons, 'reset', 'New Game');
    this.sizesButtons = addEl('div', this.buttons, 'sizes');
    this.size10 = addEl('button', this.sizesButtons, 'size10', '10x10');
    this.size15 = addEl('button', this.sizesButtons, 'size15', '15x15');
    this.size25 = addEl('button', this.sizesButtons, 'size25', '25x25');
    this.bombsQuantityLabel = addEl('label', this.buttons, 'bombs-quantity-label', 'Bombs Count');
    this.bombsQuantity = addEl('input', this.bombsQuantityLabel, 'bombs-quantity');
    this.bombsQuantity.type = 'number';
    this.bombsQuantity.min = 10;
    this.bombsQuantity.max = 99;
  }

  deleteField() {
    this.field.remove();
  }
}

const app = new App();

let { cells } = app;
let clickCount = 0;

function countClicks(cell) {
  if (cell.element.classList.contains('closed')) {
    clickCount += 1;
    console.log(clickCount);
  }
}

function openAllField() {
  app.cells.forEach((cell) => {
    cell.element.classList.remove('closed');
  });
}

function getCell(cord1, cord2) {
  return cells.find((element) => element.x === cord1 && element.y === cord2);
}

function findNearCells(cell) {
  // console.log('find cell');
  const nearCells = [];
  let curXCord = cell.x - 1;
  let curYCord = cell.y - 1;
  for (let i = 0; i < 3; i += 1) {
    if (curXCord < 1 || curXCord > app.size) {
      curXCord += 1;
      continue;
    }
    for (let j = 0; j < 3; j += 1) {
      if (curYCord < 1 || curYCord > app.size) {
        curYCord += 1;
        continue;
      }
      const nearCell = getCell(curXCord, curYCord);
      nearCells.push(nearCell);
      curYCord += 1;
    }
    curYCord = cell.y - 1;
    curXCord += 1;
  }
  return nearCells;
}

function giveNumber(bombCell) {
  const nearCells = findNearCells(bombCell);
  // console.log(nearCells);
  nearCells.forEach((cell) => {
    cell.changeBombCount(cell.bombCount + 1);
    cell.setTextContent(cell.bombCount);
  });
}

function openEmptyCell(cell) {
  const nearCells = findNearCells(cell);
  const newEmpty = nearCells.filter((el) => el.bombCount === 0 && el.element.classList.contains('closed'));
  for (let i = 0; i < nearCells.length; i += 1) {
    nearCells[i].element.classList.remove('closed');
  }
  for (let i = 0; i < newEmpty.length; i += 1) {
    openEmptyCell(newEmpty[i]);
  }
}

function generateBombs() {
  app.field.addEventListener('click', (event) => {
    /*  console.log(app.bombsOnField);
    console.log(event.target);
    console.log(cells.some((el) => el.element === event.target));
    console.log(cells); */
    const target = cells.find((el) => el.element === event.target);
    if (target && clickCount <= 1) {
      console.log('bomb generating');
      const probableBombCells = cells.filter((el) => el.element !== event.target);
      for (let i = 0; i < app.bombsOnField; ) {
        const randomNum = Math.floor(Math.random() * probableBombCells.length);
        if (!probableBombCells[randomNum].element.classList.contains('bomb')) {
          probableBombCells[randomNum].element.classList.add('bomb');
          // probableBombCells[randomNum].setTextContent(i);
          i += 1;
          giveNumber(probableBombCells[randomNum]);
        }
      }
      // console.warn(target);

      if (target.bombCount === 0) {
        openEmptyCell(target);
        //  console.log('empty cell');
      }
    }
  });
}

function clickCell() {
  app.cells.forEach((cell) => {
    cell.element.addEventListener('click', () => {
      if (cell.element.classList.contains('closed')) {
        countClicks(cell);
        if (cell.element.classList.contains('bomb')) {
          console.error('Game over!');
          openAllField();
        } else if (cell.bombCount === 0 && clickCount > 1) {
          openEmptyCell(cell);
        } else {
          cell.openCell();
        }
      }
    });
  });
}

function resetGame() {
  app.deleteField();
  app.field = addEl('div', app.fieldWrapper, 'field');
  app.buildField(app.field);
  // console.log('vza');
  cells = app.cells;
  clickCount = 0;
  clickCell();
  generateBombs();
}

function initReset() {
  app.resetButton.addEventListener('click', () => {
    resetGame();
    // console.log('reset');
  });
}

function initChangeSize() {
  app.sizesButtons.addEventListener('click', (event) => {
    if (event.target === app.size10) {
      app.size = 10;
    } else if (event.target === app.size15) {
      app.size = 15;
    } else if (event.target === app.size25) {
      app.size = 25;
    }
    resetGame();
  });
}

initChangeSize();
initReset();

function changeBombQuantity() {
  app.bombsQuantity.addEventListener('change', () => {
    if (app.bombsQuantity.value > 9 && app.bombsQuantity.value < 100) {
      app.bombsOnField = app.bombsQuantity.value;
      // console.log(app.bombsOnField);
      resetGame();
    }
  });
}

changeBombQuantity();
clickCell();

generateBombs();
/* function detectFirstClick() {
  cells.forEach((cell) => {
    cell.element.addEventListener('click', () => {
      if (clickCount === 0) {
        // this.checkCell(cell, 10);
      }
      console.warn(cell);
    });
  });
} */

// detectFirstClick();
