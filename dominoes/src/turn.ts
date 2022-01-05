import Piece from "./piece";
import { Player } from "./player";

export enum Rotation {
  /* Explanation: 
    Piece { leftSide: 1, rightSide: 2, isDouble: false, rotation: 0 } 
    is placed directly with 1 dot on the left and 2 dots on the right.
    
    The same piece but with rotation equal 2 - Piece { leftSide: 1, rightSide: 2, isDouble: false, rotation: 1 }
    is placed 180 degrees rotated with 2 dots on the left and 1 dot on the right.

    Vertical rotation is for double pieces and means that double piece 
    e.g. Piece { leftSide: 6, rightSide: 6, isDouble: true, rotation: 2 } is placed vertically.
  */
  Direct = 0,
  Rotated = 1,
  Vertical = 2,
}

export enum Placement {
  ToTheLeft = 0,
  ToTheRight = 1,
}

export class Turn {
  piece: Piece;
  player: Player;
  rotation: Rotation;
  placement: Placement;
  number: number;

  constructor(
    piece: Piece,
    player: Player,
    rotation: Rotation,
    placement: Placement,
    number: number
  ) {
    this.piece = piece;
    this.player = player;
    this.rotation = rotation;
    this.placement = placement;
    this.number = number;
  }
}
