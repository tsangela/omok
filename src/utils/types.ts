import { OmokPieceType } from "./enums";

export type ItemId = number;

export type Item = {
  readonly id: ItemId;
  readonly name: string;
  url: string;
};

export type BoardValue = OmokPieceType | undefined;
