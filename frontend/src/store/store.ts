import { configureStore } from '@reduxjs/toolkit';
import foundCandidatesSlice from './foundCandidates/foundCandidates';
import candidateInfoSlice from './candidateInfo/candidateInfo';
import selectedFilterSlice from './selectedFilter/selectedFilter';
import savedVacanciesSlice from './savedVacancies/savedVacancies';
import { vacanciesFilterSlice, createVacancyFilterSlice } from './vacanciesFilter/vacanciesFilter';
import userSlice from './user/user';
import addToFavoriteSlice from './favoriteCandidates/favoriteCandidates';

export const store = configureStore({
  reducer: {
    foundCandidates: foundCandidatesSlice.reducer,
    candidateInfo: candidateInfoSlice,
    selectedFilter: selectedFilterSlice,
    vacanciesFilter: vacanciesFilterSlice.reducer,
    createVacancyFilter: createVacancyFilterSlice.reducer,
    savedVacancies: savedVacanciesSlice,
    user: userSlice,
    favoritesVacancies: addToFavoriteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
