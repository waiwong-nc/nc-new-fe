import './comment.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ErrorPage from "../layout/ErrorPage";
import CommentCard from "./commentCard";
import CommentForm from "./commentForm";
import { deleteComments } from "../../store/articles";
import ScreenCover from "../layout/ScreenCover";

const CommentsFrame = (props) => {
  const { _class, articleId, showCommentsFunc, showComments } = props;
  const dispatch = useDispatch();
  const apiURL = useSelector((state) => state.server.apiURL);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentId, setNewCommentId] = useState(null);

  // hardcode authentication
  const username = useSelector((state) => state.auth.username);

  // ----------- Screen Cover Setting - for display error message -------------//
  const [screenCoverOn, setScreenCoverOn] = useState(false);
  const [screenCoverDeclineFunc, setScreenCoverDeclineFunc] = useState(null);
  const [screenCoverConfirmFunc, setScreenCoverConfirmFunc] = useState(null);
  const [screenCoverDeclineText, setScreenCoverDeclineText] = useState(null);
  const [screenCoverConfirmText, setScreenCoverConfirmText] = useState(null);
  const [screenCoverTitle, setScreenCoverTitle] = useState(null);
  const [screenCoverContent, setScreenCoverContent] = useState(null);

  function screenCoverSetting(
    title = null,
    content = null,
    decline_txt = null,
    decline_fn = null,
    confirm_txt = null,
    confirm_fn = null
  ) {
    setScreenCoverDeclineFunc(() => decline_fn);
    setScreenCoverConfirmFunc(() => confirm_fn);
    setScreenCoverDeclineText(decline_txt);
    setScreenCoverConfirmText(confirm_txt);
    setScreenCoverTitle(title);
    setScreenCoverContent(content);
  }
  // ----------------------- Screen Cover Setting End ---------------------------//

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

  function openComments() {
    // tell parent component that "View Comments" button at the bottom is clicked
    showCommentsFunc();
  }

  // Update comments
  // Listen to child "commentForm" when new comment is creaetd
  function updateComments(newComment) {
    setComments((prevState) => {
      return [newComment, ...prevState];
    });
    setNewCommentId(newComment.comment_id);
    openComments(50);
  }

  function deleteComment(deletedCommentId) {
    setComments((prevState) => {
      return prevState.filter(
        (comment) => comment.comment_id !== deletedCommentId
      );
    });

    deleteComments(apiURL, deletedCommentId).catch((err) => {

      // show error screen
      screenCoverSetting(
        "Error In Deleting Comment !",
        'The comment was not deleted.',
        null,
        null,
        "Close",
        setScreenCoverOn
      );
      setScreenCoverOn(true);
    });
  }

  return (
    <div className={`comments_frame ${_class}`}>
      <CommentForm articleId={articleId} updateComments={updateComments} />

      {showComments ? (
        <>
          <h3>Comments</h3>
          {!isError ? (
            <ul className="comment_list">
              {comments.map((comment) => {
                return (
                  <CommentCard
                    key={comment.comment_id}
                    newCommentId={newCommentId}
                    deleteComment={deleteComment}
                    {...comment}
                  />
                );
              })}
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

      {screenCoverOn && (
        <ScreenCover
          declineFunc={screenCoverDeclineFunc}
          confirmFunc={screenCoverConfirmFunc}
          declineText={screenCoverDeclineText}
          confirmText={screenCoverConfirmText}
          title={screenCoverTitle}
          content={screenCoverContent}
          _class={null}
        />
      )}
    </div>
  );
};

export default CommentsFrame;
