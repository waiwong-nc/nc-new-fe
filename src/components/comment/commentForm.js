import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postComment } from "../../store/articles";
import ScreenCover from "../layout/ScreenCover";

const CommentsForm = ({ articleId, updateComments }) => {
  const [commentTxt, setCommentTxt] = useState("");
  const apiURL = useSelector((state) => state.server.apiURL);
  const [isPosting, setIsPosting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  // hardcode authentication
  useEffect(() => {
    setIsLoggedIn(true);
    setUsername("happyamy2016");
  },[]);

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

  function submitHandler(e) {
    
    e.preventDefault();

    if (!inputValidationCheck()) {
      setScreenCoverOn(true);
      return;
    }

    setIsPosting(true);

    postComment(apiURL, articleId, commentTxt, username)
      .then((data) => {
        updateComments(data); // tell parent component that new comment is created
        setIsPosting(false);
        setCommentTxt("");    // reset the textarea
      })
      .catch((err) => {
        // show error screen
        screenCoverSetting(
          "Error In Posting Comment !",
          null,
          null,
          null,
          "Close",
          setScreenCoverOn
        );
        setScreenCoverOn(true);
        setIsPosting(false);
      });
  }

  function inputValidationCheck() {
    if (commentTxt.length === 0) {
      // show error screen
      screenCoverSetting(
        "Submit Fail !",
        "Cannot submit an empty comment.",
        null,
        null,
        "Close",
        setScreenCoverOn
      );
      return false;
    }

    if (!isLoggedIn) {
      screenCoverSetting(
        "Fail in Authentication",
        "Please log In and try again",
        null,
        null,
        "Close",
        setScreenCoverOn
      );
      return false;
    }

    return true;
  }

  function onChangeHandler(e) {
    setCommentTxt(e.target.value);
  }

  return (
    <div className="comment_form_wrapper">
      <h3>Leave Comment</h3>

      <div className="comment_form_card">
        <div className="cooment_form_pic">
          <span className="material-symbols-outlined">account_box</span>
        </div>

        <form onSubmit={submitHandler} className="comment_form">
          <textarea
            className={isPosting ? "lock" : ""}
            name="comment_txt"
            value={commentTxt}
            onChange={onChangeHandler}
          ></textarea>
          <button className={isPosting ? "lock" : ""} type="submit">
            Post
          </button>
        </form>
      </div>

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

export default CommentsForm;