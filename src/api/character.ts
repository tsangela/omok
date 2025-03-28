import { buildRequestUrl, Endpoints, Method, random } from "./apiUtils";
import skins from "./data/skins.json";
import ears from "./data/ears.json";

type FaceResponse = {
  faceId: number,
  name: string,
}

type FacesResponse = {
  result: FaceResponse[]
}

// Retrieves the list of character face numerical ids
async function getFaces() {
  const response = await fetch(buildRequestUrl(Endpoints.Faces));
  if (!response.ok) {
    throw new Error(`Failed to fetch faces: ${response.status}`);
  }
  const data: FacesResponse = await response.json();
  return data?.result?.map(face => face.faceId);
}

type HairResponse = {
  hairId: number,
  name: string,
}

type HairsResponse = {
  result: HairResponse[]
}

// Retrieves the list of character hair numerical ids
async function getHairs() {
  const response = await fetch(buildRequestUrl(Endpoints.Hairs));
  if (!response.ok) {
    throw new Error(`Failed to fetch faces: ${response.status}`);
  }
  const data: HairsResponse = await response.json();
  return data?.result?.map(hair => hair.hairId);
}

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
}

// Creates a customized character image
export async function getCharacterImage(request: CharacterRequest) {
  const response = await fetch(`${buildRequestUrl(Endpoints.Character)}/render`, {
    method: Method.Post,
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch character: ${response.status}`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export async function getRandomCharacterImage() {
  const mockUrl = "https://msavatar1.nexon.net/Character/HMENAFOGKJLEHOFCNPLOBHAKFCEKMJNMNCLPFEIDAPDGGPFGDGGNLBHCELLNEPFAELKJMJOCDBMOIEMDGNCJFLGCGHONFNKIPDELFJBPIJJFIKBJKOEBEOAEBADLNFBMHBKGHOMBKKLLALJJEPKEHGILPDAIMGBIGFAEINEOCAFCLGKLDKEHFGFCOEPOJFNJBKNCLNNMIEAJBPKPFILFEJAGIDCPAAENMBGODHGCNBOIOKPGJDHIFPCAGJIFGFKB.png";
  return mockUrl;
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
  return getCharacterImage(request)
}
