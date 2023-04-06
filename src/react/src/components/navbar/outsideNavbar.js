import React, { Component } from "react";
import "./outsideNavbar.css";
import Logo from "../../assets/Finemate Logo in Black Font #9D8FFF.png";
import { Link, Redirect, useLocation } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import AxiosBaseFile from "../AxiosBaseFile";
import Axios from "axios";


function OutsideNavbarPageLinks(props) {
  const header = useLocation();
  const pathName = header.pathname;

  if (pathName === props.linkAddress) {
    return (<li className="nav-item">
      <Link to={props.linkAddress} className="nav-item nav-link custom-link activeOutsideNavbarLink">
        {props.title}
      </Link>
    </li>)
  } else {
    return (<li className="nav-item">
      <Link to={props.linkAddress} className="nav-item nav-link custom-link">
        {props.title}
      </Link>
    </li>)

  }
}


class OutsideNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {firstLogIn: null}
  }
  signInWithGoogle(credentialResponse) {
    let userCredentials = jwt_decode(credentialResponse.credential);
    const formData = new FormData();
    formData.append('user_type', 'normal');
    formData.append('email', userCredentials.email);
    formData.append('name', userCredentials.name);
    formData.append('firstname', userCredentials.given_name);
    formData.append('lastname', userCredentials.family_name);

    Axios.get(userCredentials.picture, {
      responseType: 'blob'
    })
      .then(response => {
        formData.append('profilePicture', response.data);
      })
      .catch(err => console.log(err))

    AxiosBaseFile.post('/api/db_sign_in_with_google', formData)
    .then(response => {
      let responseData = response.data;

      localStorage.setItem('token', true)
      localStorage.setItem('usertype', responseData.user_type)
			localStorage.setItem('username', responseData.username)
      localStorage.setItem('profilePicture', responseData.profilePicture)
      localStorage.setItem('name', responseData.name)

      if (responseData.last_login == 'N/A'){
        this.setState({firstLogIn: true})
      }
      else{
        this.setState({firstLogIn: false})
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.firstLogIn == true){
      return <Redirect to='/questionaire' />
    }
    if (this.state.firstLogIn == false){
      return <Redirect to='/dashboard' />
    }

    const arrayOfHeaderLink = [
      { id: 1, linkAddress: "/home", title: "Home" },
      { id: 2, linkAddress: "/solutions", title: "Features" },
      { id: 3, linkAddress: "/about", title: "About" },
      { id: 4, linkAddress: "/team", title: "Team" }
    ]

    return (
      <nav className="navbar navbar-light navbar-expand-sm sticky-top outsideNav d-flex align-content-between">
        <a href="/home" className="navbar-brand">
            <img
              src={Logo}
              alt='finemate logo'
            />
        </a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-label="Toggle navigation" aria-controls="navbarSupportedContent" aria-expanded="false" >
          <span className="navbar-toggler-icon "></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar" >
          <div>
            <ul className="navbar-nav p-0">
              {arrayOfHeaderLink.map((item, index) =>
                <OutsideNavbarPageLinks
                  linkAddress={item.linkAddress}
                  title={item.title}
                />
              )}
            </ul>
          </div>
          <div className="ml-auto buttonContainer">
            <GoogleLogin
              onSuccess={credentialResponse => this.signInWithGoogle(credentialResponse)}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap = 'true'
            />

            <Link to="/create">
              <button className="btn btn-login m-3 nav-item">SIGN UP</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-login m-3 nav-item">LOG IN</button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default OutsideNavbar;
