import React, { Component } from "react";
import Header from "../../components/headerbar/HeaderTaskbar.js";
import User from "../../components/messages/User.js";
import profile from "../../assets/profile.png";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import classes from "../../assets/classes.png";
import scheduling from "../../assets/scheduling.png";
import community from "../../assets/community.png";
import mailbox from "../../assets/mailbox.png";
import socialInitiatives from "../../assets/Welfare.png";
import dashboard from "../../assets/dashboard.png";

let headerItems = { link: "/profile", title: "Live Chat", profileImg: profile };

let navItems = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: classes, title: "Courses"},
  { id: 3,link: "/library",imgSrc: classes,title: "Library"},
  { id: 4, link: "/search", imgSrc: classes, title: "Search"},
  { id: 5, link: "/attendanceUser", imgSrc: classes, title: "Attendance"},
  { id: 6, link: "/gradesUser", imgSrc: classes, title: "Grades"},
  { id: 7, link: "/discussionList", imgSrc: community, title: "Community" },
  { id: 8, link: "/marketplace", imgSrc: mailbox, title: "Marketplace" },
  { id: 9, link: "/feesPayment", imgSrc: scheduling, title: "Fees Payment" },
  { id: 10, link: "/a&t", imgSrc: classes, title: "Accomodation & Transportation" },
];

class SpecifyUserPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar books={navItems} />
        <Header icons={headerItems} />
        <User />
      </React.Fragment>
    );
  }
}

export default SpecifyUserPage;
