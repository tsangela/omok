import { Player, PlayerProfile } from "./types"

const STORAGE_KEY = "PLAYERS";

type StoredProfiles = { [id: string]: PlayerProfile };

const toPlayerProfile = ({ name, imageUrl, score }: Player): PlayerProfile => ({ name, imageUrl, score });

const key = (name: string) => name.toLowerCase();

// todo: rename to storePlayerProfile
export function savePlayerProgress(player: Player) {
  if (!player.name) {
    console.error("Failed to save player progress", player);
    return;
  }

  // Retrieve stored player data
  const json = localStorage.getItem(STORAGE_KEY);
  const players: StoredProfiles = json ? JSON.parse(json) : {};

  // Update stored player data
  players[key(player.name)] = toPlayerProfile(player);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

// todo: rename to getStoredPlayerProfile
export function loadPlayerProgress(name: string): PlayerProfile | undefined {
  if (!name) {
    console.error("Failed to load player progress", name);
    return undefined;
  }

  // Retrieve stored player data
  const json = localStorage.getItem(STORAGE_KEY);
  const players: StoredProfiles = json ? JSON.parse(json) : {};
  return players[key(name)];
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
