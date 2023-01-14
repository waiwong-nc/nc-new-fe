import { configureStore } from '@reduxjs/toolkit';

import serverUrlSliceReducer from './serverUrl';
import articlesSliceReducer from './articles';
import authSliceReducer from './auth';

const store = configureStore({
  reducer: {
    articles: articlesSliceReducer,
    server: serverUrlSliceReducer,
    auth: authSliceReducer,
  },
});

export default store;