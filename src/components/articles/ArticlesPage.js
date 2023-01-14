import "./articles.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { articlesActions } from "../../store/articles";
import ArticleCard from "./ArticleCard";
import  ErrorPage  from "../layout/ErrorPage";
import LoadingPage from "../layout/LoadingPage";
import { NavLink, useParams } from "react-router-dom";
// import SortPanal from "./sort/SortPanal";


const ArticlePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const articles = useSelector((state) => state.articles.articles);
  const apiURL = useSelector((state) => state.server.apiURL);
  const [articlePath, setArticlePath] = useState('/articles/article');

  

  // construct query
  function queryConfiguration() {
    let query = "";
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        query += `${key}=${value}&`;
      }
    };
    if (query !== "") {
      setArticlePath(`/topic/${params.topic}/article`);
    };
    return query.slice(0,-1);
  };


  useEffect(() => {
    const query = queryConfiguration();   
    const api = `${apiURL}/api/articles?${query}`;
    setIsLoading(true);
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject("Fetch  Fail!");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(articlesActions.setArticles(data.articles));
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [dispatch, apiURL, params]);


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
    if (articles.length === 0) {
      return <h1> No article </h1>;
    }
    return articles.map((article) => {
      return (
        <NavLink
          to={`${articlePath}/${article.article_id}`}
          key={article.article_id}
        >
          <ArticleCard {...article} />
        </NavLink>
      );
    });
  }

  return (
    <div className="articles_page_container">
      {/* <SortPanal/> */}
      <div className="articles_container">{displayArticles()}</div>
    </div>
  );
};

export default ArticlePage;