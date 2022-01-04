import { shuffleArray } from "./helpers";
import Piece from "./piece";
import Player from "./player";
import { Placement, Rotation, Turn } from "./turn";

export default class Board {
  leftSideNumber: number;
  rightSideNumber: number;
  private _turns: Turn[] = [];
  private _pile: Piece[] = [];

  constructor() {
    for (var _i = 0; _i <= 6; _i++) {
      //   for (var _j = 0; _j <= _i; _j++) {
      //     this._pile.push(new Piece(_i, _j));
      //   }
      this._pile.push(new Piece(_i, 0));
      this._pile.push(new Piece(_i, 1));
    }
    this._pile.push(new Piece(8, 8));
    shuffleArray(this._pile);
  }

  public takePieceFromPile() {
    shuffleArray(this._pile);
    return this._pile.pop();
  }

  public get hasNoPiecesInThePile() {
    return this._pile.length === 0;
  }

  public putFirstPiece(piece: Piece) {
    this.leftSideNumber = piece.leftSide;
    this.rightSideNumber = piece.rightSide;
    this._turns.push(
      new Turn(piece, null, Rotation.Direct, Placement.ToTheRight, 0)
    );
  }

  public putPieceOnLeftSide(piece: Piece, player: Player) {
    const currentTurnNum = this._turns.length;
    if (piece.isDouble) {
      this.leftSideNumber = piece.leftSide;
      this._turns.push(
        new Turn(
          piece,
          player,
          Rotation.Vertical,
          Placement.ToTheLeft,
          currentTurnNum
        )
      );
    } else if (this.leftSideNumber === piece.leftSide) {
      this.leftSideNumber = piece.rightSide;
      this._turns.push(
        new Turn(
          piece,
          player,
          Rotation.Rotated,
          Placement.ToTheLeft,
          currentTurnNum
        )
      );
    } else if (this.leftSideNumber === piece.rightSide) {
      this.leftSideNumber = piece.leftSide;
      this._turns.push(
        new Turn(
          piece,
          player,
          Rotation.Direct,
          Placement.ToTheLeft,
          currentTurnNum
        )
      );
    }
  }

  public putPieceOnRightSide(piece: Piece, player: Player) {
    const currentTurnNum = this._turns.length;
    if (piece.isDouble) {
      this.rightSideNumber = piece.leftSide;
      this._turns.push(
        new Turn(
          piece,
          player,
          Rotation.Vertical,
          Placement.ToTheRight,
          currentTurnNum
        )
      );
    } else if (this.rightSideNumber === piece.leftSide) {
      this.rightSideNumber = piece.rightSide;
      this._turns.push(
        new Turn(
          piece,
          player,
          Rotation.Direct,
          Placement.ToTheRight,
          currentTurnNum
        )
      );
    } else if (this.rightSideNumber === piece.rightSide) {
      this.rightSideNumber = piece.leftSide;
      this._turns.push(
        new Turn(
          piece,
          player,
          Rotation.Rotated,
          Placement.ToTheRight,
          currentTurnNum
        )
      );
    }
  }

  public showCurrentState() {
    console.log("\n#########################################################");
    console.log(`##    Current board state:\n##`);
    console.log(`##  Pieces in pile: ${this._pile.length}`);
    console.log(`##  Pieces on board: ${this._turns.length}`);
    console.log(`##  Left Side Number: ${this.leftSideNumber}`);
    console.log(`##  Right Side Number: ${this.rightSideNumber}`);
    console.log("#########################################################");
  }

  public showFinalArrangement(players: Player[]) {
    const colorCyan = "\x1b[36m%s\x1b[0m";
    const colorYellow = "\x1b[33m%s\x1b[0m";
    const colorRed = "\x1b[31m%s\x1b[0m";

    console.log("\n#########################################################");
    console.log(`##    Final arrangement of pieces:`);
    console.log(`##    *pieces are colored:`);
    console.log(colorRed, "##  for first piece");
    console.log(colorCyan, `##  for ${players[0].nickname}`);
    console.log(colorYellow, `##  for ${players[1].nickname}`);

    this._turns.sort((a, b) =>
      a.placement === b.placement
        ? a.placement === Placement.ToTheLeft
          ? b.number - a.number
          : a.number - b.number
        : a.placement - b.placement
    );
    for (var turn of this._turns) {
      const color =
        turn.player === players[0]
          ? colorCyan
          : turn.player === players[1]
          ? colorYellow
          : colorRed;
      turn.draw(color);
    }
    console.log("#########################################################");
  }
}
