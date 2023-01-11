import {useState ,useCallback} from 'react';
import ScreenCover from "../../layout/ScreenCover";
import RandomImage from "../../layout/RandomImage";
import CommentsFrame from "../../comment/commentsFrame";
import { patchVoteData } from "../../../store/articles";
import { useSelector } from "react-redux";

const ArticleFrame = (props) => {

    const {
        article_id,
        author,
        body,
        comment_count,
        created_at,
        title,
        topic,
        votes,
    } = props;  

    const apiURL = useSelector((state) => state.server.apiURL);

    const [screenCoverOn, setScreenCoverOn] = useState(false);
    const [screenCoverDeclineFunc, setScreenCoverDeclineFunc] = useState(null);
    const [screenCoverConfirmFunc, setScreenCoverConfirmFunc] = useState(null);
    const [screenCoverDeclineText, setScreenCoverDeclineText] = useState(null);
    const [screenCoverConfirmText, setScreenCoverConfirmText] = useState(null);
    const [screenCoverTitle, setScreenCoverTitle] = useState(null);
    const [screenCoverContent, setScreenCoverContent] = useState(null);


    const [showComments, setShowComments] = useState(false);
    const [isVoteClicked,setIsVoteClicked] = useState(false);
    const [commentCount, setCommentCount] = useState(comment_count);
    const [voteCount, setVoteCount] = useState(votes);


    function copyUrlToClipboard() {
      navigator.clipboard.writeText(window.location.href).then(() => {  
        screenCoverSetting(
          "URL Copied !",
          null,
          null,
          null,
          "OK",
          setScreenCoverOn
        );
        setScreenCoverOn(true);
      });
    }

    function moveToComments(){
      window.scrollTo(0, document.body.scrollHeight);  
      setShowComments(true);
    }

    function debounce(fn,delay) { 
      let id;
      return (...args) => {
        if(id) clearTimeout(id);
        id = setTimeout(() => {
          fn(args);
        }, delay);
      };
    };

    function voteAction() {

      setVoteCount((prevState) => prevState + 1);
      setIsVoteClicked(true);
      setTimeout(() => {
        setIsVoteClicked(false);
      }, 500);

      // connect to DB
      patchVoteData(apiURL, article_id)
      .catch((err) => {
        // if failed in vote updating in DB
        screenCoverSetting(
          "Ops ... Failed in Updating the Vote !",
          err.message,
          null,
          null,
          "OK",
          setScreenCoverOn
        );
        setScreenCoverOn(true);
        setVoteCount((prevState) => prevState - 1);
      });
    };

    // Debounce - Prevent "over clicked", leading too much connection to DB
    const voteDebounceSave = useCallback(debounce(voteAction,500),[]);
    function voteHandler() {
        voteDebounceSave();
    };


    function screenCoverSetting(
      title = null,
      content = null,
      decline_txt = null,
      decline_fn = null,
      confirm_txt = null,
      confirm_fn = null
    ) {

      setScreenCoverDeclineFunc(()=> decline_fn);
      setScreenCoverConfirmFunc(()=> confirm_fn);
      setScreenCoverDeclineText(decline_txt);
      setScreenCoverConfirmText(confirm_txt);
      setScreenCoverTitle(title);
      setScreenCoverContent(content);
    }

  
    return (
      <>
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

        <div className="article_frame">
          <p className="article_topic">{topic}</p>
          <h1 className="article_title">{title}</h1>

          <p className="article_author">
            <span className="material-symbols-outlined">person</span>
            {author}
          </p>
          <p className="article_create_date">{created_at}</p>

          <div className="button_group">
            <p className="article_comment" onClick={moveToComments}>
              <span className="material-symbols-outlined">comment</span>
              comments({commentCount})
            </p>

            <p
              className={
                isVoteClicked ? "article_votes voted" : "article_votes"
              }
              onClick={voteHandler}
            >
              <span className="material-symbols-outlined">thumb_up</span>
              votes({voteCount})
            </p>
            <p className="article_share" onClick={copyUrlToClipboard}>
              <span className="material-symbols-outlined">link</span>
              share
            </p>
          </div>

          <RandomImage _class="article_img" />

          <p className="article_img_description">
            (Image is randomly picked From BBC News website)
          </p>

          <p className="article_body">{body}</p>

          <CommentsFrame
            showCommentsFunc={moveToComments}
            showComments={showComments}
            articleId={article_id}
            _class="article_comments_frame"
          />
        </div>
      </>
    );
};

export default ArticleFrame;