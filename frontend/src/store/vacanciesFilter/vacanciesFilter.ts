/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  profession: string | null;
  course: number[];
  skills: number[];
  location: number[];
  experience: number[];
  level: number[];
  busyType: number[];
  workingType: number[];
}

const initialState: InitialState = {
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

        store[filter] = filterValue as number[] & string;
      });
    },
  },
});

export const { setFilter } = vacanciesFilterSlice.actions;

export default vacanciesFilterSlice.reducer;
