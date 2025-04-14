import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';
import { toast } from 'react-hot-toast';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
    
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Registration successful!');
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
       
        if (action.payload?.message === 'Email in use') {
          toast.error('A user with this email already exist.');
        } else {
          toast.error(state.error || 'Error registering.');
        }
      })

     
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Login done!');
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        if (action.payload?.message === 'Email or password is wrong') {
          toast.error('Invalid email or password.');
        } else {
          toast.error(state.error || 'Login error.');
        }
      })

      
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        toast.success('Logout completed.');
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        toast.error(state.error || 'Logout error.');
      })

     
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.token = null;
        state.user = { name: null, email: null };
        state.error = action.payload || action.error.message;
        toast.error('Session ended. Please log in again.');
      })
});

export const authReducer = authSlice.reducer;
