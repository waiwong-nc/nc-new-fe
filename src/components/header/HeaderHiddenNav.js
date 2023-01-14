import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HeaderHiddenNav = () => {

   const topics = useSelector((state) => state.articles.topics);

   const [isMenuOn, setIsMenuOn] = useState(false);

   const [dropDownMenuClass, setDropDownMenuClass] = useState("")

   function toggleMenu(){
       setIsMenuOn((prevState) => { 

        console.log(prevState);

        if (prevState === false) {
            setDropDownMenuClass("open");
        } else {
            setDropDownMenuClass("");
        }

        return !prevState;
    });

   };

 

  return (
    <>
      {isMenuOn && <div className="underlyScreen"></div>}
      <div className="hidden_menu">
        <div className="menu_logo" onClick={toggleMenu}>
          {isMenuOn ? (
            <div className="menu_logo_off">
              <span className="material-symbols-outlined">close</span>
            </div>
          ) : (
            <div className="menu_logo_on">
              <span className="material-symbols-outlined">menu</span>
            </div>
          )}
        </div>
      </div>

      {/* {isMenuOn && ( */}
      <div
        className={`hidden_menu_drop_down ${dropDownMenuClass}`}
        onClick={toggleMenu}
      >
        <nav className="hidden_nav">
          <div className="nav_wrapper" key="all">
            <NavLink to={"articles"}> All Articles </NavLink>
            <p>Show all the articles</p>
          </div>

          {topics.map((topic) => {
            return (
              <div className="nav_wrapper" key={topic.slug}>
                <NavLink to={`topic/${topic.slug}`}>{topic.slug}</NavLink>
                <p>{topic.description}</p>
              </div>
            );
          })}
        </nav>
      </div>
      {/* )} */}
    </>
  );
};

export default HeaderHiddenNav;
