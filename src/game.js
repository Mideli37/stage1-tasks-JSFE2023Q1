/* eslint-disable no-continue */
/* eslint-disable no-console */

export class Game {
  constructor(cells) {
    this.cells = cells;
    // this.openCell();
    this.detectFirstClick();
    this.countClicks();
  }

  /* openCell() {
    this.cells.forEach((cell) => {
      cell.element.addEventListener('click', () => {
        console.log(cell);
        cell.openCell();
      });
    });
  } */

  countClicks() {
    this.cells.forEach((cell) => {
      cell.element.addEventListener('click', () => {
        if (cell.element.classList.contains('closed')) {
          this.clicks += 1;
          console.log(this.clicks);
        }
      });
    });
  }

  getCell(cord1, cord2) {
    return this.cells.find((element) => element.x === cord1 && element.y === cord2);
  }

  findNearCells(cell) {
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
        const nearCell = this.getCell(curXCord, curYCord);
        nearCells.push(this.getCell(curXCord, curYCord));
        curYCord += 1;
      }
      curYCord = cell.y - 1;
      curXCord += 1;
    }
    return nearCells;
  }

  giveNumber(bombCell) {
    const nearCells = this.findNearCells(bombCell);
    nearCells.forEach((cell) => {
      cell.changeBombCount(cell.bombCount + 1);
      cell.setTextContent(cell.bombCount);
    });
  }

  generateBombs(minesCount) {
    for (let i = 0; i < minesCount; ) {
      const randomNum = Math.floor(Math.random() * (this.cells.length - 1));
      if (!this.cells[randomNum].element.classList.contains('bomb')) {
        this.cells[randomNum].element.classList.add('bomb');
        this.cells[randomNum].setTextContent(i);
        i += 1;
        this.giveNumber(this.cells[randomNum]);
      }
    }
  }

  detectFirstClick() {
    this.cells.forEach((cell) => {
      cell.element.addEventListener('click', () => {
        if (this.clicks === 0) {
          this.checkCell(cell, 10);
        }
        console.warn(cell);
      });
    });
  }

  /*  checkCell(cell, bombsCount) {
    this.generateBombs(bombsCount);
     (cell.bombCount !== 0) {
      this.generateBombs(bombsCount);
    }
  } */

  // resetGame() {}

  clicks = 0;

  // startGame() {}
}
