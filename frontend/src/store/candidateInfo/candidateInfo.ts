import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICandidate } from '../foundCandidates/foundCandidates';

export interface Experience {
  id: number;
  name: string;
  date_start: number;
  date_end: number;
  post: string;
  responsibilities: string;
}

export interface Education {
  id: number;
  name: string;
  level: string;
  date_start: number;
  date_graduation: number;
  name_university: string;
  faculty: string;
  specialization: string;
}

export interface Course {
  id: number;
  name: string;
  spec_id: number;
  slug: string;
}

export interface SkillLevel {
  id: number;
  name: string;
  slug: string;
}

export interface HardSkill {
  id: number;
  name: string;
  slug: string;
}

export interface SoftSkill {
  id: number;
  name: string;
  slug: string;
}

export interface ExperienceLevel {
  id: number;
  name: string;
  slug: string;
}

export interface EmploymentType {
  id: number;
  name: string;
  slug: string;
}

export interface WorkSchedule {
  id: number;
  name: string;
  slug: string;
}

const initialState: { candidate: Partial<ICandidate> | null } = {
  candidate: null,
};

const candidateInfoSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    addCandidateInfo: (
      state: { candidate: Partial<ICandidate> | null },
      { payload }: PayloadAction<Partial<ICandidate>>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.candidate = payload;
    },
  },
});

export const { addCandidateInfo } = candidateInfoSlice.actions;

export default candidateInfoSlice.reducer;
