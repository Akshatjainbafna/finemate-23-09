import React, { Component } from "react";
import "./outsideNavbar.css";
import Logo from "../../assets/finemateLatestin Angelina fontLogo.png";
import { Link } from "react-router-dom";

class OutsideNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-sm sticky-top outsideNav mt-2 d-flex align-content-between">
        <Link to="/" className="nav-item nav-link navbar-brand">
            <span className="custom-logo">
              <img
                  src={Logo}
                  />
            </span>
        </Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-label="Toggle navigation" aria-controls="navbarSupportedContent" aria-expanded="false" >
          <span className="navbar-toggler-icon "></span>
        </button>
      
      <div className="collapse navbar-collapse" id="collapsibleNavbar" >
        <div>
          <ul className="navbar-nav p-0">
            <li className="nav-item ml-5">
              <Link to="/about" className="nav-item nav-link custom-link">
                About
              </Link>
            </li>
            <li className="nav-item ml-5">
              <Link to="/solutions" className="nav-item nav-link custom-link">
                Solutions
              </Link>
            </li>
            <li className="nav-item ml-5">
              <Link to="/faq" className="nav-item nav-link custom-link">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <Link to="/create">
            <button className="btn btn-login m-3">SIGN UP</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-login m-3">LOG IN</button>
          </Link>
        </div>
        </div>
      </nav>
    );
  }
}

export default OutsideNavbar;
