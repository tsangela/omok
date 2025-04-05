import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Ear, Face, Hair, Skin } from '../utils/types';

type FetchStatus = {
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
}

type Asset<T> = {
  data: T;
  status: FetchStatus;
};

interface AssetsState {
  ears: Asset<Ear[]>;
  faces: Asset<Face[]>;
  hairs: Asset<Hair[]>;
  skins: Asset<Skin[]>;
};

const buildResponseState = <T>(data: T): Asset<T> => ({
  data,
  status: {
    isError: false,
    isFetching: false,
    isSuccess: false,
  },
});

const initialState: AssetsState = {
  ears: buildResponseState([]),
  faces: buildResponseState([]),
  hairs: buildResponseState([]),
  skins: buildResponseState([]),
};

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setEars: (state, action: PayloadAction<Ear[]>) => {
      state.ears = {
        data: action.payload,
        status: {
          isError: false,
          isFetching: false,
          isSuccess: true,
        },
      };
    },
    setEarsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.ears.status = action.payload;
    },
    setFaces: (state, action: PayloadAction<Face[]>) => {
      state.faces = {
        data: action.payload,
        status: {
          isError: false,
          isFetching: false,
          isSuccess: true,
        },
      };
    },
    setFacesFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.faces.status = action.payload;
    },
    setHairs: (state, action: PayloadAction<Hair[]>) => {
      state.hairs = {
        data: action.payload,
        status: {
          isError: false,
          isFetching: false,
          isSuccess: true,
        },
      };
    },
    setHairsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.hairs.status = action.payload;
    },
    setSkins: (state, action: PayloadAction<Skin[]>) => {
      state.skins = {
        data: action.payload,
        status: {
          isError: false,
          isFetching: false,
          isSuccess: true,
        },
      };
    },
    setSkinsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.skins.status = action.payload;
    },
  },
});

export const { 
  setEars,
  setEarsFetchStatus,
  setFaces,
  setFacesFetchStatus,
  setHairs,
  setHairsFetchStatus,
  setSkins,
  setSkinsFetchStatus,
} = assetsSlice.actions;

export const selectEars = (state: RootState) => state.assets.ears.data;
export const selectEarsFetchStatus = (state: RootState) => state.assets.ears.status;

export const selectFaces = (state: RootState) => state.assets.faces.data;
export const selectFacesFetchStatus = (state: RootState) => state.assets.faces.status;
export const selectFaceIds = createSelector([selectFaces], faces => faces.map(face => face.faceId));

export const selectHairs = (state: RootState) => state.assets.hairs.data;
export const selectHairsFetchStatus = (state: RootState) => state.assets.hairs.status;
export const selectHairIds = createSelector([selectHairs], hairs => hairs.map(hair => hair.hairId));

export const selectSkins = (state: RootState) => state.assets.skins.data;
export const selectSkinsFetchStatus = (state: RootState) => state.assets.skins.status;

export default assetsSlice.reducer;
