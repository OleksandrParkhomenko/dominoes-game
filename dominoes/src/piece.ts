export default class Piece {
  isDouble: boolean;
  leftSide: number;
  rightSide: number;

  constructor(leftSide: number, rightSide: number) {
    this.leftSide = leftSide;
    this.rightSide = rightSide;
    this.isDouble = leftSide === rightSide;
  }
}
