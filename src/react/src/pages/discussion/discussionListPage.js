import React, { Component } from "react";
import "./discussionListPage.css";
import DiscussionList from "../../components/discussion/discussionList.component.js";
import { Redirect } from "react-router-dom";
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
];


class DiscussionListPage extends Component {
  state = {
    
  };

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Sidebar books={navItems} />
        <Headerbar icons={headerItems} />
        <div className="profileBox">
          <DiscussionList/>
        </div>
      </React.Fragment>
    );
  }
}
export default DiscussionListPage;
