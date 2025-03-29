import { PLAYER_COUNT } from "./constants";
import { Players } from "./types";

export const inBound = (index: number, array: any[]) => index >= 0 && index < array.length;

export const arePiecesSelected = (players: Players) => players.every(player => !!player.piece);

export const nextTurn = (turn: number) => (turn + 1) % PLAYER_COUNT;

export const isNexonHostedImageUrl = (url: string) => url.includes("msavatar1.nexon.net");
