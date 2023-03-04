import React, { Component } from "react";
import "./outsideNavbar.css";
import Logo from "../../assets/Finemate Logo in Black Font #9D8FFF.png";
import { Link, useLocation } from "react-router-dom";

function OutsideNavbarPageLinks(props){
  const header = useLocation();
  const pathName = header.pathname;

    if (pathName === props.linkAddress){
      return (<li className="nav-item">
        <Link to={props.linkAddress} className="nav-item nav-link custom-link activeOutsideNavbarLink">
          {props.title}
        </Link>
    </li>)
    }else{
      return (<li className="nav-item">
      <Link to={props.linkAddress} className="nav-item nav-link custom-link">
        {props.title}
      </Link>
  </li>)
  
  }
}
class OutsideNavbar extends Component {
  render() {
    const arrayOfHeaderLink = [
      {id: 1, linkAddress: "/home", title: "Home"},
      {id: 2, linkAddress: "/solutions", title: "Features"},
      {id: 3, linkAddress: "/about", title: "About"},
      {id: 4, linkAddress: "/team", title: "Team"}
    ]
    return (
      <nav className="navbar navbar-light navbar-expand-sm sticky-top outsideNav d-flex align-content-between">
        <Link to="/home">
          <span className="navbar-brand">
          <img
                  src={Logo}
                  alt='finemate logo'
                  />
          </span>
        </Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-label="Toggle navigation" aria-controls="navbarSupportedContent" aria-expanded="false" >
          <span className="navbar-toggler-icon "></span>
        </button>
      
      <div className="collapse navbar-collapse" id="collapsibleNavbar" >
        <div>
          <ul className="navbar-nav p-0">
            {arrayOfHeaderLink.map((item, index) => 
              <OutsideNavbarPageLinks
                linkAddress= {item.linkAddress}
                title= {item.title}
              />
            )}
          </ul>
        </div>
        <div className="ml-auto buttonContainer">
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
