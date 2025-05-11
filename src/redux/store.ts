import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import trendingMoviesReducer from './slices/trendingMoviesSlice';
import featuredMoviesReducer from './slices/featuredMoviesSlice';
import browseMoviesReducer from './slices/browseMoviesSlice';
import watchlistReducer from './slices/watchlistSlice';
import userReducer from './slices/userSlice';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['watchlist', 'user'],
};

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  trendingMovies: trendingMoviesReducer,
  featuredMovies: featuredMoviesReducer,
  browseMovies: browseMoviesReducer,
  watchlist: watchlistReducer,
  user: userReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});

// Create a persistor for the store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
