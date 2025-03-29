import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Player, Players, Score } from '../utils/types'
import { OmokPieceType, ScoreType } from '../utils/enums'
import { OmokPieces } from '../api/omok';
import { nextTurn } from '../utils/validation';

interface GameState {
  players: Players;
  turn: number;
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
    setPlayerPiece: (state, action: PayloadAction<{ index: number, piece: OmokPieceType }>) => {
      const { players } = state;
      const { index, piece } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index].piece = piece;
      players[index].name = OmokPieces[piece].name; // todo: temporary
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
      state.players = players;
    },
  },
});

export const {
  clearBoard,
  clearGame,
  incrementTurn,
  setPlayerPiece,
  setPlayerScore,
} = gameSlice.actions;

// export const selectBoardValues = (state: RootState) => state.game.values;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectPlayers = (state: RootState) => state.game.players;

export default gameSlice.reducer;
