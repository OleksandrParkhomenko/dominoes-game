import Board from "./board";
import DominoesGame from "./game";
import Piece from "./piece";
import Player from "./player";
import { Placement, Rotation, Turn } from "./turn";

export const logTurnInGame = (game: DominoesGame) => {
  console.log(
    `\n##  Now it's ${game.players[game.currentPlayer].nickname}'s turn.`
  );
  logBoardState(game.board);
  game.players.forEach((player) => logPlayerCurrentPieces(player));
};

export const logGameStart = (players: Player[]) => {
  console.log("#########################################################");
  console.log("# Game started!\n#");
  console.log(`# ${players[0].nickname} VS ${players[1].nickname}`);
  console.log("#########################################################");
};

export const logSkipTurn = (player: Player) => {
  console.log(`##  ${player.nickname} skips the turn.`);
};

export const logGameResult = (game: DominoesGame, winner: Player) => {
  console.log("\n#########################################################");
  console.log(
    `# ${game.players[0].nickname} has ${game.players[0].pieces.length} left`
  );
  console.log(
    `# ${game.players[1].nickname} has ${game.players[1].pieces.length} left`
  );
  console.log(`# It took ${game.board.turns.length} turn(-s)`);
  console.log("#########################################################");
  console.log("# Game over. See final arrangement above.\n#");
  if (winner) {
    console.log(`# ${winner.nickname} won.`);
  } else {
    console.log("# It's a draw. =(");
  }
  console.log("#########################################################");
};

export const logBoardState = (board: Board) => {
  console.log("\n#########################################################");
  console.log(`##    Current board state:\n##`);
  console.log(`##  Pieces in pile: ${board.pile.length}`);
  console.log(`##  Pieces on board: ${board.turns.length}`);
  console.log(`##  Left Side Number: ${board.leftSideNumber}`);
  console.log(`##  Right Side Number: ${board.rightSideNumber}`);
  console.log("#########################################################");
};

export const logPiece = (piece: Piece) => {
  const pieceTemplate =
    "\t _____ \t\n" +
    `\t | ${piece.leftSide} |\t\n` +
    "\t ----- \t\n" +
    `\t | ${piece.rightSide} |\t\n` +
    "\t ⎻⎻⎻⎻⎻ \t";
  console.log(pieceTemplate);
};

export const logTurnInFinalArrangement = (turn: Turn, color: string) => {
  switch (turn.rotation) {
    case Rotation.Direct:
      console.log(
        color,
        `\t _____\n\t | ${turn.piece.leftSide} |\n\t -----\n\t | ${turn.piece.rightSide} |\n\t ⎻⎻⎻⎻⎻`
      );
      break;
    case Rotation.Rotated:
      console.log(
        color,
        `\t _____\n\t | ${turn.piece.rightSide} |\n\t -----\n\t | ${turn.piece.leftSide} |\n\t ⎻⎻⎻⎻⎻`
      );
      break;
    default:
      console.log(
        color,
        `\t|${turn.piece.rightSide} | ${turn.piece.leftSide}|`
      );
      break;
  }
};

export const logFinalArrangement = (game: DominoesGame) => {
  const colorCyan = "\x1b[36m%s\x1b[0m";
  const colorYellow = "\x1b[33m%s\x1b[0m";
  const colorRed = "\x1b[31m%s\x1b[0m";

  console.log("\n#########################################################");
  console.log("# Final arrangement of pieces:");

  console.log(`#  *pieces are colored:`);
  console.log(colorRed, "#  for first piece");
  console.log(colorCyan, `#  for ${game.players[0].nickname}`);
  console.log(colorYellow, `#  for ${game.players[1].nickname}`);

  game.board.turns.sort((a, b) =>
    a.placement === b.placement
      ? a.placement === Placement.ToTheLeft
        ? b.number - a.number
        : a.number - b.number
      : a.placement - b.placement
  );
  for (var turn of game.board.turns) {
    const color =
      turn.player === game.players[0]
        ? colorCyan
        : turn.player === game.players[1]
        ? colorYellow
        : colorRed;
    logTurnInFinalArrangement(turn, color);
  }
};

export const logPlayerCurrentPieces = (player: Player) => {
  console.log("#########################################################");
  console.log(`##     ${player.nickname} has ${player.pieces.length} pieces:`);
  let lineByLineDraw: string[] = ["", "", "", "", ""];
  for (var piece of player.pieces) {
    lineByLineDraw[0] += "\t _____ \t";
    lineByLineDraw[1] += `\t | ${piece.leftSide} |\t`;
    lineByLineDraw[2] += "\t ----- \t";
    lineByLineDraw[3] += `\t | ${piece.rightSide} |\t`;
    lineByLineDraw[4] += "\t ⎻⎻⎻⎻⎻ \t";
  }
  lineByLineDraw.forEach((line) => console.log(line));
  console.log("#########################################################");
};

export const logPutPiece = (piece: Piece, player: Player) => {
  console.log(`##     ${player.nickname} put piece on board:`);
  logPiece(piece);
};

export const logPickNewPiece = (piece: Piece, player: Player) => {
  console.log(`##     ${player.nickname} pick piece from pile:`);
  logPiece(piece);
};
