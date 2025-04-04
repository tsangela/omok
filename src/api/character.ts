import skinsData from "./data/skins.json";
import earsData from "./data/ears.json";
import { buildRequestUrl, Endpoint, Method, random } from "./apiUtils";
import { Ear, Face, Hair, Id, Skin } from "../utils/types";
import { PLACEHOLDER_CHARACTER_IMAGE } from "../utils/constants";

type Response<T> = { result: T };

type CharacterRequest = {
  skin: string,
  faceId: number,
  hairId: number,
  pose: string,
  poseFrame: number,
  faceEmote: string,
  faceFrame: number,
  ears: string,
  itemIds: number[],
  effectFrame: number,
};

export const getEars = async () => Promise.resolve(earsData);

export const getSkins = async () => Promise.resolve(skinsData);

// Retrieves the list of character face numerical ids
export async function getFaces() {
  const response = await fetch(buildRequestUrl(Endpoint.Faces));
  if (!response.ok) {
    throw new Error(`Failed to fetch faces: ${response.status}`);
  }
  const data: Response<Face[]> = await response.json();
  // return data?.result?.map(face => face.faceId);
  return data?.result ?? [];
}

// Retrieves the list of character hair numerical ids
export async function getHairs() {
  const response = await fetch(buildRequestUrl(Endpoint.Hairs));
  if (!response.ok) {
    throw new Error(`Failed to fetch faces: ${response.status}`);
  }
  const data: Response<Hair[]> = await response.json();
  // return data?.result?.map(hair => hair.hairId);
  return data?.result ?? [];
}

// Creates a customized character image
export async function makeCustomCharacterImage(request: CharacterRequest) {
  try {
    const response = await fetch(`${buildRequestUrl(Endpoint.Character)}/render`, {
      method: Method.Post,
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to make custom character: ${response.status}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
    return PLACEHOLDER_CHARACTER_IMAGE;
  }
}

export async function getRandomCharacterImage(
  ears: Ear[],
  faces: Id[],
  hairs: Id[],
  skins: Skin[],
) {
  const request: CharacterRequest = {
    skin: random(skins),
    faceId: random(faces),
    hairId: random(hairs),
    pose: "standingOneHanded",
    poseFrame: 1,
    faceEmote: "default",
    faceFrame: 0,
    ears: random(ears),
    itemIds: [
      1053799, // Maple Academy Outfit (A)
    ],
    effectFrame: 0,
  }
  return makeCustomCharacterImage(request);
}

type CharacterRankResponse = {
  ranks: any[],
  // characterName: string,
  // characterImgURL: string,
}

export async function getCharacterImage(name: string) {
  if (!name) {
    throw new Error(`Cannot search for character '${name}'`);
  }
  //const requestUrl = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/na?type=overall&id=weekly&character_name=${name}`
  const requestUrl = `http://localhost:5000/${name}`
  
  try {
    const response = await fetch(requestUrl,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }}
    );
    if (!response.ok) {
      throw new Error(`Request response not ok: ${response.status}`);
    }
    const data: CharacterRankResponse = await response.json();
    return data.ranks[0].characterImgURL;
  } catch (error) {
    console.error(`Failed to fetch character image for ${name}.`, error);
    throw error;
  }
}
