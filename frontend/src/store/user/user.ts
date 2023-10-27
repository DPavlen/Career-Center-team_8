import { createSlice } from '@reduxjs/toolkit';

interface User {
    email: string;
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (store, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      store.user = payload.user;
    },
    clearUser: (store) => {
      // eslint-disable-next-line no-param-reassign
      store.user = null;

      console.log(store.user);
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
