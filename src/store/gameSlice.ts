import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Player, Players } from '../utils/types'
import { OmokPieceType, ScoreType } from '../utils/enums'

interface GameState {
  players: Players;
  turn: number;
  // values: BoardValue[];
};

const buildPlayer = (order: number): Player => ({
  order, // todo: rename to index
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
  players: [ buildPlayer(0), buildPlayer(1) ],
  turn: 0,
  // values: Array(BOARD_SIZE).fill(undefined),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearBoard: () => initialState,
    incrementTurn: (state) => {
      state.turn = (state.turn + 1) % state.players.length;
    },
    setPlayerPiece: (state, action: PayloadAction<{ index: number, piece: OmokPieceType }>) => {
      const { players } = state;
      const { index, piece } = action.payload;
      if (!players[index]) {
        console.error(`No player found at index ${index}`);
        return;
      }
      players[index].piece = piece;
      state.players = [ ...players ];
    },
    setTurn: (state, action: PayloadAction<number>) => {
      state.turn = action.payload;
    },
    // setBoardValues: (state, action: PayloadAction<BoardValue[]>) => {
    //   state.values = action.payload;
    // },
  },
});

export const {
  clearBoard,
  incrementTurn,
  setPlayerPiece,
} = gameSlice.actions;

// export const selectBoardValues = (state: RootState) => state.game.values;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectPlayers = (state: RootState) => state.game.players;

export default gameSlice.reducer;
