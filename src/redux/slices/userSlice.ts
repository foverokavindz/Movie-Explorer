import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.username = '';
      state.email = '';
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
