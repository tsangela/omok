import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { BASE_POINTS } from '../utils/constants';
import { ScoreType } from '../utils/enums'
import { savePlayerProgress } from '../utils/localStorage';
import { Player, Players } from '../utils/types'
import { nextTurnIndex } from '../utils/validation';

interface GameState {
  players: Players;
  turnIndex: number;
};

export const basePlayer = (index: number): Player => ({
  index,
  name: '',
  imageUrl: '',
  score: {
    [ScoreType.Point]: BASE_POINTS,
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

    incrementTurnIndex: (state) => {
      state.turnIndex = nextTurnIndex(state.turnIndex);
    },

    setPlayerOverrides: (state, action: PayloadAction<{ index: number, overrides: Partial<Player>, save?: boolean }>) => {
      const { players } = state;
      const { index, overrides, save } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }

      players[index] = {
        ...players[index],
        ...overrides,
      };

      if (save) {
        players.forEach(savePlayerProgress); // todo: move this somewhere else
      }

      state.players = players;
    },

    setTurnIndex: (state, action: PayloadAction<number>) => {
      state.turnIndex = action.payload;
    },
  },
});

export const {
  clearGame,
  incrementTurnIndex,
  setPlayerOverrides,
  setTurnIndex,
} = gameSlice.actions;

export const selectPlayers = (state: RootState) => state.game.players;
export const selectTurnIndex = (state: RootState) => state.game.turnIndex;

export const selectCurrentPlayer = createSelector([selectPlayers, selectTurnIndex], (players, index) => players[index]);

export default gameSlice.reducer;
