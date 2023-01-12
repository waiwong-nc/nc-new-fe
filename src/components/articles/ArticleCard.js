

const ArticleCard = (props) => {


const {author, title, topic, created_at, votes, comment_count} = props;

const d = new Date(created_at);
return (
  <div className="article_card">
    <h1 className="article_card_title">{title}</h1>
    <p className="article_card_created_at">{d.toUTCString()}</p>
    <p className="article_card_author">- {author}</p>
    <p className="article_card_topic">{topic}</p>

    <p className="article_card_votes">
      {votes}
      <span className="material-symbols-outlined">thumb_up</span>
    </p>

    <p className="article_card_comment_count">
      {comment_count}
      <span className="material-symbols-outlined">comment</span>
    </p>
  </div>
);
};

export default ArticleCard;
