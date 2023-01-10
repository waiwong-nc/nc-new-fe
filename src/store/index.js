import { configureStore } from '@reduxjs/toolkit';

import serverUrlSliceReducer from './serverUrl';
import articlesSliceReducer from './articles';

const store = configureStore({
  reducer: {
    articles: articlesSliceReducer,
    server: serverUrlSliceReducer,
  },
});

export default store;