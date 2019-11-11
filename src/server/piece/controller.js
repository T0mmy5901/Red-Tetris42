import Game from "../game/class";
import { updateSpectresClientSide } from "../room/controller";
import { startGame } from "../game/controller";
import { enumKeys } from "../../constants/constants";
import { updatePlayerClientSide } from "../player/controller";

export const onKeyPressed = (code, socket, io) => {
  const player = Game.findPlayer(socket.id);
  if (!Object.values(enumKeys).includes(code) || !(player && player.room))
    return;
  if (player.inGame) {
    const { heap } = player;
    switch (code) {
      case enumKeys.ARROW_LEFT:
        player.piece.moveLeft(heap);
        break;
      case enumKeys.ARROW_RIGHT:
        player.piece.moveRight(heap);
        break;
      case enumKeys.ARROW_DOWN:
        handleArrowDown(player, heap, io);
        break;
      case enumKeys.ARROW_UP:
        player.piece.rotate(heap);
        break;
      case enumKeys.SPACE:
        handleSpace(player, io);
        break;
      default:
        break;
    }
    updatePlayerClientSide(player, io);
  } else if (player.isHost && code === enumKeys.ENTER) {
    startGame(player.room, io);
  }
};

const handleSpace = (player, io) => {
  player.piece.hardDrop();
  player.updateHeap();
  updateSpectresClientSide(player.room, io);
};

const handleArrowDown = (player, heap, io) => {
  if (!player.piece.moveDown(heap)) {
    player.updateHeap();
    updateSpectresClientSide(player.room, io);
  }
};
