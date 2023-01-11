import './header.scss';
// import backgroundImage from '../../assets/map.jpeg';
import backgroundImage from "../../assets/map2.webp";
import { NavLink } from "react-router-dom";

const Header = () => {

    return (
      <div className="header_container">
        <div className="header_logo">
          <img className="nc_logo" src={require("../../assets/nc-logo.webp")} />
          <div
            className="earth"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
          <p>
            <span>NC-</span>
            <br />
            <span>NEWS</span>
          </p>
        </div>

        <nav className="header_nav">
          <NavLink to={"articles"}> List of Articles </NavLink>
        </nav>
      </div>
    );
}

export default Header;