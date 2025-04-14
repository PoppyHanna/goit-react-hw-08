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
      // Реєстрація користувача
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Реєстрація успішна!');
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        // Безпечна перевірка повідомлення про помилку
        if (action.payload?.message === 'Email in use') {
          toast.error('Користувач з таким email вже існує.');
        } else {
          toast.error(state.error || 'Помилка при реєстрації.');
        }
      })

      // Вхід користувача
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Вхід виконано!');
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        if (action.payload?.message === 'Email or password is wrong') {
          toast.error('Невірний email або пароль.');
        } else {
          toast.error(state.error || 'Помилка при вході.');
        }
      })

      // Вихід користувача
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        toast.success('Вихід виконано.');
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        toast.error(state.error || 'Помилка при виході.');
      })

      // Оновлення користувача по токену
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
        toast.error('Сесія завершена. Будь ласка, увійдіть знову.');
      })
});

export const authReducer = authSlice.reducer;
