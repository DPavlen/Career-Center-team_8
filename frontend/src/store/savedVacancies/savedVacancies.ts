/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IFilter } from '../filter';
import mainApi from '../../utils/MainApi';

export type TDictionaryItem = {
  id: number,
  name: string,
  slug: string,
}

export type TSavedVacancies = {
  id: string;
  name: string;
  company: string;
  salaryLow: number | undefined;
  salaryHigh: number | undefined;
  requirements: string;
  optional: string | undefined;
  responsibilities: string;
  conditions: string;
  stages: string | undefined;
  filters: IFilter;
}

export type TVacancyDto = {
  id: string;
  name: string,
  company: string,
  salary_low: number,
  salary_high: number,
  requirements: string,
  optional: string,
  conditions: string,
  stages: string,
  responsibilities: string,
  specialization_id: string | null,
  course: string[],
  hards: TDictionaryItem[],
  experience: string[],
  level: string[],
  location: string[],
  employment_type: TDictionaryItem[],
  work_schedule: TDictionaryItem[],
}

export const getVacancies = createAsyncThunk(
  'vacancies/getVacancies',
  async (_, { rejectWithValue }) => {
    try {
      const result = await mainApi.getVacancies();

      return result;
    } catch (error) {
      return rejectWithValue((error as { message : string}).message);
    }
  },
);

export const createVacancy = createAsyncThunk(
  'vacancies/createVacancy',
  async (vacancy: Omit<TSavedVacancies, 'id'>, { rejectWithValue }) => {
    try {
      return mainApi.createVacancy(vacancy);
    } catch (error) {
      return rejectWithValue((error as { message : string}).message);
    }
  },
);

interface InitialState {
  vacancies: TSavedVacancies[]
}

const initialState: InitialState = {
  vacancies: [],
};

const savedVacanciesSlice = createSlice({
  name: 'saved-vacancies',
  initialState,
  reducers: {
    deleteVacancy: (store, { payload }: PayloadAction<TSavedVacancies['id']>) => {
      store.vacancies = store.vacancies.filter((v) => v.id !== payload);

      return store;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVacancies.fulfilled, (state, { payload }) => ({
      ...state,
      vacancies: payload,
    }));
    builder.addCase(createVacancy.fulfilled, (state, { payload }) => {
      state.vacancies.unshift(payload);
    });
  },
});

export const { deleteVacancy } = savedVacanciesSlice.actions;

export default savedVacanciesSlice.reducer;
