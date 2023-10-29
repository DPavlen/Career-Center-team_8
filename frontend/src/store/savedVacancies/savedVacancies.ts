import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../filter';

// type TSalary = [number | null, number | null];

export type TSavedVacancies = {
  job_title: string;
  company: string;
  salary_from: number;
  salary_to: number;
  required_requirements: string;
  optional_requirements: string;
  responsibilities: string;
  conditions: string;
  selection_stages: string;
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
    ) => {
      console.log(payload);
      return store.concat(payload);
    },
  },
});

export const { addVacancy } = savedVacanciesSlice.actions;

export default savedVacanciesSlice.reducer;
