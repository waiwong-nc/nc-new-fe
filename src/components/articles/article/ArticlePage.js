import './article.scss';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ErrorPage from "../../layout/ErrorPage";
import LoadingPage from "../../layout/LoadingPage";
import ArticleFrame from './ArticleFrame';


const ArticlePage = () => {

  

  const params = useParams();
  const dispatch = useDispatch();
  const apiURL = useSelector((state) => state.server.apiURL);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState([]);
 

  useEffect(() => {

    window.scrollTo(0, 0);
    setIsLoading(true);
    const api = `${apiURL}/api/articles/${params.article_id}`;
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Fetch  Fail!");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data.article[0]);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [dispatch, apiURL, params.article_id]);


  const Content = () => {
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
    return (
      <ArticleFrame {...article} />

    )
  }

  return (
    <div className="article_page_container">
        <Content />
    </div>
  );
};

export default ArticlePage;