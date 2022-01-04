import Board from "./board";
import Piece from "./piece";
import Player from "./player";

export default class DominoesGame {
  players: Player[];
  winner: Player;
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
    // choosing player holding the highest value piece to start the game
    var tempHighestValuePiece: Piece = this.players[0].pieces[0];
    var tempHighestValuePiecePlayer = 0;
    for (var [index, player] of this.players.entries()) {
      if (player.hasPieces) {
        for (var piece of player.pieces) {
          if (
            tempHighestValuePiece.leftSide + tempHighestValuePiece.rightSide <
              piece.leftSide + piece.rightSide ||
            (tempHighestValuePiece.leftSide +
              tempHighestValuePiece.rightSide ===
              piece.leftSide + piece.rightSide &&
              tempHighestValuePiece.leftSide < piece.leftSide)
          ) {
            tempHighestValuePiece = piece;
            tempHighestValuePiecePlayer = index;
          }
        }
      }
    }
    return tempHighestValuePiecePlayer;
  }

  public startGame() {
    this.initGame();

    console.log("#########################################################");
    console.log("#  Game started!\n#");
    console.log(`# ${this.players[0].nickname} VS ${this.players[1].nickname}`);
    console.log("#########################################################");

    let _prevPlayerMissedATurn = false;
    while (!this.gameOver && this.players.every((player) => player.hasPieces)) {
      if (this._logTurns) {
        console.log(
          `\n##  Now it's ${this.players[this.currentPlayer].nickname}'s turn.`
        );
        this.board.showCurrentState();
        this.players.forEach((player) => player.showCurrentPieces());
      }

      if (this.players[this.currentPlayer].makeMove(this.board)) {
        if (!this.players[this.currentPlayer].hasPieces) {
          this.stopGame(this.players[this.currentPlayer]);
        } else {
          _prevPlayerMissedATurn = false;
          this._nextPlayerTurn();
        }
      } else if (_prevPlayerMissedATurn && this.board.hasNoPiecesInThePile) {
        this.stopGame();
      } else {
        _prevPlayerMissedATurn = true;
        if (this._logTurns) {
          console.log(
            `##  ${this.players[this.currentPlayer].nickname} skips the turn.`
          );
        }
        this._nextPlayerTurn();
      }
    }
  }

  private _nextPlayerTurn() {
    this.currentPlayer =
      this.currentPlayer + 1 < this.players.length ? this.currentPlayer + 1 : 0;
  }

  public stopGame(winner: Player = null) {
    this._gameIsOn = false;
    this.winner = winner;
    this.board.showFinalArrangement(this.players);
    console.log("#  Game over. See final arrangement above.\n#");
    if (winner) {
      console.log(`# ${this.winner.nickname} won.`);
    } else {
      console.log("# It's a draw. =(");
    }
    const colorCyan = "\x1b[36m%s\x1b[0m";
    const colorYellow = "\x1b[33m%s\x1b[0m";
    console.log("#########################################################");
  }

  public get gameOver() {
    return !this._gameIsOn;
  }
}
