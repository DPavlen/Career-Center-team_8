/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import mainApi from '../../utils/MainApi';
import { ICandidate, removeCandidateFromFavorites } from '../foundCandidates/foundCandidates';

export const getFavoriteCandidates = createAsyncThunk(
  'favorite-candidates/getFavoriteCandidates',
  async (_, { rejectWithValue }) => {
    try {
      const result = await mainApi.addCandidateToFavoriteList();

      return result;
    } catch (error) {
      return rejectWithValue((error as { message : string}).message);
    }
  },
);

export interface InitialState {
  candidates: ICandidate[],
  total: number;
}

const initialState: InitialState = {
  candidates: [],
  total: 0,
};

const addToFavoriteSlice = createSlice({
  name: 'favorite-candidates',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteCandidates.fulfilled, (state, { payload }) => {
      state.candidates = payload;
      state.total = payload.length;
    });
    builder.addCase(removeCandidateFromFavorites.fulfilled, (state, { payload }) => {
      state.candidates = state.candidates.filter((candidate) => candidate.id !== payload);
      state.total = state.candidates.length;
    });
  },
});

export default addToFavoriteSlice.reducer;
