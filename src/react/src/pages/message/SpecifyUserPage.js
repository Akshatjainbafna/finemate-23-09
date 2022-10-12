import React, { Component } from "react";
import Headerbar from "../../components/headerbar/HeaderTaskbar.js";
import User from "../../components/messages/User.js";
import Message from "../../components/messages/Message.js";
import profile from "../../assets/profile.png";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import style from './specifyUserPage.module.css';

import HeaderBarForMobile from "../../components/headerbar/HeaderTaskbarForMobile";
import FooterBarForMobile from "../../components/headerbar/FooterBarForMobile";

//all the icons for sidebar
import dashboard from "../../assets/home.png";
import courses from "../../assets/courses.png";
import fees from "../../assets/fees.png";
import library from "../../assets/library.png";
import search from "../../assets/search 1.png";
import attendance from "../../assets/attendance.png";
import grades from "../../assets/grades.png";
import forum from "../../assets/forum.png";
import cart from "../../assets/cart.png";
import navigation from "../../assets/navigation.png";
import { Redirect } from "react-router-dom";


let headerItems = { link: "/profile", title: "Live Chat", profileImg: profile };

let navItemsForNormalUser = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses"},
  { id: 3, link: "/search", imgSrc: search, title: "Search"},
  { id: 4, link: "/communities", imgSrc: forum, title: "Community" },
  { id: 5, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
];

let navItemsForStudent = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses"},
  { id: 3,link: "/library",imgSrc: library,title: "Library"},
  { id: 4, link: "/search", imgSrc: search, title: "Search"},
  { id: 5, link: "/attendanceUser", imgSrc: attendance, title: "Attendance"},
  { id: 6, link: "/gradesUser", imgSrc: grades, title: "Grades"},
  { id: 7, link: "/communities", imgSrc: forum, title: "Community" },
  { id: 8, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 9, link: "/feesPayment", imgSrc: fees, title: "Fees Payment" },
];

let navItemsForInstructorInstitute=[
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses"},
  { id: 3,link: "/library",imgSrc: library,title: "Library"},
  { id: 4, link: "/search", imgSrc: search, title: "Search"},
  { id: 5, link: "/attendanceUser", imgSrc: attendance, title: "Attendance"},
  { id: 6, link: "/gradesUser", imgSrc: grades, title: "Grades"},
  { id: 7, link: "/communities", imgSrc: forum, title: "Community" },
  { id: 8, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 9, link: "/feesPayment", imgSrc: fees, title: "Salary" },
]

let navItemsMobileForNormalUser = [
  { id: 1, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
];

let navItemsMobileForStudent = [
  { id: 1,link: "/library",imgSrc: library,title: "Library"},
  { id: 2, link: "/attendanceUser", imgSrc: attendance, title: "Attendance"},
  { id: 3, link: "/gradesUser", imgSrc: grades, title: "Grades"},
  { id: 4, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 5, link: "/feesPayment", imgSrc: fees, title: "Fees Payment" },
];

let navItemsMobileForInstructorInstitute=[
  { id: 1,link: "/library",imgSrc: library,title: "Library"},
  { id: 2, link: "/attendanceUser", imgSrc: attendance, title: "Attendance"},
  { id: 3, link: "/gradesUser", imgSrc: grades, title: "Grades"},
  { id: 4, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 5, link: "/feesPayment", imgSrc: fees, title: "Salary" },
]


class SpecifyUserPage extends Component {
  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    if (window.innerWidth <= 600){
      if(localStorage.getItem("usertype")=="noraml"){
        return (
          <>
            <HeaderBarForMobile className={style.headerForMobile} books={navItemsMobileForNormalUser} />
              <div className={style.mainScreenMobile}><User /></div>
            <FooterBarForMobile className={style.footerForMobile}/>
          </>
        )
      }
      if(localStorage.getItem("usertype")=="student"){
        return (
          <>
            <HeaderBarForMobile className={style.headerForMobile} books={navItemsMobileForStudent} />
              <div className={style.mainScreenMobile}><User /></div>
            <FooterBarForMobile className={style.footerForMobile} />
          </>
        )
      }
      if(localStorage.getItem("usertype")=="instructor" || "institute"){
        return (
          <>
            <HeaderBarForMobile className={style.headerForMobile} books={navItemsMobileForInstructorInstitute} />
              <div className={style.mainScreenMobile}><User /></div>
            <FooterBarForMobile className={style.footerForMobile}/>
          </>
        )
      }
    }
    else{

    if(localStorage.getItem("usertype")=="normal"){
      return (
        <React.Fragment>
          <Sidebar books={navItemsForNormalUser} />
          <Headerbar icons={headerItems} />
          <div className={style.chatScreen}>
            <User />
            <Message />
        </div>
        </React.Fragment>
      );
    }
    if (localStorage.getItem("usertype") == "student") {
      return (
        <React.Fragment>
          <Sidebar books={navItemsForStudent} />
          <Headerbar icons={headerItems} />
          <div className={style.chatScreen}>
            <User />
            <Message />
        </div>
        </React.Fragment>
      );
    }

    if (localStorage.getItem("usertype") == "instructor" || "institute") {
      return (
        <React.Fragment>
          <Sidebar books={navItemsForInstructorInstitute} />
          <Headerbar icons={headerItems} />
          <div className={style.chatScreen}>
            <User />
            <Message />
          </div>
        </React.Fragment>
      );
    }
  }

  }
}

export default SpecifyUserPage;
