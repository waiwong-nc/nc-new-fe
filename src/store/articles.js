import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialArticlesState = {
    articles : [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
  isNewCommentPosted : false,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    }
  },
});


// Belows are the Async functions for API calling.

// PATCH api/articles/:articleId/
// Add Vote
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

// POST api/articles/:articleId/comments
// Create Post 
export const postComment = (apiURL, articleId, body, username) => {
  const url = `${apiURL}/api/articles/${articleId}/comments`;
  const data = { body, username };

  return axios({
    method: "POST",
    data,
    url,
  })
  .then((response) => {

    if (response.status !== 201) {
      return Promise.reject("Error in posting comments");
    }
    return Promise.resolve(response.data.comment[0]);
  })
  .catch((err) => {
  
    return Promise.reject(err.response.data.msg);
  });
};


// GET api/topics
// Get topics
export const getTopics = (apiURL) => {
  const url = `${apiURL}/api/topics`;

  return axios({
    method: "GET",
    url,
  })
  .then((response) => {

    if (response.status !== 200) {
      return Promise.reject("Error in fetching topic.");
    }
    return Promise.resolve(response.data.topics);
  })
  .catch((err) => {
  
    return Promise.reject(err.response.data.msg);
  });
};

export const articlesActions = articlesSlice.actions;
export default articlesSlice.reducer;