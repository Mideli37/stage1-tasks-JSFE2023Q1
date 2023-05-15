/* eslint-disable no-continue */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import { Game } from './game';
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
    this.cells = [];
    this.buildLayout();
    const game = new Game(this.cells);
  }

  buildField(parent) {
    for (let i = 1; i <= 10; i += 1) {
      const row = addEl('div', parent, 'row');
      for (let j = 1; j <= 10; j += 1) {
        const newCell = new Cell(i, j, row);
        this.cells.push(newCell);
      }
    }
  }

  buildLayout() {
    const main = addEl('main', document.body, 'main');
    const field = addEl('div', main, 'field');
    this.buildField(field);
  }
}

const app = new App();
