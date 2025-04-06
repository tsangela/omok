import { PLAYER_COUNT, IMAGE_CACHE_DURATION } from "./constants";

export const inBound = (index: number, array: any[]) => index >= 0 && index < array.length;

export const nextTurnIndex = (index: number) => (index + 1) % PLAYER_COUNT;

export const isNexonHostedImageUrl = (url: string) => url.includes("msavatar1.nexon.net");

export const imageNeedsRefresh = (timestamp: number | undefined) => timestamp === undefined || Date.now() - timestamp > IMAGE_CACHE_DURATION;
