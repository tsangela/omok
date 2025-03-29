import { BoardValue, Players } from "./types";

const Messages = {
  MissingPlayerSelection: "Select your omok pieces to proceed.",
  OccupiedTile: "This space is already occupied by another omok piece.",
  GenericError: "Cannot execute move.",
}

export const inBound = (index: number, array: any[]) => index >= 0 && index < array.length;

export const arePlayersSelected = (players: Players) => players.every(player => !!player.piece);

function validateMove(index: number, values: BoardValue[]): string {
  if (!inBound(index, values)) {
    return Messages.GenericError;
  }

  if (values[index]) {
    return Messages.OccupiedTile;
  }

  return '';
}