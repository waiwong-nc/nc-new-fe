import './article.scss';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import RandomImage from "../../layout/RandomImage";
import ErrorPage from "../../layout/ErrorPage";
import LoadingPage from "../../layout/LoadingPage";
// import { NavLink } from "react-router-dom";

const ArticlePage = () => {


  const params = useParams();

  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  const apiURL = useSelector((state) => state.server.apiURL);

  const [articleId, setArticleId ] = useState(params.article_id);
  const [author, setAuthor] = useState(null);
  const [body, setBody] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [createDate, setCreateDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [topic, setTopic] = useState(null);
  const [votes, setVotes] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const api = `${apiURL}/api/articles/${articleId}`;
    setIsLoading(true);
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Fetch  Fail!");
        }
        return response.json();
      })
      .then((data) => {

        const {author,body,comment_count,created_at, title, topic, votes } = data.article[0];    
        setAuthor(author);
        setBody(body);
        setCommentCount(comment_count);
        setCreateDate(created_at);
        setTitle(title);
        setTopic(topic);
        setVotes(votes);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [dispatch, apiURL]);

  function backToArticles(){
    navigate("/articles");
  }

  function displayArticles() {
    if (isError) {
      return (
        <ErrorPage _class="articles_page_error">
          Ops ... <br />
          Cannot Get Data From the Server. <br />
          Please Try Again Later
        </ErrorPage>
      );
    }
    if (isLoading) {
      return (
        <LoadingPage _class="articles_page_loading">Loading ...</LoadingPage>
      );
    }

  
    // if (articles.length === 0) {
    //   return <h1> No article </h1>;
    // }
    // return articles.map((article) => {
    //   return (
    //     <NavLink
    //       to={`article/${article.article_id}`}
    //       key={article.article_id}
    //     >
    //       <ArticleCard {...article} />
    //     </NavLink>
    //   );
    // });
  }

  return (
    <div className="article_page_container">
      {displayArticles()}

      <div className="article_frame">
        <button onClick={backToArticles} className="article_back_btn">
          <span className="material-symbols-outlined">undo</span>
        </button>
        <p className="article_topic">{topic}</p>
        <h1 className="article_title">{title}</h1>
        <p className="article_author">
          <span className="material-symbols-outlined">person</span>
          {author}
        </p>
        <p className="article_create_date">{createDate}</p>

        <div className="button_group">
          <p className="article_comment">
            <span className="material-symbols-outlined">comment</span>
            comments({commentCount})
          </p>

          <p className="article_votes">
            <span className="material-symbols-outlined">thumb_up</span>
            votes({votes})
          </p>
          <p className="article_share">
            <span className="material-symbols-outlined">link</span>
            share
          </p>
        </div>

        <RandomImage _class="article_img" />

        <p className="article_img_description">
          (Image is randomly picked From BBC News website)
        </p>

        <p className="article_body">{body}</p>
      </div>
    </div>
  );
};

export default ArticlePage;