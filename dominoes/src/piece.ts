export default class Piece {
  isDouble: boolean;
  leftSide: number;
  rightSide: number;
  overallValue: number;

  constructor(leftSide: number, rightSide: number) {
    this.leftSide = leftSide;
    this.rightSide = rightSide;
    this.overallValue = leftSide + rightSide;
    this.isDouble = leftSide === rightSide;
  }

  public greaterThan(piece: Piece) {
    return (
      this.overallValue > piece.overallValue ||
      (this.overallValue == piece.overallValue &&
        this.leftSide > piece.leftSide)
    );
  }
}
