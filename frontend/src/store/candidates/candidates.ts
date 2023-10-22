/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

interface Candidates {
  photo: string;
  name: string;
  city: string;
  experience: number;
  profession: string;
  level: string;
  contact_info: {
    email: string;
    phone: string;
  };
  age: number;
  tech_stack: string[];
}

interface InitialState {
  total: number,
  candidates: Candidates[],
}

const initialState: InitialState = {
  total: 0,
  candidates: [],
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidates: (store, { payload }) => {
      store.candidates = payload.candidates;
      store.total = payload.candidates.length;
    },
    addMoreCandidates: (store, { payload }) => {
      store.candidates = store.candidates.concat(payload.candidates);
      store.total += payload.candidates.length;
    },
  },
});

export const { addCandidates, addMoreCandidates } = candidatesSlice.actions;

export default candidatesSlice.reducer;
