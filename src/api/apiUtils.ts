export const MAPLESTORY_API_HOST = "https://api.maplestory.net";

export enum Method {
  Get = "GET",
  Post = "POST",
}

export enum Endpoints {
  Character = "character",
  Faces = "faces",
  Hairs = "hairs",
  Item = "item",
}

export const buildRequestUrl = (endpoint: string) => `${MAPLESTORY_API_HOST}/${endpoint}`;

export async function fetchImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export const random = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
