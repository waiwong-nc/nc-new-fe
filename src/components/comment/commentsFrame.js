import './comment.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ErrorPage from "../layout/ErrorPage";
import LoadingPage from "../layout/LoadingPage";
import CommentCard from "./commentCard";

const CommentsFrame = (props) => {

    const { _class, articleId, showCommentsFunc, showComments } = props;    
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.server.apiURL);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments,setComments] = useState([])

    useEffect(() => {
        setIsLoading(true);
        const api = `${apiURL}/api/articles/${articleId}/comments`;
        fetch(api)
            .then((response) => {
            if (!response.ok) {
                return Promise.reject("Fetch  Fail!");
            }
            return response.json();
            })
            .then((data) => {
                setComments(data.comments);
                setIsError(false);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setIsError(true);
            });
    }, [dispatch, apiURL, articleId]);


    function openComments(){   
        showCommentsFunc();
    }


    const Content = () => {
        if (isError) {
            return (
                <ErrorPage _class="articles_page_error">
                Ops ... <br />
                Cannot Get Comments From the Server. <br />
                Please Try Again Later
                </ErrorPage>
                );
            }

        if (isLoading) {
            return (
                <LoadingPage _class="articles_page_loading">Loading ...</LoadingPage>
            );
        }

        if (showComments) {
          return comments.map((comment) => {
            return (
                <CommentCard key={comment.comment_id} { ...comment } />
            );
          });
        }
    }

    return (
      <div className={`comments_frame ${_class}`}>
        {showComments ? (
          <h3>Comments</h3>
        ) : (
          <button className="show_comment_btn" onClick={openComments}>
            Show Comments
          </button>
        )}
        <Content />
      </div>
    );
};

export default CommentsFrame;
