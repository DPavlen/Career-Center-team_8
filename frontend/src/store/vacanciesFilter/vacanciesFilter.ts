/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter } from '../filter';

export const initialState: IFilter = {
  profession: null,
  course: [],
  skills: [],
  location: [],
  experience: [],
  level: [],
  busyType: [],
  workingType: [],
};

const reducers = {
  setFilter: (store: IFilter, { payload }: PayloadAction<Partial<IFilter>>) => {
    Object.entries(payload).forEach(([key, filterValue]) => {
      const filter: keyof IFilter = key as keyof IFilter;

      store[filter] = filterValue as string[] & string;
    });
  },
  // eslint-disable-next-line max-len
  resetFilter: (store: IFilter, { payload }: PayloadAction<{key: keyof IFilter, value?: string }>) => {
    const storeValue = store[payload.key];
    if (Array.isArray(storeValue)) {
      store[payload.key] = storeValue.filter((v) => v !== payload.value) as string[] & string;
      return;
    }

    store[payload.key] = initialState[payload.key] as string[] & string;
  },
  resetAllFilters: (store: IFilter) => {
    Object.entries(initialState).forEach(([key, filterValue]) => {
      const filter: keyof IFilter = key as keyof IFilter;

      store[filter] = filterValue as string[] & string;
    });
  },
};

export const createVacancyFilterSlice = createSlice({
  name: 'create-vacancies-filter',
  initialState,
  reducers,
});

export const vacanciesFilterSlice = createSlice({
  name: 'vacancies-filter',
  initialState,
  reducers,
});

export const {
  setFilter: vacanciesFilterSetFilter,
  resetFilter: vacanciesFilterResetFilter,
  resetAllFilters: vacanciesFilterResetAllFilters,
} = vacanciesFilterSlice.actions;

export const {
  setFilter: createVacancySetFilter,
  resetFilter: createVacancyResetFilter,
  resetAllFilters: createVacancyResetAllFilters,
} = createVacancyFilterSlice.actions;
