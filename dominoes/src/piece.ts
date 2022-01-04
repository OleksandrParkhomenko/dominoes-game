export default class Piece {
  isDouble: boolean;
  leftSide: number;
  rightSide: number;

  constructor(leftSide: number, rightSide: number) {
    this.leftSide = leftSide;
    this.rightSide = rightSide;
    this.isDouble = leftSide === rightSide;
  }

  public show() {
    const piece =
      "\t _____ \t\n" +
      `\t | ${this.leftSide} |\t\n` +
      "\t ----- \t\n" +
      `\t | ${this.rightSide} |\t\n` +
      "\t ⎻⎻⎻⎻⎻ \t";
    console.log(piece);
  }
}
