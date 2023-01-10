import "./articles.scss";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { articlesActions } from "../../store/articles";
import ArticleCard from "./ArticleCard";
import  ErrorPage  from "../layout/ErrorPage";
import LoadingPage from "../layout/LoadingPage";



const ArticlePage = () => {

    const dispatch = useDispatch();
    const [ isError, setIsError ] = useState(false);
    const [ isLoading, setIsLoading] = useState(true);
    const articles = useSelector((state) => state.articles.articles);
    const apiURL = useSelector((state) => state.server.apiURL);

    useEffect(() => {
      const api = `${apiURL}/api/articles`;
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
    }, [dispatch, apiURL]);


    function displayArticles() {
      if (isError) {
        return (
          <ErrorPage _class="articles_page_error">
            Ops ...<br />
            Cannot Get Data From the Server. <br />
            Please Try Again Later
          </ErrorPage>
        );
      }
      if (isLoading) {
        return (
          <LoadingPage _class="articles_page_loading"> 
            Loading ... 
          </LoadingPage>
        );
      }
      if (articles.length === 0) {
        return <h1> No article </h1>;
      }
      return articles.map((article) => {
        return <ArticleCard key={article.article_id} {...article}/>
      });
    }


    return (
      <div className="articles_page_container">
        <h1 className="article_page_header">This is Article Page</h1>
        <div className="articles_container">
        {displayArticles()}
        </div>
      </div>
    );
};

export default ArticlePage;