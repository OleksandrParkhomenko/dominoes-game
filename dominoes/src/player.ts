import Board from "./board";
import { removeElementFromArray } from "./helpers";
import { logPickNewPiece, logPutPiece } from "./logger";
import Piece from "./piece";

export enum MoveStatus {
  Success = 0,
  Skip = 1,
}
export class Player {
  nickname: string;
  pieces: Piece[] = [];
  private _logTurns: boolean;

  constructor(nickname: string = "JohnDoe", _logTurns: boolean = false) {
    this.nickname = nickname;
    this._logTurns = _logTurns;
  }

  public get hasPieces() {
    return this.pieces.length > 0;
  }

  public takePieceFromPile(board: Board) {
    const newPiece = board.takePieceFromPile();
    if (newPiece) {
      this.pieces.push(newPiece);
      return newPiece;
    }
    return null;
  }

  public makeMove(board: Board) {
    let possiblePieces: Piece[] = [];
    for (var piece of this.pieces) {
      if (
        board.leftSideNumber === piece.leftSide ||
        board.leftSideNumber === piece.rightSide ||
        board.rightSideNumber === piece.leftSide ||
        board.rightSideNumber === piece.rightSide
      )
        possiblePieces.push(piece);
    }
    const pieceToPut = possiblePieces.pop();
    if (pieceToPut) {
      this.putPieceOnBoard(pieceToPut, board);
      removeElementFromArray(this.pieces, pieceToPut);
      if (this._logTurns) {
        logPutPiece(pieceToPut, this);
      }
      return MoveStatus.Success;
    } else {
      let newPiece: Piece = null;
      while (!board.hasNoPiecesInThePile) {
        newPiece = this.takePieceFromPile(board);
        if (
          (newPiece && board.leftSideNumber === newPiece.leftSide) ||
          board.leftSideNumber === newPiece.rightSide
        ) {
          this.putPieceOnBoard(newPiece, board);
          removeElementFromArray(this.pieces, newPiece);
          if (this._logTurns) {
            logPickNewPiece(newPiece, this);
            logPutPiece(newPiece, this);
          }
          return MoveStatus.Success;
        }
      }
      return MoveStatus.Skip;
    }
  }

  public putPieceOnBoard(piece: Piece, board: Board) {
    if (
      board.leftSideNumber === piece.leftSide ||
      board.leftSideNumber === piece.rightSide
    ) {
      board.putPieceOnLeftSide(piece, this);
    } else {
      board.putPieceOnRightSide(piece, this);
    }
  }
}
