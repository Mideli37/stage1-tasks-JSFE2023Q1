export class Cell {
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
