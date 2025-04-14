import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();         // отримуємо весь state
      const token = state.auth.token;            // дістаємо токен

      if (!token) return thunkAPI.rejectWithValue('No token'); // якщо немає токена, повертаємо помилку

      setAuthHeader(token);                      // додаємо токен до запиту

      const res = await axios.get('/contacts');  // виконуємо запит на отримання контактів
      return res.data;                           // повертаємо дані з відповіді
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // якщо сталася помилка, повертаємо повідомлення про помилку
    }
  }
);

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue('No token');

    setAuthHeader(token);

    const res = await axios.post('/contacts', contact);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue('No token');

    setAuthHeader(token);

    const res = await axios.delete(`/contacts/${id}`);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
