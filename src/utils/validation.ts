import { BoardValue } from "./types";

const Messages = {
  MissingPlayerSelection: "Select your omok pieces to proceed.",
  OccupiedTile: "This space is already occupied by another omok piece.",
  GenericError: "Cannot execute move.",
}

const inBound = (index: number, array: any[]) => index >= 0 && index < array.length;

function validateMove(index: number, values: BoardValue[]): string {
  if (!inBound(index, values)) {
    return Messages.GenericError;
  }

  if (values[index]) {
    return Messages.OccupiedTile;
  }

  return '';
}