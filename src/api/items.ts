import { OmokPieceType } from "../utils/enums";
import { Id, Item } from "../utils/types";
import { buildRequestUrl, Endpoints, fetchImage, MAPLESTORY_API_HOST } from "./apiUtils";

export const OmokPieces: { [key in OmokPieceType]: Item } = {
  [OmokPieceType.Slime]: {
    id: 4030000,
    name: "Slime",
    url: "https://api.maplestory.net/item/4030000/iconRaw",
  },
  [OmokPieceType.Mushroom]: {
    id: 4030001,
    name: "Mushroom",
    url: "https://api.maplestory.net/item/4030001/iconRaw",
  },
  [OmokPieceType.Octopus]: {
    id: 4030010,
    name: "Octopus",
    url: "https://api.maplestory.net/item/4030010/iconRaw",
  },
  [OmokPieceType.Pig]: {
    id: 4030011,
    name: "Pig",
    url: "https://api.maplestory.net/item/4030011/iconRaw",
  },
  [OmokPieceType.PinkTeddy]: {
    id: 4030014,
    name: "Pink Teddy",
    url: "https://api.maplestory.net/item/4030014/iconRaw",
  },
  [OmokPieceType.PandaTeddy]: {
    id: 4030015,
    name: "Panda Teddy",
    url: "https://api.maplestory.net/item/4030015/iconRaw",
  },
  [OmokPieceType.Bloctopus]: {
    id: 4030013,
    name: "Bloctopus",
    url: "https://api.maplestory.net/item/4030013/iconRaw",
  },
  [OmokPieceType.Trixter]: {
    id: 4030016,
    name: "Trixter",
    url: "https://api.maplestory.net/item/4030016/iconRaw",
  },
}

const buildItemUrl = (id: Id) => `${buildRequestUrl(Endpoints.Item)}/${id}/iconRaw`;

export async function getOmokPieces() {
  return Promise.all(Object.values(OmokPieces).map(({ id }) => fetchImage(buildItemUrl(id))));
}
