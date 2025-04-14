import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { contactsReducer } from './contacts/slice';
import filterReducer from './filters/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage для збереження токена

// Конфіг для збереження токена
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // Зберігаємо лише token
};

// Створення store з персистенцією
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), // persistReducer для auth
    contacts: contactsReducer,
    filters: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistStore для роботи з PersistGate
export const persistor = persistStore(store);
