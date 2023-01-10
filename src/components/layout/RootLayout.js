import Header from './Header';
import "../../App.scss";
import { Outlet } from "react-router-dom";

const RootLayout = ( ) => {

    return (
     <div className="app_container">
      <img
        className="app_background"
        src={require("../../assets/background.png")}
        alt=""
      />
      <Header/>
      <Outlet/>
    </div>);
};

export default RootLayout;