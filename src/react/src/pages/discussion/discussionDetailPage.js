import React, { Component } from "react";
import "./discussionDetailPage.css";
import DiscussionDetail from "../../components/discussion/discussionDetail.component.js";
import { Redirect } from "react-router-dom";

import HeaderBarForMobile from "../../components/headerbar/HeaderTaskbarForMobile";
import FooterBarForMobile from "../../components/headerbar/FooterBarForMobile";

// Bunch of pictures
import Headerbar from "../..//components/headerbar/HeaderTaskbar.js";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import profile from "../../assets/profile.png";

    //sidebar icons
import dashboard from "../../assets/home.png";
import courses from "../../assets/courses.png";
import library from "../../assets/library.png";
import search from "../../assets/search 1.png";
import attendance from "../../assets/attendance.png";
import grades from "../../assets/grades.png";
import forum from "../../assets/forum.png";
import cart from "../../assets/cart.png";
import fees from "../../assets/fees.png";
import navigation from "../../assets/navigation.png";
// End of pictures




let headerItems = { link: "/profile", title: "Discussion Board", profileImg: profile };

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

class DiscussionDetailPage extends Component {

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }

    if (window.innerWidth <= 600){
      if(localStorage.getItem("usertype")=="noraml"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForNormalUser} />
              <DiscussionDetail handle = {this.props.match.params.handle}/>
            <FooterBarForMobile className="footerForMobile"/>
          </>
        )
      }
      if(localStorage.getItem("usertype")=="student"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForStudent} />
              <DiscussionDetail handle = {this.props.match.params.handle}/>
            <FooterBarForMobile className="footerForMobile" />
          </>
        )
      }
      if(localStorage.getItem("usertype")=="instructor" || "institute"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForInstructorInstitute} />
              <DiscussionDetail handle = {this.props.match.params.handle}/>
            <FooterBarForMobile className="footerForMobile"/>
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
          <div className="profileBox">
            <DiscussionDetail handle = {this.props.match.params.handle}/>
          </div>
        </React.Fragment>
      );
    }
    if (localStorage.getItem("usertype") == "student") {
      return (
        <React.Fragment>
          <Sidebar books={navItemsForStudent} />
          <Headerbar icons={headerItems} />
          <div className="profileBox">
            <DiscussionDetail handle = {this.props.match.params.handle}/>
          </div>
        </React.Fragment>
      );
    }

    if (localStorage.getItem("usertype") == "instructor" || "institute") {
      return (
        <React.Fragment>
          <Sidebar books={navItemsForInstructorInstitute} />
          <Headerbar icons={headerItems} />
          <div className="profileBox">
            <DiscussionDetail handle = {this.props.match.params.handle}/>
          </div>
        </React.Fragment>
      );
    }
  }
  }
}
export default DiscussionDetailPage;
