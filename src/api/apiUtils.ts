export const MAPLESTORY_API_BASE_URL = "https://api.maplestory.net";

export enum Method {
  Get = "GET",
  Post = "POST",
}

export enum Endpoint {
  Character = "character",
  Faces = "faces",
  Hairs = "hairs",
  Item = "item",
}

export const buildRequestUrl = (endpoint: string) => `${MAPLESTORY_API_BASE_URL}/${endpoint}`;

export async function fetchImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export const random = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
