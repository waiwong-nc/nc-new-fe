import './header.scss';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import LoginLogo from  '../auth/Login';

const Header = () => {

    return (
      <div className="header_container">
        <div className="header_wrapper">
          <HeaderLogo />
          <div className="header_vertical_line1"></div>
          <div className="Login_logo">
            <LoginLogo />
          </div>
          <div className="header_vertical_line2"></div>
          <HeaderNav />
        </div>
      </div>
    );
}

export default Header;