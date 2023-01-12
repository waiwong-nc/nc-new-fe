import './comment.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ErrorPage from "../layout/ErrorPage";
import CommentCard from "./commentCard";
import CommentForm from "./commentForm";

const CommentsFrame = (props) => {

    const { _class, articleId, showCommentsFunc, showComments } = props;    
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.server.apiURL);
    const [isError, setIsError] = useState(false);
    const [comments,setComments] = useState([]);
    const [newCommentId,setNewCommentId] = useState(null);

    useEffect(() => {
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
            })
            .catch((err) => {
                setIsError(true);
            });
    }, [dispatch, apiURL, articleId]);


    function openComments(){   
        // tell parent component that "View Comments" button at the bottom is clicked
        showCommentsFunc();
    }


    // Update comments 
    // Listen to child "commentForm" when new comment is creaetd
    function updateComments(newComment){
    
      setComments((prevState)=>{
        return [ newComment, ...prevState ]; 
      });
      setNewCommentId(newComment.comment_id);
      openComments(50);
    }


    return (
      <div className={`comments_frame ${_class}`}>
        <CommentForm articleId={articleId} updateComments={updateComments} />

        {showComments ? (
          <>
            <h3>Comments</h3>
            { !isError ? (
                <ul className="comment_list">
                  { comments.map((comment) => {
                    return (
                      <CommentCard
                        key={comment.comment_id}
                        newCommentId={newCommentId}
                        {...comment}
                      />
                    );
                  }) }
              </ul>
            ) : (
              <ErrorPage _class="articles_page_error">
                Ops ... <br />
                Cannot Get Comments From the Server. <br />
                Please Try Again Later
              </ErrorPage>
            )}
          </>
        ) : (
          <button className="show_comment_btn" onClick={openComments}>
            View Comments
          </button>
        )}
      </div>
    );
};

export default CommentsFrame;
