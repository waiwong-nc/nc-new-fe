import { createSlice } from "@reduxjs/toolkit";


const initialArticlesState = {
    articles : [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },
  },
});



export const articlesActions = articlesSlice.actions;
export default articlesSlice.reducer;