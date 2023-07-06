import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userInfor: localStorage.getItem('userInfor') ?? null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<any>) => {
      state.userInfor = action.payload;
      localStorage.setItem('userInfor', action.payload);
    },
    logout: (state: any) => {
      state.userInfor = null;
      localStorage.removeItem('userInfor');
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
