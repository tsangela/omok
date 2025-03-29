import { Player } from "./types"

const STORAGE_KEY = "PLAYERS";

type StoredPlayers = { [id: string]: Player };

// todo: do something about saved index
export function savePlayerProgress(player: Player) {
  if (!player.name) {
    console.error("Failed to save player progress", player);
    return;
  }

  // Retrieve stored player data
  const json = localStorage.getItem(STORAGE_KEY);
  const players: StoredPlayers = json ? JSON.parse(json) : {};

  // Update stored player data
  players[player.name] = player;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function loadPlayerProgress(name: string): Player | undefined {
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
