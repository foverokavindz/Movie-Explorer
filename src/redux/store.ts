import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import trendingMoviesReducer from './slices/trendingMoviesSlice';
import featuredMoviesReducer from './slices/featuredMoviesSlice';
// import browseMoviesReducer from './slices/browseMoviesSlice';
// import watchlistReducer from './slices/watchlistSlice';

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['watchlist'], // Only persist watchlist by default
};

const rootReducer = combineReducers({
  trendingMovies: trendingMoviesReducer,
  featuredMovies: featuredMoviesReducer,
  // browseMovies: browseMoviesReducer,
  // watchlist: watchlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

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

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
