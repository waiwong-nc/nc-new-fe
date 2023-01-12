import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const patchVoteData = (apiURL, articleId) => {

  const url = `${apiURL}/api/articles/${articleId}`;
  const data = { inc_votes : 1};

  return axios({
    method:'PATCH',
    data,
    url,
  })
  .then((response)=>{
    if (response.status !== 200) {
      return Promise.reject('Error in Vote Updating')
    }
    return
  })
  .catch((err) => {
    return Promise.reject(err);
  });
}


export const articlesActions = articlesSlice.actions;
export default articlesSlice.reducer;