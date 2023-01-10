import './header.scss';
// import backgroundImage from '../../assets/map.jpeg';
import backgroundImage from "../../assets/map2.webp";
const Header = () => {

    return (
      <div className="header_container">
        <div className="header_logo">
          <img className="nc_logo" src={require("../../assets/nc-logo.webp")} />
          {/* <img className="earth_logo" src={require("../../assets/world-bg.png")} /> */}
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
      </div>
    );
}

export default Header;