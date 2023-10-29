/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter } from '../filter';

interface InitialState {
  selectedFilter: keyof IFilter | null
}

const initialState: InitialState = {
  selectedFilter: 'specialization',
};

const selectedFilterSlice = createSlice({
  name: 'select-filter',
  initialState,
  reducers: {
    selectFilter: (store, { payload }: PayloadAction<keyof IFilter | null>) => {
      store.selectedFilter = payload;
    },
  },
});

export const { selectFilter } = selectedFilterSlice.actions;

export default selectedFilterSlice.reducer;
