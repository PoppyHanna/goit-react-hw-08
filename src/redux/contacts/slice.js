import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { logout } from '../auth/operations';
import toast from 'react-hot-toast';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
     
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Не вдалося завантажити контакти.');
      })

   
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        toast.success(`Контакт ${action.payload.name} додано.`);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Не вдалося додати контакт.');
      })

      
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(contact => contact.id !== action.payload.id);
        toast.success(`Контакт ${action.payload.name} видалено.`);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Не вдалося видалити контакт.');
      })

     
      .addCase(logout.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  }
});

export const contactsReducer = contactsSlice.reducer;
