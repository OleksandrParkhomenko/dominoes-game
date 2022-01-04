import DominoesGame from "./src/game";

if (process.argv.length == 3 && process.argv[2] === "--logs") {
  const game = new DominoesGame(true);
  game.startGame();
} else {
  const game = new DominoesGame();
  game.startGame();
}
