import skins from "./data/skins.json";
import ears from "./data/ears.json";
import { buildRequestUrl, Endpoint, Method, random } from "./apiUtils";
import { Face, Hair } from "../utils/types";

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

// todo: use memo?
export const getEars = () => ears;

export const getSkins = () => skins;

// Retrieves the list of character face numerical ids
async function getFaces() {
  const response = await fetch(buildRequestUrl(Endpoint.Faces));
  if (!response.ok) {
    throw new Error(`Failed to fetch faces: ${response.status}`);
  }
  const data: Response<Face[]> = await response.json();
  return data?.result?.map(face => face.faceId);
}
// Retrieves the list of character hair numerical ids
async function getHairs() {
  const response = await fetch(buildRequestUrl(Endpoint.Hairs));
  if (!response.ok) {
    throw new Error(`Failed to fetch faces: ${response.status}`);
  }
  const data: Response<Hair[]> = await response.json();
  return data?.result?.map(hair => hair.hairId);
}

// Creates a customized character image
export async function makeCustomCharacterImage(request: CharacterRequest) {
  const response = await fetch(`${buildRequestUrl(Endpoint.Character)}/render`, {
    method: Method.Post,
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.status}`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export async function getRandomCharacterImage() {
  const request: CharacterRequest = {
    skin: random(skins),
    faceId: 20000,
    hairId: 30000,
    pose: "standingOneHanded",
    poseFrame: 1,
    faceEmote: "smile",
    faceFrame: 0,
    ears: random(ears),
    itemIds: [
        1060002,
        1040193
    ],
    effectFrame: 0,
  }
  return makeCustomCharacterImage(request);
}

type CharacterRankResponse = {
  characterName: string,
  characterImgURL: string,
}

export async function getCharacterImage(name: string) {
  if (!name) {
    throw new Error(`Cannot search for character '${name}'`);
  }
  const requestUrl = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/na?type=overall&id=weekly&character_name=${name}`
  try {
    const response = await fetch(requestUrl, {
      method: Method.Get,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
    const data: CharacterRankResponse = await response.json();
    return data.characterImgURL;
  } catch (error) {
    console.error(`Failed to fetch character image for ${name}`);
    return "https://msavatar1.nexon.net/Character/NILBICJDEEPALBMDKBIMKNNAJLCGDKKDCELGIEEIMFNFPDDLCLJKAKADFHNEAIPABHAPMCKGCDHHABFKJDMOBPPNNLJCELKIPPIHGPMAEIHEFNMEDBDLDMIHIPJHHEPLLNPJADDPLAINPFHAJDIDEKEJJOMGJAKAMDBBEPDFCPCPECFJGNAFONJAKIDKPAIMNFLMCPDEHDLKGBMHIGIHBDBKGHIKPBOIKHPIEEAEIAINPBNPLEMMDPEOHACNCICP.png";
  }
}
