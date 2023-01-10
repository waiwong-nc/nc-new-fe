import { createSlice } from "@reduxjs/toolkit";

const initialArticlesState = {
  urls: {
    DEV: "http://localhost:8000",
    PRO: "https://nc-news-kzwk.onrender.com",
  },
  apiURL :'',
};

const serverUrlSlice = createSlice({
  name: "server_url",
  initialState: initialArticlesState,
  reducers: {
    setServerUrl(state, action) {
        if (action.payload === 'DEV'){
            state.apiURL = state.urls.DEV;
        } else {
            state.apiURL = state.urls.PRO;
        }
    },
  },
});

export const serverActions = serverUrlSlice.actions;
export default serverUrlSlice.reducer;
