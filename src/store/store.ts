import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import assetsReducer from './assetsSlice'

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    game: gameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch