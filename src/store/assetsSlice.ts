import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Ear, Face, Hair, Skin } from '../utils/types';

type FetchStatus = {
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
}

type Asset<T> = FetchStatus & { data: T };

interface AssetsState {
  ears: Asset<Ear[]>;
  faces: Asset<Face[]>;
  hairs: Asset<Hair[]>;
  skins: Asset<Skin[]>;
};

const setFetchStatus = <T>(asset: Asset<T>, status: FetchStatus) => {
  const { isError, isFetching, isSuccess } = status;
  asset.isError = isError;
  asset.isFetching = isFetching;
  asset.isSuccess = isSuccess;
}

const buildResponseState = <T>(data: T): Asset<T> => ({
  isError: false,
  isFetching: false,
  isSuccess: false,
  data,
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
      state.ears.data = action.payload;
      setFetchStatus(state.ears, { isError: false, isFetching: false, isSuccess: true });
    },
    setEarsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      setFetchStatus(state.ears, action.payload);
    },
    setFaces: (state, action: PayloadAction<Face[]>) => {
      state.faces.data = action.payload;
      setFetchStatus(state.faces, { isError: false, isFetching: false, isSuccess: true });
    },
    setFacesFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      setFetchStatus(state.faces, action.payload);
    },
    setHairs: (state, action: PayloadAction<Hair[]>) => {
      state.hairs.data = action.payload;
      setFetchStatus(state.hairs, { isError: false, isFetching: false, isSuccess: true });
    },
    setHairsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      setFetchStatus(state.hairs, action.payload);
    },
    setSkins: (state, action: PayloadAction<Skin[]>) => {
      state.skins.data = action.payload;
      setFetchStatus(state.skins, { isError: false, isFetching: false, isSuccess: true });
    },
    setSkinsFetchStatus: (state, action: PayloadAction<FetchStatus>) => {
      setFetchStatus(state.skins, action.payload);
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
export const selectFaces = (state: RootState) => state.assets.faces.data;
export const selectHairs = (state: RootState) => state.assets.hairs.data;
export const selectSkins = (state: RootState) => state.assets.skins.data;

export default assetsSlice.reducer;
