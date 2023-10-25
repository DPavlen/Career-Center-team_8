/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  selectedFilter: string | null
}

const initialState: InitialState = {
  selectedFilter: 'panel2',
};

const selectedFilterSlice = createSlice({
  name: 'select-filter',
  initialState,
  reducers: {
    selectFilter: (store, { payload }: PayloadAction<string | null>) => {
      store.selectedFilter = payload;
    },
  },
});

export const { selectFilter } = selectedFilterSlice.actions;

export default selectedFilterSlice.reducer;
