import { OmokPieceType } from "./enums";

export type Id = number;

export type Item = {
  readonly id: Id;
  readonly name: string;
  url: string;
};

export type BoardValue = OmokPieceType | undefined;
