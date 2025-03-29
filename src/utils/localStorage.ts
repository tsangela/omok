import { Player } from "./types"

const STORAGE_KEY = "PLAYERS";

type StoredPlayers = { [id: string]: Player };

export function savePlayerProgress(player: Player) {
  if (!player.name) {
    console.error("Failed to save player progress", player);
    return;
  }

  // Retrieve any stored player data
  const json = localStorage.getItem(STORAGE_KEY);
  const players: StoredPlayers = json ? JSON.parse(json) : {};

  // Update stored player data
  players[player.name] = player;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
