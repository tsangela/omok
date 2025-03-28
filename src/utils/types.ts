import { OmokPieceType } from "./enums";

export type Id = number;

export type Item = {
  readonly id: Id;
  readonly name: string;
  url: string;
};

export type BoardValue = OmokPieceType | undefined;

export type Players = [p1?: OmokPieceType, p2?: OmokPieceType];

export type Face = {
  faceId: number,
  name: string,
};

export type Hair = {
  hairId: number,
  name: string,
};

export type Skin = string;

export type Ear = string;