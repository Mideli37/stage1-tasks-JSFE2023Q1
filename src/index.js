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
    this.game = new Game(this.cells);
    this.initReset();
  }

  buildField(parent) {
    this.cells = [];
    for (let i = 1; i <= 10; i += 1) {
      const row = addEl('div', parent, 'row');
      for (let j = 1; j <= 10; j += 1) {
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
  }

  deleteField() {
    this.field.remove();
  }

  resetGame() {
    this.deleteField();
    this.field = addEl('div', this.fieldWrapper, 'field');
    this.buildField(this.field);
    console.log('vza');
    this.game = new Game(this.cells);
  }

  initReset() {
    this.resetButton.addEventListener('click', () => {
      this.resetGame();
      console.log('reset');
    });
  }
}

const app = new App();
