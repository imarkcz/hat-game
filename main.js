const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.row = 0;
    this.col = 0;
    this.isHatFound = false;
  }

  print() {
    for (let row = 0; row < this.field.length; row++) {
      const rowArray = this.field[row].map((cell, col) => (row === this.row && col === this.col) ? pathCharacter : cell);
      console.log(rowArray.join(''));
    }
  }

  move(direction) {
    switch (direction.toLowerCase()) {
      case 'up':
        this.row -= 1;
        break;
      case 'down':
        this.row += 1;
        break;
      case 'left':
        this.col -= 1;
        break;
      case 'right':
        this.col += 1;
        break;
      default:
        console.log('Invalid direction. Please enter up, down, left, or right.');
        break;
    }

    if (this.isOutOfBounds()) {
      console.log('You went outside the field. Game over!');
      return false;
    }

    const currentTile = this.field[this.row][this.col];
    if (currentTile === hole) {
      console.log('Oops! You fell into a hole. Game over!');
      return false;
    } else if (currentTile === hat) {
      console.log('Congratulations! You found your hat. You win!');
      return false;
    }

    this.field[this.row][this.col] = pathCharacter;
    return true;
  }

  isOutOfBounds() {
    return this.row < 0 || this.row >= this.field.length || this.col < 0 || this.col >= this.field[0].length;
  }

  placeHatRandomly() {
    const hatRow = Math.floor(Math.random() * this.field.length);
    const hatCol = Math.floor(Math.random() * this.field[0].length);
    this.field[hatRow][hatCol] = hat;
  }

  playGame() {
    this.placeHatRandomly();
    this.print();

    while (true) {
      const direction = prompt('Enter your move (up, down, left, right): ');
      const isMoveSuccessful = this.move(direction);

      if (!isMoveSuccessful) {
        break;
      }

      this.print();
    }
  }
}

// Start the game with a larger field
const fieldArray = [
  [fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter],
  [fieldCharacter, hole, fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [fieldCharacter, hole, fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
  [hole, fieldCharacter, hole, fieldCharacter, hat],
];

const myField = new Field(fieldArray);
myField.playGame();
