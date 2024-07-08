import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/types';

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
