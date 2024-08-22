import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RepoProps } from '@/components/RepoTile';
import { getFavourites, saveFavourites } from '../ls';

export interface FavouriteState {
  favourites: RepoProps[]
}

const initialState: FavouriteState = {
  favourites: getFavourites() || []
}

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<RepoProps>) => {
      if (!state.favourites.find(repo => repo.id === action.payload.id)) {
        state.favourites.push(action.payload);
        saveFavourites(state.favourites);
      }
    },
    remove: (state, action: PayloadAction<RepoProps>) => {
      state.favourites = state.favourites.filter(repo => repo.id !== action.payload.id);
      saveFavourites(state.favourites);
    },
  }
})

export const { add, remove } = favouriteSlice.actions

export default favouriteSlice.reducer