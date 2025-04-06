import { OmokPieceType, ScoreType } from "./enums";

export type Id = number;

export type Item = {
  readonly id: Id;
  readonly name: string;
  url: string;
};

export type Face = {
  faceId: Id;
  name: string;
};

export type Hair = {
  hairId: Id;
  name: string;
};

export type Skin = string;

export type Ear = string;

export type Score = {
  [ScoreType.Point]: number;
  [ScoreType.Win]: number;
  [ScoreType.Loss]: number;
  [ScoreType.Tie]: number;
}

export type RawScore<T> = Exclude<T, ScoreType.Point>;

// index, name, piece are only relevant for current game
// displayName, score are saved in local storage
// imageUrl may be save in local storage if it is a Nexon hosted image url
export type Player = {
  // Turn index of the player for the current game
  index: number;
  // Name inputted by the player during game set up
  name: string;
  // Omok piece of the play for the current game
  piece?: OmokPieceType;
  // Url of the character image used for the player
  imageUrl: string;
  // Total score of the player across all played games
  score: Score;
}

export type PlayerSelections = Pick<Player, "name" | "piece">;

// Player fields that should be persisted between games 
export type PlayerData = Partial<Pick<Player, "name" | "imageUrl" | "score">>;

export type Players = [p1: Player, p2: Player];

export type BoardValue = OmokPieceType | undefined;

export type CharacterData = {
  characterName: string;
  characterImgURL: string;
}