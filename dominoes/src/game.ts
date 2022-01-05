import Board from "./board";
import {
  logGameResult,
  logGameStart,
  logTurnInGame,
  logSkipTurn,
  logFinalArrangement,
  logPlayerCurrentPieces,
} from "./logger";
import Piece from "./piece";
import { Player, MoveStatus } from "./player";

export default class DominoesGame {
  players: Player[];
  currentPlayer: number;
  board: Board;
  private _gameIsOn: boolean = false;
  private _logTurns: boolean;

  constructor(_logTurns: boolean = false) {
    this.players = [
      new Player("BradPitt", _logTurns),
      new Player("JohnnyDepp", _logTurns),
    ];
    this.board = new Board();
    this._logTurns = _logTurns;

    // each player picks random piece from pile
    for (var _i = 0; _i < 7; _i++) {
      for (var player of this.players) {
        player.takePieceFromPile(this.board);
      }
    }
  }

  private initGame() {
    this._gameIsOn = true;
    const firstPiece = this.board.takePieceFromPile();
    this.board.putFirstPiece(firstPiece);
    this.currentPlayer = this.chooseFirstMovePlayer();
  }

  private chooseFirstMovePlayer() {
    let playersHighestValuePieces: Piece[] = [];
    for (var player of this.players) {
      const currentHighestValuePiece = player.pieces.reduce((a, b) =>
        a.greaterThan(b) ? a : b
      );
      playersHighestValuePieces.push(currentHighestValuePiece);
    }
    const highestValuePiece = playersHighestValuePieces.reduce((a, b) =>
      a.greaterThan(b) ? a : b
    );
    return playersHighestValuePieces.indexOf(highestValuePiece);
  }

  public startGame() {
    this.initGame();
    logGameStart(this.players);

    let _prevPlayerMissedATurn = false;
    while (!this.gameOver && this.players.every((player) => player.hasPieces)) {
      if (this._logTurns) {
        logTurnInGame(this);
      }

      const moveStatus = this.players[this.currentPlayer].makeMove(this.board);
      switch (moveStatus) {
        case MoveStatus.Success:
          if (!this.players[this.currentPlayer].hasPieces) {
            this.stopGame(this.players[this.currentPlayer]);
            break;
          }
          _prevPlayerMissedATurn = false;
          break;
        case MoveStatus.Skip:
          if (_prevPlayerMissedATurn && this.board.hasNoPiecesInThePile) {
            this.stopGame();
          }
          _prevPlayerMissedATurn = true;
          if (this._logTurns) {
            logSkipTurn(this.players[this.currentPlayer]);
          }
          break;
        default:
          break;
      }

      this._nextPlayerTurn();
    }
  }

  private _nextPlayerTurn() {
    this.currentPlayer =
      this.currentPlayer + 1 < this.players.length ? this.currentPlayer + 1 : 0;
  }

  public stopGame(winner: Player = null) {
    this._gameIsOn = false;
    logFinalArrangement(this);
    logGameResult(this, winner);
  }

  public get gameOver() {
    return !this._gameIsOn;
  }
}
