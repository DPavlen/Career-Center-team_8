// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import foundCandidatesSlice from './foundCandidates/foundCandidates';
import candidateInfoSlice from './candidateInfo/candidateInfo';
import searchConfigSlice from './searchConfig/searchConfig';
import selectedFilterSlice from './selectedFilter/selectedFilter';
import savedVacanciesSlice from './savedVacancies/savedVacancies';
import { vacanciesFilterSlice, createVacancyFilterSlice } from './vacanciesFilter/vacanciesFilter';
import userSlice from './user/user';

export const store = configureStore({
  reducer: {
    foundCandidates: foundCandidatesSlice,
    candidateInfo: candidateInfoSlice,
    searchConfig: searchConfigSlice,
    selectedFilter: selectedFilterSlice,
    vacanciesFilter: vacanciesFilterSlice.reducer,
    createVacancyFilter: createVacancyFilterSlice.reducer,
    savedVacancies: savedVacanciesSlice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
