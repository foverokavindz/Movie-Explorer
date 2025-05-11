import { createSlice } from '@reduxjs/toolkit';
import { showToast } from '../../utils/toast';

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
      showToast.success('Login successful');
    },
    logoutUser: (state) => {
      state.username = '';
      state.email = '';
      state.isLoggedIn = false;
      localStorage.clear();
      showToast.success('Logout successful');
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
