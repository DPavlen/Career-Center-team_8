/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

export interface ICandidate {
  photo: string;
  name: string;
  city: string;
  experience: number;
  profession: string;
  courses: string[];
  level: string;
  education: string;
  job_part: string;
  job_type: string[];
  contact_info: {
    email: string;
    phone: string;
    telegram?: string;
  };
  age: number;
  tech_stack: string[];
  id: number;
}

export interface InitialState {
  total: number,
  candidates: Partial<ICandidate[]>,
}

const initialState: InitialState = {
  total: 0,
  candidates: [{
    id: 1,
    photo: 'https://i.pravatar.cc/150?img=1',
    name: 'Березовсконогузадерищенский Александр',
    city: 'Санкт-Петербург',
    experience: 8,
    profession: 'UI/UX дизайнер',
    courses: ['Дизайн разработка', 'UI/UX Дизайн'],
    job_part: 'Полная',
    job_type: ['Офис', 'Удаленка'],
    level: 'Senior',
    education: 'Российский государственный аграрный университет, Москва ИМЭ им. В. П. Горячкина, Агроинженерия',
    contact_info: {
      email: 'ivanov@example.com',
      phone: '+7 900 123 4567',
      telegram: 'ivanovtelega12345',
    },
    age: 23,
    tech_stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'Typescript',
      'Webpack',
      'Python',
      'vite',
      'SCSS',
      'Java',
      'Node.js',
      'Webpack',
      'Python',
      'vite',
      'SCSS',
      'Java',
    ],
  }],
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidates: (store, { payload }) => {
      store.candidates = store.candidates.concat(payload.candidates);
      store.total += payload.candidates.length;
    },
    addMoreCandidates: (store, { payload }) => {
      store.candidates = store.candidates.concat(payload.candidates);
      store.total += payload.candidates.length;
    },
  },
});

export const { addCandidates, addMoreCandidates } = candidatesSlice.actions;

export default candidatesSlice.reducer;
