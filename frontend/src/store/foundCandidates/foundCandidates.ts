/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';
import { IFilter } from '../filter';

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

export interface InitialState {
  total: number,
  candidates: Partial<ICandidate[]> | null,
  filtersOptions: IFilter,
}

const initialState: InitialState = {
  total: 0,
  candidates: null,
  filtersOptions: {
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

const foundCandidatesSlice = createSlice({
  name: 'found-candidates',
  initialState,
  reducers: {
    addCandidates: (store, { payload }) => {
      if (payload.candidates) {
        store.candidates = payload.candidates;
        store.total = payload.candidates.length;

        payload.candidates.forEach((candidate: ICandidate) => {
          candidate.course.forEach((courseItem) => {
            if (!store.filtersOptions.course.includes(courseItem.name)) {
              store.filtersOptions.course.push(courseItem.name);
            }
          });
          candidate.hards.forEach((hard) => {
            if (!store.filtersOptions.hards.includes(hard.name)) {
              store.filtersOptions.hards.push(hard.name);
            }
          });

          candidate.employment_type.forEach((type) => {
            if (!store.filtersOptions.employmentType.includes(type.name)) {
              store.filtersOptions.employmentType.push(type.name);
            }
          });

          candidate.work_schedule.forEach((type) => {
            if (!store.filtersOptions.workSchedule.includes(type.name)) {
              store.filtersOptions.workSchedule.push(type.name);
            }
          });

          if (store.filtersOptions.specialization === null) {
            store.filtersOptions.specialization = [candidate.specialization];
          } else if (!store.filtersOptions.specialization.includes(candidate.specialization)) {
            store.filtersOptions.specialization.push(candidate.specialization);
          }

          if (!store.filtersOptions.experience.includes(candidate.experience)) {
            store.filtersOptions.experience.push(candidate.experience);
          }

          if (!store.filtersOptions.level.includes(candidate.level)) {
            store.filtersOptions.level.push(candidate.level);
          }

          if (!store.filtersOptions.location.includes(candidate.location)) {
            store.filtersOptions.location.push(candidate.location);
          }
        });
      } else {
        store.candidates = null;
      }
    },
    clearCandidates: (store) => {
      store.candidates = null;
      store.total = 0;
    },
  },
});

export const { addCandidates, clearCandidates } = foundCandidatesSlice.actions;

export default foundCandidatesSlice;
