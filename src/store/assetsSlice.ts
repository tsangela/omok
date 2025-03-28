import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Ear, Face, Hair, Skin } from '../utils/types';

interface AssetsState {
  ears: Ear[];
  faces: Face[];
  hairs: Hair[];
  skins: Skin[];
};

const initialState: AssetsState = {
  ears: [],
  faces: [],
  hairs: [],
  skins: [],
};

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setEars: (state, action: PayloadAction<Ear[]>) => {
      state.ears = action.payload;
    },
    setFaces: (state, action: PayloadAction<Face[]>) => {
      state.faces = action.payload;
    },
    setHair: (state, action: PayloadAction<Hair[]>) => {
      state.hairs = action.payload;
    },
    setSkins: (state, action: PayloadAction<Skin[]>) => {
      state.skins = action.payload;
    },
  },
});

export const { 
  setEars,
  setFaces,
  setHair,
  setSkins,
} = assetsSlice.actions;

export const selectEars = (state: RootState) => state.assets.ears;
export const selectFaces = (state: RootState) => state.assets.faces;
export const selectHairs = (state: RootState) => state.assets.hairs;
export const selectSkins = (state: RootState) => state.assets.skins;

export default assetsSlice.reducer;
