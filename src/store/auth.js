import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  username : 'happyamy2016',
  isLoggedIn : true,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialAuthState,
    reducers:{}
});

export const authAction = authSlice.actions;
export default authSlice.reducer;