import { Player } from "./types"

const STORAGE_KEY = "PLAYERS";

type PlayerData = Pick<Player, "name" | "imageUrl" | "score">;
type StoredPlayers = { [id: string]: PlayerData };

const toPlayerData = ({ name, imageUrl, score }: Player): PlayerData => ({ name, imageUrl, score });

export function savePlayerProgress(player: Player) {
  if (!player.name) {
    console.error("Failed to save player progress", player);
    return;
  }

  // Retrieve stored player data
  const json = localStorage.getItem(STORAGE_KEY);
  const players: StoredPlayers = json ? JSON.parse(json) : {};

  // Update stored player data
  players[player.name] = toPlayerData(player);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function loadPlayerProgress(name: string): PlayerData | undefined {
  if (!name) {
    console.error("Failed to load player progress", name);
    return undefined;
  }

  // Retrieve stored player data
  const json = localStorage.getItem(STORAGE_KEY);
  const players: StoredPlayers = json ? JSON.parse(json) : {};
  return players[name];
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
