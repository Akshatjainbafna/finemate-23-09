import React, { Component } from "react";
import Message from "../../components/messages/Message.js";
import Header from "../../components/headerbar/HeaderTaskbar.js";
import profile from "../../assets/profile.png";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import style from './specifyUserPage.module.css'

import HeaderBarForMobile from "../../components/headerbar/HeaderTaskbarForMobile";
import FooterBarForMobile from "../../components/headerbar/FooterBarForMobile";

//sidebar icons
import {FiShoppingCart} from 'react-icons/fi';
import {ImLibrary} from 'react-icons/im';
import {BsUiChecksGrid} from 'react-icons/bs';
import {BsCashStack} from 'react-icons/bs';
import {FaRegChartBar} from 'react-icons/fa';


let navItemsMobileForNormalUser = [
  { id: 1, link: "/marketplace", imgSrc: <FiShoppingCart />, title: "Marketplace" },
];

let navItemsMobileForStudent = [
  { id: 1,link: "/library",imgSrc: <ImLibrary />,title: "Library"},
  { id: 2, link: "/attendanceUser", imgSrc: <BsUiChecksGrid />, title: "Attendance"},
  { id: 3, link: "/gradesUser", imgSrc: <FaRegChartBar />, title: "Grades"},
  { id: 4, link: "/marketplace", imgSrc: <FiShoppingCart />, title: "Marketplace" },
  { id: 5, link: "/feesPayment", imgSrc: <BsCashStack />, title: "Fees Payment" },
];

let navItemsMobileForInstructorInstitute=[
  { id: 1,link: "/library",imgSrc: <ImLibrary />,title: "Library"},
  { id: 2, link: "/attendanceUser", imgSrc: <BsUiChecksGrid />, title: "Attendance"},
  { id: 3, link: "/gradesUser", imgSrc: <FaRegChartBar />, title: "Grades"},
  { id: 4, link: "/marketplace", imgSrc: <FiShoppingCart />, title: "Marketplace" },
  { id: 5, link: "/feesPayment", imgSrc: <BsCashStack />, title: "Salary" },
]

class MessagePage extends Component {
  render() {
    if(localStorage.getItem("usertype")=="normal"){
      return (
        <>
        <div className={style.mainScreenMobileMessage}>
          <HeaderBarForMobile className={style.headerForMobile} books={navItemsMobileForNormalUser} />
            <div className={style.mainScreenMobile}> <Message /> </div>
          <FooterBarForMobile className={style.footerForMobile}/>
          </div>
        </>
      )
    }
    if(localStorage.getItem("usertype")=="student"){
      return (
        <>
        <div className={style.mainScreenMobileMessage}>
          <HeaderBarForMobile className={style.headerForMobile} books={navItemsMobileForStudent} />
          <div className={style.mainScreenMobile}> <Message /> </div>
          <FooterBarForMobile className={style.footerForMobile} />
          </div>
        </>
      )
    }
    if(localStorage.getItem("usertype")=="instructor" || "institute"){
      return (
        <>
        <div className={style.mainScreenMobileMessage}>
          <HeaderBarForMobile className={style.headerForMobile} books={navItemsMobileForInstructorInstitute} />
          <div className={style.mainScreenMobile}> <Message /> </div>
          <FooterBarForMobile className={style.footerForMobile}/>
          </div>
        </>
      )
    }
  }
}

export default MessagePage;
