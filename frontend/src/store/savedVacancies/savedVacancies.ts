import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../filter';

// type TSalary = [number | null, number | null];

// вопрос по типу string salary_to, salary_from, как будет уходить на бек(string или number)?
// из textarea всегда возвращается строка

export type TSavedVacancies = {
  job_title: string;
  company: string;
  salary_from: string | undefined;
  salary_to: string | undefined;
  required_requirements: string;
  optional_requirements: string | undefined;
  responsibilities: string;
  conditions: string;
  selection_stages: string | undefined;
  filters: IFilter;
}
const initialState: TSavedVacancies[] | [] = [];

const savedVacanciesSlice = createSlice({
  name: 'saved-vacancies',
  initialState,
  reducers: {
    addVacancy: (
      store: TSavedVacancies[],
      { payload }: PayloadAction<TSavedVacancies>,
    ) => store.concat(payload),
  },
});

export const { addVacancy } = savedVacanciesSlice.actions;

export default savedVacanciesSlice.reducer;
