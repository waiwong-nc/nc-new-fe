
import {useState, useEffect } from 'react';

const CommentCard = (props) => {

  const { author, body, votes, created_at, newCommentId, comment_id } = props;
  const [ newPostClass, setNewPostClass ] = useState(null);

  // set vote style
  let voteClass;
  if (votes > 0 ) {
    voteClass = "yellow"
  } else if (votes < 0) {
    voteClass = "red";
  }

  // When new comment created, newCommentId will change. 
  // The useEffect check if this comment is the new comment. 
  // If true, give a special style to it.
  useEffect(() => {
    if (newCommentId === comment_id) {
      setNewPostClass("newComment");
    }
  }, [newCommentId]);


  
  const date = created_at.slice(0,16).replace('T'," at ");

  return (
    <li className={`comment_card ${newPostClass}`}>
      <div className="comment_card_pic">
        <span className="material-symbols-outlined">account_box</span>
      </div>
      <div className="comment_card_details">
        <p className="comment_card_author">{author}</p>
        <p className="comment_card_created_at">{date}</p>
        <p className="comment_card_body">{body}</p>
        <p className={`comment_card_vote ${voteClass}`}>{votes} votes</p>
      </div>
    </li>
  );
};

export default CommentCard;
