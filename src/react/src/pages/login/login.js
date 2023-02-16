import React, { Component } from "react";
import Login from "../../components/createAccount/login.component";
import style from "./login.module.css";
import OutsideNavbar from "../../components/navbar/outsideNavbar.js";
import Picture from "../../assets/loginPicture.png";

class LoginPage extends Component {
  render() {
    return (
      <React.Fragment>
        <OutsideNavbar />
        <div className={style.loginPage}>
          <div className={style.pictureCreate}>
              <img src={Picture} alt="Map"></img>
          </div>
          <div>
            <Login />
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default LoginPage;
