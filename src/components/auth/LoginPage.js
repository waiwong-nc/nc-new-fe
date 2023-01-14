import Logo from "../header/HeaderLogo";
import { useState } from "react";

export const LoginPage = (props) => {
  
  const [cardClass, setCardClass] = useState("");
  const [loginUsername, setLoginUsername ] = useState("");
  const [loginPassword, setLoginPassword ] = useState("");
  const [singUpUsername, setSingUpUsername ] = useState("");
  const [singUpPassword, setSingUpPassword] = useState("")

  
  function flipCard() {
    setCardClass("flip");
  }
  
  function flipCardBack(){
    setCardClass('');
  }

  function close(){
    props.closeLoginPage();   
  }

  function signUpOnSubmitHandler(){
    close();
  }

  function loginOnSubmitHandler(){
    close();
  }


    return (
      <div className="login_page">
        <div className={`base_card ${cardClass}`}>
          <div className="card signin">
            <p className="close_btn" onClick={close}>
              close
            </p>
            <div className="logo">
              <Logo />
            </div>
            <h3>Sign Up</h3>

            <form onSubmit={signUpOnSubmitHandler}>
              <label>Username</label>
              <input
                type="text"
                onChange={() => {
                  setSingUpUsername();
                }}
              />
              <label>Password</label>
              <input
                type="text"
                onChange={() => {
                  setSingUpPassword();
                }}
              />
              <button type="submit" className="confirm_button">
                Sing Up Now
              </button>
            </form>

            <button onClick={flipCard} className="flip_button">
              Already have account? <br /> Login
            </button>
          </div>

          <div className="card login" onSubmit={loginOnSubmitHandler}>
            <p className="close_btn" onClick={close}>
              close
            </p>
            <div className="logo">
              <Logo />
            </div>
            <h3>Log In</h3>

            <form>
              <label>Username</label>
              <input
                type="text"
                onChange={() => {
                  setLoginUsername();
                }}
              />
              <label>Password</label>
              <input
                type="text"
                onChange={() => {
                  setLoginPassword();
                }}
              />

              <button type="submit" className="confirm_button">
                Sing Up Now
              </button>
            </form>
            {/* <p>Create an account now !</p> */}
            <button onClick={flipCardBack} className="flip_button">
              {" "}
              Create an account now !{" "}
            </button>
          </div>
        </div>
      </div>
    );
}


