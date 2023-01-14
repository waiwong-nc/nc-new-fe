import './header.scss';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import LoginLogo from  '../auth/Login';
import HiddenNav from './HeaderHiddenNav';
import { LoginPage } from '../auth/LoginPage';
import {useState} from 'react';
import { NavLink } from "react-router-dom";


const Header = () => {

  const [loginPageOn, setLoginPageOn ] = useState(false);

  function openLoginPage(){

      setLoginPageOn(true);
      window.onscroll = () => {
        window.scroll(0, 0);
      };
  }

    function closeLoginPage() {
      setLoginPageOn(false);
      window.onscroll = "";
    }



    return (
      <div className="header_container">
        <div className="header_wrapper">
          <NavLink to="/">
            <HeaderLogo />
          </NavLink>

          <div className="header_vertical_line1"></div>
          <div className="Login_logo" onClick={openLoginPage}>
            <LoginLogo />
          </div>
          <div className="header_vertical_line2"></div>
          <HeaderNav />
          <HiddenNav />
        </div>
        {loginPageOn && <LoginPage closeLoginPage={closeLoginPage} />}
      </div>
    );
}

export default Header;