import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getTopics } from "../../store/articles"


const HeaderNav = () => {

    const apiURL = useSelector((state) =>  state.server.apiURL);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
      getTopics(apiURL).then((data) => {
        setTopics(data);
      });
    }, []);

    return (
      <nav className="header_nav">
        <NavLink to={"articles"}> All Articles </NavLink>
        { topics.map((topic) => {
            return (
              <NavLink key={topic.slug} to={topic.slug}>
                {topic.slug}
              </NavLink>
            );
        })}
      </nav>
    );
};

export default HeaderNav;