import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  filters: string[];
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
