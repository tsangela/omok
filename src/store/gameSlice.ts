import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Player, PlayerData, PlayerProfile, Players, Score } from '../utils/types'
import { OmokPieceType, ScoreType } from '../utils/enums'
import { nextTurnIndex } from '../utils/validation';
import { loadPlayerProgress, savePlayerProgress } from '../utils/localStorage';

interface GameState {
  players: Players;
  turnIndex: number; // todo: rename to turnIndex?
};

export const basePlayer = (index: number): Player => ({
  index,
  name: '',
  imageUrl: '',
  score: {
    [ScoreType.Point]: 0,
    [ScoreType.Win]: 0,
    [ScoreType.Loss]: 0,
    [ScoreType.Tie]: 0,
  },
});

const initialState: GameState = {
  players: [basePlayer(0), basePlayer(1)],
  turnIndex: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGame: () => initialState,

    incrementTurn: (state) => {
      state.turnIndex = nextTurnIndex(state.turnIndex);
    },

    initializePlayers: (state, action: PayloadAction<Players>) => {
      const players = action.payload;
      state.players = players.map((p) => ({
        ...p,
        ...loadPlayerProgress(p.name),
      })) as Players;
    },

    setPlayerOverrides: (state, action: PayloadAction<{ index: number, overrides: Partial<Player> }>) => {
      const { players } = state;
      const { index, overrides } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index] = {
        ...players[index],
        ...overrides,
      };
      state.players = players;
    },

    setPlayerProfile: (state, action: PayloadAction<{ index: number, profile: PlayerProfile }>) => {
      const { players } = state;
      const { index, profile } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index] = {
        ...players[index],
        ...profile,
      };
      state.players = players;
    },

    setPlayerScore: (state, action: PayloadAction<{ index: number, score: Score }>) => {
      const { players } = state;
      const { index, score } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index].score = score;
      players.forEach(savePlayerProgress); // todo: move this somewhere else
      state.players = players;
    },

    setTurnIndex: (state, action: PayloadAction<number>) => {
      state.turnIndex = action.payload;
    },
  },
});

export const {
  clearGame,
  incrementTurn,
  initializePlayers,
  setPlayerOverrides,
  setPlayerProfile,
  setPlayerScore,
  setTurnIndex,
} = gameSlice.actions;

export const selectPlayers = (state: RootState) => state.game.players;
export const selectTurnIndex = (state: RootState) => state.game.turnIndex;

export const selectCurrentPlayer = createSelector([selectPlayers, selectTurnIndex], (players, index) => players[index]);

export default gameSlice.reducer;
