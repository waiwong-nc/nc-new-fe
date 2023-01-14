import "./frontPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { articlesActions, getArticles, getTopics } from "../../store/articles";
import { useEffect,useState } from "react";
import ScreenCover from "../layout/ScreenCover";
import LoadingPage from "../layout/LoadingPage";
import RandomImage from "../layout/RandomImage";
import { NavLink } from "react-router-dom";

const FrontPage = () => {

    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.server.apiURL);
    const [isLoading, setIsLoading] = useState(false);

    const [subContentArticles, setSubContentArticles] = useState([]);
    const [firstRowArticles, setFirstRowArticles] = useState([]);
    const [secondRowArticles, setSecondRowArticles] = useState([]);
    const [thirdRowArticles, setThirdRowArticles] = useState([]);

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
    setIsLoading(true);

    Promise.all([getArticles(apiURL), getTopics(apiURL)])
      .then((data) => {
        const allArticles = data[0];
        const topics = data[1];
        const subContnet = [];
        const noOfArticlesNeeded = 4;

        topics.forEach((topic) => {
          const topicName = topic.slug;
          const _articles = [];

          for (let i = 0; i < allArticles.length; i++) {
            if (_articles.length >= noOfArticlesNeeded) break;
            if (allArticles[i].topic === topicName) {
              _articles.push(allArticles[i]);
            }
          }

          subContnet.push({
            [topicName]: _articles,
          });

        });
   
        // Save all articles to redux
        dispatch(articlesActions.setArticles(allArticles));
   
        // set main content articles
        const _articles = [...allArticles];
        setFirstRowArticles(_articles.splice(0, 1)[0])
        setSecondRowArticles(_articles.splice(0, 4))
        setThirdRowArticles(_articles.splice(0, 4))

        // set subcontent articles
        setSubContentArticles(subContnet);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setIsLoading(false);

        // show error screen
        screenCoverSetting(
          "Server Under Maintainance",
          "Please visit later",
          null,
          null,
          "Close",
          setScreenCoverOn
        );
        setScreenCoverOn(true);
      });
  }, []);


  return (
    <div className="front_page_contaienr">
      <div className="front_page_welcome">Welcome to NC-NEWS</div>

      <div className="front_page_main_content_container">
        
        <div className="first_row">
          <NavLink to={`/articles/article/${firstRowArticles.article_id}`} >
            <div>
                <div className="img">
                <RandomImage />
                </div>
                <p className="title">{firstRowArticles.title}</p>
                <p className="badge">{firstRowArticles.topic}</p>
            </div>
          </NavLink>
        </div>
        <div className="second_row">
          {secondRowArticles.map((article) => {
            return (
              <NavLink
                key={article.article_id}
                to={`/articles/article/${article.article_id}`}
              >
                <div>
                  <div className="img">
                    <RandomImage />
                  </div>
                  <p className="title">{article.title}</p>
                  <p className="badge">{article.topic}</p>
                </div>
              </NavLink>
            );
          })}
        </div>
        <div className="third_row">
          {thirdRowArticles.map((article) => {
            return (
              <NavLink
                key={article.article_id}
                to={`/articles/article/${article.article_id}`}
              >
                <div>
                  <p className="title">{article.title}</p>
                  <p className="badge">{article.topic}</p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="front_page_subcontent_container">
        {subContentArticles.map((section) => {
          return (
            <div className="subcontent_section" key={Object.keys(section)}>
              <h3 className="subcontent_section_topic">
                {Object.keys(section)}
              </h3>
              <div className="subcontent_articles_wrapper">
                {section[Object.keys(section)].map((article) => {
                  return (
                    <div
                      key={article.article_id}
                      className="subcontent_article"
                    >
                      <div className="img">
                        <RandomImage />
                      </div>
                      <NavLink
                        key={article.article_id}
                        to={`/articles/article/${article.article_id}`}
                      >
                        <p className="title">{article.title}</p>
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isLoading && (
        <LoadingPage _class="front_page_loading">Loading ...</LoadingPage>
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
}

export default FrontPage;