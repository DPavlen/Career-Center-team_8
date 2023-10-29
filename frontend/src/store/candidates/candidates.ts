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

export interface AllFilters {
  specialization: string[],
  course: string[]
  hards: string[]
  experience: string[],
  level: string[],
  location: string[],
  employmentType: string[],
  workSchedule: string[],
}

export interface InitialState {
  total: number,
  candidates: Partial<ICandidate[]> | null,
  allFilters: AllFilters,
}

const initialState: InitialState = {
  total: 0,
  candidates: null,
  allFilters: {
    specialization: [],
    course: [],
    hards: [],
    experience: [],
    level: [],
    location: [],
    employmentType: [],
    workSchedule: [],
  },
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidates: (store, { payload }) => {
      store.candidates = payload.candidates;
      store.total = payload.candidates.length;

      payload.candidates.forEach((candidate: ICandidate) => {
        candidate.course.forEach((courseItem) => {
          if (!store.allFilters.course.includes(courseItem.name)) {
            store.allFilters.course.push(courseItem.name);
          }
        });

        candidate.hards.forEach((hard) => {
          if (!store.allFilters.hards.includes(hard.name)) {
            store.allFilters.hards.push(hard.name);
          }
        });

        candidate.employment_type.forEach((type) => {
          if (!store.allFilters.employmentType.includes(type.name)) {
            store.allFilters.employmentType.push(type.name);
          }
        });

        candidate.work_schedule.forEach((type) => {
          if (!store.allFilters.workSchedule.includes(type.name)) {
            store.allFilters.workSchedule.push(type.name);
          }
        });

        if (!store.allFilters.specialization.includes(candidate.specialization)) {
          store.allFilters.specialization.push(candidate.specialization);
        }

        if (!store.allFilters.experience.includes(candidate.experience)) {
          store.allFilters.experience.push(candidate.experience);
        }

        if (!store.allFilters.level.includes(candidate.level)) {
          store.allFilters.level.push(candidate.level);
        }

        if (!store.allFilters.location.includes(candidate.location)) {
          store.allFilters.location.push(candidate.location);
        }
      });
    },
    clearCandidates: (store) => {
      store.candidates = null;
      store.total = 0;
    },
  },
});

export const { addCandidates, clearCandidates } = candidatesSlice.actions;

export default candidatesSlice.reducer;
