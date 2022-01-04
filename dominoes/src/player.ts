import Board from "./board";
import { removeElementFromArray } from "./helpers";
import Piece from "./piece";

export default class Player {
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
        console.log(`##     ${this.nickname} put piece on board:`);
        pieceToPut.show();
      }
      return true;
    } else {
      let newPiece: Piece = null;
      while (!board.hasNoPiecesInThePile) {
        newPiece = this.takePieceFromPile(board);
        if (
          (newPiece && board.leftSideNumber === newPiece.leftSide) ||
          board.leftSideNumber === newPiece.rightSide
        ) {
          this.putPieceOnBoard(newPiece, board);
          removeElementFromArray(this.pieces, piece);
          if (this._logTurns) {
            console.log(`##     ${this.nickname} pick piece from pile:`);
            newPiece.show();
            console.log(`##     ${this.nickname} put piece on board:`);
            newPiece.show();
          }
          return true;
        }
      }
      return false;
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

  public showCurrentPieces() {
    console.log("#########################################################");
    console.log(`##     ${this.nickname} has ${this.pieces.length} pieces:`);
    let lineByLineDraw: string[] = ["", "", "", "", ""];
    for (var piece of this.pieces) {
      lineByLineDraw[0] += "\t _____ \t";
      lineByLineDraw[1] += `\t | ${piece.leftSide} |\t`;
      lineByLineDraw[2] += "\t ----- \t";
      lineByLineDraw[3] += `\t | ${piece.rightSide} |\t`;
      lineByLineDraw[4] += "\t ⎻⎻⎻⎻⎻ \t";
    }
    lineByLineDraw.forEach((line) => console.log(line));
    console.log("#########################################################");
  }
}
