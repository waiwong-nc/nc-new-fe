const CommentCard = (props) => {

  const { author, body, vote, created_at } = props;

  return (
    <div className="comment_card">
      <div className="comment_card_pic">
        <span className="material-symbols-outlined">account_box</span>
      </div>
      <div className="comment_card_details">
        <p>{author}</p>
        <p>{body}</p>
        <p>{vote}</p>
        <p>{created_at}</p>
      </div>
    </div>
  );
};

export default CommentCard;
