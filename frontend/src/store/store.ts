// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import candidatesSlice from './candidates/candidates';
import candidateInfoSlice from './candidateInfo/candidateInfo';
import searchConfigSlice from './searchConfig/searchConfig';
import selectedFilterSlice from './selectedFilter/selectedFilter';
import vacanciesFilterSlice from './vacanciesFilter/vacanciesFilter';

export const store = configureStore({
  reducer: {
    foundCandidates: candidatesSlice,
    candidateInfo: candidateInfoSlice,
    searchConfig: searchConfigSlice,
    selectedFilter: selectedFilterSlice,
    vacanciesFilter: vacanciesFilterSlice,
    candidateInfo: candidatesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
