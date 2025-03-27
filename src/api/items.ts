import { OmokPieceType } from "../utils/enums";
import { Item, ItemId } from "../utils/types";

export const OmokPieces: { [key in OmokPieceType]: Item } = {
  [OmokPieceType.Slime]: {
    id: 4030000,
    name: "Slime",
    url: "",
  },
  [OmokPieceType.Mushroom]: {
    id: 4030001,
    name: "Mushroom",
    url: "",
  },
  [OmokPieceType.Octopus]: {
    id: 4030010,
    name: "Octopus",
    url: "",
  },
  [OmokPieceType.Pig]: {
    id: 4030011,
    name: "Pig",
    url: "",
  },
  [OmokPieceType.PinkTeddy]: {
    id: 4030014,
    name: "Pink Teddy",
    url: "",
  },
  [OmokPieceType.PandaTeddy]: {
    id: 4030015,
    name: "Panda Teddy",
    url: "",
  },
  [OmokPieceType.Bloctopus]: {
    id: 4030013,
    name: "Bloctopus",
    url: "",
  },
  [OmokPieceType.Trixter]: {
    id: 4030016,
    name: "Trixter",
    url: "",
  },
}

export async function fetchImage(id: ItemId) {
  const response = await fetch(`https://api.maplestory.net/item/${id}/iconRaw`);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export async function fetchOmokPieces() {
  return Promise.all(Object.values(OmokPieces).map(({ id }) => fetchImage(id)));
}