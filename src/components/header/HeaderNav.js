import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getTopics,articlesActions } from "../../store/articles"


const HeaderNav = () => {

    const dispatch = useDispatch();
    const topics = useSelector((state) => state.articles.topics);
    const apiURL = useSelector((state) =>  state.server.apiURL);


    useEffect(() => {
      if (topics.length === 0) {
        getTopics(apiURL).then((data) => {
          dispatch(articlesActions.setTopics(data));
        });
      }
    }, [topics]);

    return (
      <nav className="header_nav">
        <NavLink to={"articles"}> All Articles </NavLink>
        { topics.map((topic) => {
            return (
              <NavLink key={topic.slug} to={`topic/${topic.slug}`}>
                {topic.slug}
              </NavLink>
            );
        })}
      </nav>
    );
};

export default HeaderNav;