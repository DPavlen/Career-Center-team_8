import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { IFilter } from '../filter';

export type TSavedVacancies = {
  id: string;
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
      { payload }: PayloadAction<Omit<TSavedVacancies, 'id'>>,
    ) => {
      console.log(payload);
      return store.concat({
        ...payload,
        id: uuid(),
      });
    },
    deleteVacancy: (store: TSavedVacancies[], { payload }: PayloadAction<TSavedVacancies['id']>) => store.filter((v) => v.id !== payload),
  },
});

export const { addVacancy, deleteVacancy } = savedVacanciesSlice.actions;

export default savedVacanciesSlice.reducer;
