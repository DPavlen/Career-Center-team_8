/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter } from '../filter';

interface InitialState {
  selectedFilter: keyof IFilter | null
}

const initialState: InitialState = {
  selectedFilter: 'specialization_id',
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
