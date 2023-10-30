/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

interface ExperienceDetailed {
  id: number;
  name: string;
  date_start: number;
  date_end: number;
  post: string;
  responsibilities: string;
}

interface Education {
  id: number;
  name: string;
  education_level: string;
  date_start: number;
  date_graduation: number;
  name_university: string;
  faculty: string;
  specialization: string;
}

interface Course {
  id: number;
  name: string;
  spec_id: number;
  slug: string;
}

/* interface Level {
  id: number;
  name: string;
  slug: string;
} */

interface HardSkill {
  id: number;
  name: string;
  slug: string;
}

interface SoftSkill {
  id: number;
  name: string;
  slug: string;
}

/* interface Experience {
  id: number;
  name: string;
  slug: string;
} */

interface EmploymentType {
  id: number;
  name: string;
  slug: string;
}

interface WorkSchedule {
  id: number;
  name: string;
  slug: string;
}

export interface ICandidate {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  experience_detailed: ExperienceDetailed[];
  education: Education[];
  image: string;
  sex: string;
  age: number;
  contacts_phone: string;
  contacts_email: string;
  contacts_other: string;
  activity: string;
  location: string;
  specialization: string;
  course: Course[];
  level: string;
  hards: HardSkill[];
  softs: SoftSkill[];
  experience: string;
  employment_type: EmploymentType[];
  work_schedule: WorkSchedule[];
}

export interface InitialState {
  total: number,
  candidates: Partial<ICandidate[]> | null,
}

const initialState: InitialState = {
  total: 0,
  candidates: null,
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidates: (store, { payload }) => {
      store.candidates = payload.candidates;
      store.total = payload.candidates.length;
    },
    clearCandidates: (store) => {
      store.candidates = null;
      store.total = 0;
    },
  },
});

export const { addCandidates, clearCandidates } = candidatesSlice.actions;

export default candidatesSlice.reducer;
