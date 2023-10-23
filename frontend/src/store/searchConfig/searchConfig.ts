/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  [key: string]: string | number
}

const initialState: InitialState = {
  startIndex: 0,
  maxResults: 30,
};

const searchConfigSlice = createSlice({
  name: 'search-config',
  initialState,
  reducers: {
    addConfig: (store, { payload }) => {
      store[payload.key] = payload.value;
    },
    changeStartIndex: (store, { payload }) => {
      store.startIndex = payload;
    },
  },
});

export const { addConfig, changeStartIndex } = searchConfigSlice.actions;

export default searchConfigSlice.reducer;
