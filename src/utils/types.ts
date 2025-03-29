import { OmokPieceType, ScoreType } from "./enums";

export type Id = number;

export type Item = {
  readonly id: Id;
  readonly name: string;
  url: string;
};

export type Face = {
  faceId: Id,
  name: string,
};

export type Hair = {
  hairId: Id,
  name: string,
};

export type Skin = string;

export type Ear = string;

export type Score = {
  [ScoreType.Point]: number;
  [ScoreType.Win]: number;
  [ScoreType.Loss]: number;
  [ScoreType.Tie]: number;
}

export type Player = {
  order: number;
  name: string;
  imageUrl: string;
  piece?: OmokPieceType;
  score: Score;
}

export type Players = [p1: Player, p2: Player];

export type BoardValue = OmokPieceType | undefined;
