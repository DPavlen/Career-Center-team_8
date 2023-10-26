/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  [key: string]: string | string[] | null;
}

export const initialState: InitialState = {
  profession: null,
  course: [],
  skills: [],
  location: [],
  experience: [],
  level: [],
  busyType: [],
  workingType: [],
};

const vacanciesFilterSlice = createSlice({
  name: 'vacancies-filter',
  initialState,
  reducers: {
    setFilter: (store, { payload }: PayloadAction<Partial<InitialState>>) => {
      Object.entries(payload).forEach(([key, filterValue]) => {
        const filter: keyof InitialState = key as keyof InitialState;

        store[filter] = filterValue as string[] & string;
      });
    },
    resetFilter: (store) => {
      Object.entries(initialState).forEach(([key, filterValue]) => {
        const filter: keyof InitialState = key as keyof InitialState;

        store[filter] = filterValue as string[] & string;
      });
    },
  },
});

export const { setFilter, resetFilter } = vacanciesFilterSlice.actions;

export default vacanciesFilterSlice.reducer;
