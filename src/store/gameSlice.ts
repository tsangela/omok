import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { BoardValue, Players } from '../utils/types'
import { BOARD_SIZE } from '../utils/constants'
import { OmokPieceType } from '../utils/enums'

interface GameState {
  players: Players;
  turn: number;
  // values: BoardValue[];
};

const initialState: GameState = {
  players: [],
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
    setTurn: (state, action: PayloadAction<number>) => {
      state.turn = action.payload;
    },
    setPlayerOne: (state, action: PayloadAction<OmokPieceType>) => {
      const { players } = state;
      players[0] = action.payload;
      state.players = [ ...players ];
    },
    setPlayerTwo: (state, action: PayloadAction<OmokPieceType>) => {
      const { players } = state;
      players[1] = action.payload;
      state.players = [ ...players ];
    },
    // setBoardValues: (state, action: PayloadAction<BoardValue[]>) => {
    //   state.values = action.payload;
    // },
  },
});

export const {
  clearBoard,
  incrementTurn,
  setPlayerOne,
  setPlayerTwo,
} = gameSlice.actions;

// export const selectBoardValues = (state: RootState) => state.game.values;
export const selectTurn = (state: RootState) => state.game.turn;
export const selectPlayers = (state: RootState) => state.game.players;
export const selectPlayerOne = (state: RootState) => state.game.players[0];
export const selectPlayerTwo = (state: RootState) => state.game.players[1];

export default gameSlice.reducer;
