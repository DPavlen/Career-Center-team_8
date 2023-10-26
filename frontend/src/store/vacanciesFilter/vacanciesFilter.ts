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
    // eslint-disable-next-line max-len
    resetFilter: (store, { payload }: PayloadAction<{key: keyof InitialState, value?: string }>) => {
      const storeValue = store[payload.key];
      if (Array.isArray(storeValue)) {
        store[payload.key] = storeValue.filter((v) => v !== payload.value) as string[] & string;
        return;
      }

      store[payload.key] = initialState[payload.key] as string[] & string;
    },
    resetAllFilters: (store) => {
      Object.entries(initialState).forEach(([key, filterValue]) => {
        const filter: keyof InitialState = key as keyof InitialState;

        store[filter] = filterValue as string[] & string;
      });
    },
  },
});

export const { setFilter, resetFilter, resetAllFilters } = vacanciesFilterSlice.actions;

export default vacanciesFilterSlice.reducer;
