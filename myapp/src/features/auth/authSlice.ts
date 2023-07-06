import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUSer?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUSer: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: any, actions: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUSer = action.payload;
    },
    loginFailed: (state, action: PayloadAction) => {
      // console.log()
      state.logging = false;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUSer = undefined;
    },
  },
});

// actions
export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;

// selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;

export default authSlice.reducer;
