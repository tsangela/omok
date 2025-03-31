import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Player, Players, Score } from '../utils/types'
import { OmokPieceType, ScoreType } from '../utils/enums'
import { OmokPieces } from '../api/omok';
import { nextTurn } from '../utils/validation';
import { savePlayerProgress } from '../utils/localStorage';

interface GameState {
  players: Players;
  turn: number; // todo: rename to turnIndex?
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
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearBoard: (state) => ({
      ...initialState,
      players: state.players, // Keep player progress
    }),
    clearGame: () => initialState,
    incrementTurn: (state) => {
      state.turn = nextTurn(state.turn);
    },
    setPlayer: (state, action: PayloadAction<{ index: number, player: Player }>) => {
      const { players } = state;
      const { index, player } = action.payload;
      players[index] = player;
      state.players = players;
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
    setPlayerPiece: (state, action: PayloadAction<{ index: number, piece: OmokPieceType }>) => {
      const { players } = state;
      const { index, piece } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index].piece = piece;
      players[index].name = OmokPieces[piece].name;
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
  },
});

export const {
  clearBoard,
  clearGame,
  incrementTurn,
  // setPlayer, // todo: delete
  setPlayerImageUrl,
  // setPlayerPiece, // todo: delete
  setPlayerScore,
  setPlayerInfo,
} = gameSlice.actions;

export const selectTurn = (state: RootState) => state.game.turn;
export const selectPlayers = (state: RootState) => state.game.players;
export const selectCurrentPlayer = createSelector([selectPlayers, selectTurn], (players, index) => players[index]);

export default gameSlice.reducer;
