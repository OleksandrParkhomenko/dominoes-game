import { shuffleArray } from "./helpers";
import { logTurnInFinalArrangement } from "./logger";
import Piece from "./piece";
import { Player } from "./player";
import { Placement, Rotation, Turn } from "./turn";

export default class Board {
  leftSideNumber: number;
  rightSideNumber: number;
  turns: Turn[] = [];
  pile: Piece[] = [];

  constructor() {
    for (var _i = 0; _i <= 6; _i++) {
      for (var _j = 0; _j <= _i; _j++) {
        this.pile.push(new Piece(_i, _j));
      }
    }
    shuffleArray(this.pile);
  }

  public takePieceFromPile() {
    shuffleArray(this.pile);
    return this.pile.pop();
  }

  public get hasNoPiecesInThePile() {
    return this.pile.length === 0;
  }

  public putFirstPiece(piece: Piece) {
    this.leftSideNumber = piece.leftSide;
    this.rightSideNumber = piece.rightSide;
    this.turns.push(
      new Turn(piece, null, Rotation.Direct, Placement.ToTheRight, 0)
    );
  }

  public putPieceOnLeftSide(piece: Piece, player: Player) {
    const currentTurnNum = this.turns.length;
    this.turns.push(
      new Turn(
        piece,
        player,
        this.getNewPieceRotation(piece, Placement.ToTheLeft),
        Placement.ToTheLeft,
        currentTurnNum
      )
    );
    this.leftSideNumber =
      this.leftSideNumber == piece.rightSide ? piece.leftSide : piece.rightSide;
  }

  public putPieceOnRightSide(piece: Piece, player: Player) {
    const currentTurnNum = this.turns.length;
    this.turns.push(
      new Turn(
        piece,
        player,
        this.getNewPieceRotation(piece, Placement.ToTheRight),
        Placement.ToTheRight,
        currentTurnNum
      )
    );
    this.rightSideNumber =
      this.rightSideNumber == piece.leftSide ? piece.rightSide : piece.leftSide;
  }

  private getNewPieceRotation(piece: Piece, placement: Placement) {
    if (piece.isDouble) {
      return Rotation.Vertical;
    }
    const rotation = {
      [Placement.ToTheLeft]:
        this.leftSideNumber == piece.rightSide
          ? Rotation.Direct
          : Rotation.Rotated,
      [Placement.ToTheRight]:
        this.rightSideNumber == piece.leftSide
          ? Rotation.Direct
          : Rotation.Rotated,
    };
    return rotation[placement];
  }
}
