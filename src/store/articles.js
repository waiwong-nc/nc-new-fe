import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialArticlesState = {
    articles : [],
    topics : [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
  // isNewCommentPosted : false,
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },
    setTopics(state,action){
      state.topics = action.payload;
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
} // End of PATCH api/articles/:articleId/



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
}; //End of POST api/articles/:articleId/comments



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
}; // End of GET api/topics



// DELETE api/comments/:comment_id
export const deleteComments = (apiURL, comment_id) =>{

  const url = `${apiURL}/api/comments/${comment_id}`;
  return axios({
    method: "DELETE",
    url,
  })
  .then((response) => {

    if (response.status !== 204) {
      return Promise.reject("Error in delete comments");
    }
    return Promise.resolve(response);
  })
  .catch((err) => {
    return Promise.reject(err.response.data.msg);
  });
}; // End of DELETE api/comments/:comment_id



// GET api/articles
// Get  articles
export const getArticles = (apiURL,query="") => {

  const url = `${apiURL}/api/articles?${query}`;

  return axios({
    method: "GET",
    url,
  })
  .then((response) => {

    if (response.status !== 200) {
      return Promise.reject("Error in fetching topic.");
    }
    return Promise.resolve(response.data.articles);
  })
  .catch((err) => {
  
    return Promise.reject(err.response.data.msg);
  });
}; // End of api/articles




export const articlesActions = articlesSlice.actions;
export default articlesSlice.reducer;