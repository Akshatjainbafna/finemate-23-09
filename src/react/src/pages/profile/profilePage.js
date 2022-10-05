import React, { Component } from "react";
import Profile from "../../components/profile/profile.component.js";
import "./profilePage.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
// Bunch of pictures
import Headerbar from "../..//components/headerbar/HeaderTaskbar.js";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import profile from "../../assets/profile.png";
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
import settings from "../../assets/settings.png";
// End of pictures

let headerItems = { link: "/profile", title: "Profile", profileImg: profile };

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

class ProfilePage extends Component {
  state = {
    educations: [],
    skills: [],
    interests: [],
    completedCourses: [],
    languages: [],
    name: "",
    description: "",
    timeJoin: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    totalDaysJoined: ""
  };
  componentDidMount() {
    axios
      .post("http://127.0.0.1:8103/api/db_get_profile", {
        username: localStorage.getItem("username")
      })
      .then(response => {
        console.log(response.data);
        this.setState({ educations: response.data["educations"] });
        this.setState({ skills: response.data["skills"] });
        this.setState({ interests: response.data["interests"] });
        this.setState({ completedCourses: response.data["completed_courses"] });
        this.setState({ languages: response.data["languages"] });
        this.setState({ name: response.data["name"] });
        this.setState({ username: response.data["username"] });
        this.setState({ description: response.data["description"] });
        this.setState({ timeJoin: response.data["time_join"] });
        this.setState({ totalDaysJoined: response.data["total_days_joined"] }, ()=> console.log(this.state.totalDaysJoined));
        this.setState({ firstName: response.data["first_name"] });
        this.setState({ lastName: response.data["last_name"] });
        this.setState({ phoneNumber: response.data["phone_number"] });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .post("http://127.0.0.1:8103/api/db_get_user_email", {
        username: localStorage.getItem("username")
      })
      .then(response => {
        console.log(response);
        console.log(response.data["email"]);
        this.setState({ email: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Sidebar books={navItems} />
        <Headerbar icons={headerItems} />
        <div className="profileBox">
          <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            completedCourses={this.state.completedCourses}
            languages={this.state.languages}
            name={this.state.name}
            description={this.state.description}
            timeJoin={this.state.timeJoin}
            totalDaysJoined={this.state.totalDaysJoined}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            phoneNumber={this.state.phoneNumber}
            username={this.state.username}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default ProfilePage;
