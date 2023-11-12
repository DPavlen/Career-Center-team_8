/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IFiltersOptions } from '../filter';
import mainApi from '../../utils/MainApi';

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
  is_tracked: boolean;
}

export interface InitialState {
  total: number,
  candidates: Partial<ICandidate[]> | null,
  filtersOptions: IFiltersOptions,
}

const initialState: InitialState = {
  total: 0,
  candidates: null,
  filtersOptions: {
    specialization_id: [],
    course: [],
    hards: [],
    experience_id: [],
    level_id: [],
    location: [],
    employment_type: [],
    work_schedule: [],
  },
};

export const addCandidateToFavorites = createAsyncThunk(
  'found-candidates/addToFavorite',
  async (id: number, { rejectWithValue }) => {
    try {
      await mainApi.addCandidateToFavorites(id);

      return id;
    } catch (error) {
      return rejectWithValue((error as { message : string}).message);
    }
  },
);

export const removeCandidateFromFavorites = createAsyncThunk(
  'found-candidates/removeFromFavorite',
  async (id: number, { rejectWithValue }) => {
    try {
      await mainApi.removeCandidateFromFavorites(id);

      return id;
    } catch (error) {
      return rejectWithValue((error as { message : string}).message);
    }
  },
);

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
            if (!store.filtersOptions.employment_type.includes(type.name)) {
              store.filtersOptions.employment_type.push(type.name);
            }
          });

          candidate.work_schedule.forEach((type) => {
            if (!store.filtersOptions.work_schedule.includes(type.name)) {
              store.filtersOptions.work_schedule.push(type.name);
            }
          });

          if (store.filtersOptions.specialization_id === null) {
            store.filtersOptions.specialization_id = [candidate.specialization];
          } else if (!store.filtersOptions.specialization_id.includes(candidate.specialization)) {
            store.filtersOptions.specialization_id.push(candidate.specialization);
          }

          if (!store.filtersOptions.experience_id.includes(candidate.experience)) {
            store.filtersOptions.experience_id.push(candidate.experience);
          }

          if (!store.filtersOptions.level_id.includes(candidate.level)) {
            store.filtersOptions.level_id.push(candidate.level);
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
    addFavorite: (store, { payload }: PayloadAction<number>) => {
      const candidate = store.candidates?.find((c) => c?.id === payload);

      if (candidate) {
        candidate.is_tracked = true;
      }
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-expressions
    builder.addCase(addCandidateToFavorites.fulfilled, (state, { payload }) => {
      const candidate = state.candidates?.find((c) => c?.id === payload);

      if (candidate) {
        candidate.is_tracked = true;
      }
    });
    builder.addCase(removeCandidateFromFavorites.fulfilled, (state, { payload }) => {
      const candidate = state.candidates?.find((c) => c?.id === payload);

      if (candidate) {
        candidate.is_tracked = false;
      }
    });
  },

});

export const { addCandidates, clearCandidates } = foundCandidatesSlice.actions;

export default foundCandidatesSlice;
