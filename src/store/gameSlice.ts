import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Player, Players, Score } from '../utils/types'
import { ScoreType } from '../utils/enums'
import { nextTurn } from '../utils/validation';
import { savePlayerProgress } from '../utils/localStorage';

interface GameState {
  players: Players;
  turn: number; // todo: rename to turnIndex?
  winnerIndex: number | undefined; // todo: delete?
};

const buildPlayer = (index: number): Player => ({
  index,
  name: '',
  imageUrl: '',
  score: {
    [ScoreType.Point]: 0,
    [ScoreType.Win]: 0,
    [ScoreType.Loss]: 0,
    [ScoreType.Tie]: 0,
  },
})

const initialState: GameState = {
  players: [buildPlayer(0), buildPlayer(1)],
  turn: 0,
  winnerIndex: undefined,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGame: () => initialState,
    incrementTurn: (state) => {
      state.turn = nextTurn(state.turn);
    },
    setPlayerImageUrl: (state, action: PayloadAction<{ index: number, imageUrl: string }>) => {
      const { players } = state;
      const { index, imageUrl } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index].imageUrl = imageUrl;
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
      players.forEach(savePlayerProgress);
      state.players = players;
    },
    setPlayerInfo: (state, action: PayloadAction<{ index: number, overrides: Partial<Player> }>) => {
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
    setWinnerIndex: (state, action: PayloadAction<number>) => {
      state.winnerIndex = action.payload;
    },
  },
});

export const {
  clearGame,
  incrementTurn,
  setPlayerImageUrl,
  setPlayerInfo,
  setPlayerScore,
  setWinnerIndex,
} = gameSlice.actions;

export const selectTurn = (state: RootState) => state.game.turn;
export const selectPlayers = (state: RootState) => state.game.players;
export const selectWinnerIndex = (state: RootState) => state.game.winnerIndex;

export const selectCurrentPlayer = createSelector([selectPlayers, selectTurn], (players, index) => players[index]);
export const selectWinner = createSelector([selectPlayers, selectWinnerIndex], (players, index) => index ? players[index] : undefined);

export default gameSlice.reducer;
