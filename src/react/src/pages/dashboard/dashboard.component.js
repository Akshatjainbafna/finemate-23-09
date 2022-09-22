import React, { Component } from "react";
import style from "./dashboard.module.css";
import Classes from "../..//components/yourClasses/yourClasses.component.js";
import InstructorClasses from "../..//components/yourClasses/instructorClasses.component.js";
import Events from "../../components/events/events.component.js";
import News from "../../components/news/news.component.js";
import Headerbar from "../../components/headerbar/HeaderTaskbar.js";
import Sidebar from "../../components/sidebar/sidebar.component.js";
import DashboardCalendarComponent from "../../components/calendar/dashboardCalendar.component.js";
import NewsfeedHeader from "../../components/newsfeed/newsfeedHeader.component.js";
import profile from "../../assets/profile.png";
import { Redirect } from "react-router-dom";


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
import NewsFeed from "../../components/newsfeed/newsfeed.component";



let headerItems = { link: "/profile", title: "Home", profileImg: profile };

let navItems = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses"},
  { id: 3,link: "/library",imgSrc: library,title: "Library"},
  { id: 4, link: "/search", imgSrc: search, title: "Search"},
  { id: 5, link: "/attendanceUser", imgSrc: attendance, title: "Attendance"},
  { id: 6, link: "/gradesUser", imgSrc: grades, title: "Grades"},
  { id: 7, link: "/discussionList", imgSrc: forum, title: "Community" },
  { id: 8, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 9, link: "/feesPayment", imgSrc: fees, title: "Fees Payment" },
  { id: 10, link: "/a&t", imgSrc: navigation, title: "Accomodation & Transportation" },
];

class DashPage extends Component {
  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    if (localStorage.getItem("usertype") == "student") {
      return (
        <React.Fragment>
          <Sidebar books={navItems} />
          <Headerbar icons={headerItems} />
          <section className={style.containerDash}>

            <div className={style.leftHalf}>
              <NewsfeedHeader/>
              <NewsFeed/>
            </div>

            <div className={style.rightHalf}>
                <div>
                  <News />
                </div>
                <div>
                  <DashboardCalendarComponent />
                </div>
                {/*<div class="">
                  <InstructorClasses />
                </div>
                <div>
                  <Events />
      </div>*/}
            </div>

          </section>
        </React.Fragment>
      );
    }

    if (localStorage.getItem("usertype") == "instructor" || "initiatives") {
      return (
        <React.Fragment>
          <Sidebar books={navItems} />
          <Headerbar icons={headerItems} />
          <section className={style.containerDash}>

            <div className={style.leftHalf}>
            <NewsfeedHeader/>
            <NewsFeed/>
            </div>

            <div className={style.rightHalf}>
                <div>
                  <News />
                </div>
                <div>
                  <DashboardCalendarComponent />
                </div>
                <div class="">
                  <InstructorClasses />
                </div>
                <div>
                  <Events />
                </div>
            </div>
          </section>
        </React.Fragment>
      );
    }
  }
}

export default DashPage;