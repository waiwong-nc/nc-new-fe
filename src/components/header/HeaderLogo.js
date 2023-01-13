import backgroundImage from "../../assets/map2.webp";
// import backgroundImage from '../../assets/map.jpeg';

const HeaderLogo = () => {
  return (
    <div className="header_logo">
      <img
        className="nc_logo"
        src={require("../../assets/nc-logo.webp")}
        alt=""
      />
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
  );
};

export default HeaderLogo;
