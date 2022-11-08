import React, { Component } from "react";
import Profile from "../../components/profile/profile.component.js";
import "./profilePage.css";
import { Redirect } from "react-router-dom";

import HeaderBarForMobile from "../../components/headerbar/HeaderTaskbarForMobile";
import FooterBarForMobile from "../../components/headerbar/FooterBarForMobile";

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
import LoadingGif from "../../components/loadingGif.js";
import AxiosBaseFile from "../../components/AxiosBaseFile.js";
// End of pictures

let headerItems = { link: "/profile", title: "Profile", profileImg: profile };

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



class ProfilePage extends Component {
  state = {
    loading: true,
    educations: [],
    skills: [],
    interests: [],
    hate: [],
    completedCourses: [],
    languages: [],
    name: "",
    description: "",
    timeJoin: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    totalDaysJoined: "",
    friends: [],
    connections: [],
    profilePicture: ''
  };
  componentDidMount() {
    AxiosBaseFile.post("/api/db_get_profile", {
        username: localStorage.getItem("username")
      })
      .then(response => {
        this.setState({ educations: response.data["educations"] });
        this.setState({ skills: response.data["skills"] });
        this.setState({ interests: response.data["interests"] });
        this.setState({ hate: response.data["hate"] });
        this.setState({ completedCourses: response.data["completed_courses"] });
        this.setState({ languages: response.data["languages"] });
        this.setState({ name: response.data["name"] });
        this.setState({ username: response.data["username"] });
        this.setState({ description: response.data["description"] });
        this.setState({ timeJoin: response.data["time_join"] });
        this.setState({ totalDaysJoined: response.data["total_days_joined"] });
        this.setState({ firstName: response.data["first_name"] });
        this.setState({ lastName: response.data["last_name"] });
        this.setState({ phoneNumber: response.data["phone_number"] });
        this.setState({friends: response.data["friends"]});
        this.setState({connections: response.data["connections"]});
        this.setState({profilePicture: response.data["profilePicture"]}, () => {
          this.setState({loading: false})
        });
      })
      .catch(error => {
        console.log(error);
      });

    AxiosBaseFile.post("/api/db_get_user_email", {
        username: localStorage.getItem("username")
      })
      .then(response => {
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
    if (this.state.loading){
      return  <div className="loadingGif">
                <LoadingGif />
              </div>
    }

    if (window.innerWidth <= 600){
      if(localStorage.getItem("usertype")=="noraml"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForNormalUser} />
            <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            hate={this.state.hate}
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
            friends = {this.state.friends}
            connections = {this.state.connections}
            profilePicture = {this.state.profilePicture}
          />
            <FooterBarForMobile className="footerForMobile"/>
          </>
        )
      }
      if(localStorage.getItem("usertype")=="student"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForStudent} />
            <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            hate={this.state.hate}
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
            friends = {this.state.friends}
            connections = {this.state.connections}
            profilePicture = {this.state.profilePicture}
          />
            <FooterBarForMobile className="footerForMobile" />
          </>
        )
      }
      if(localStorage.getItem("usertype")=="instructor" || "institute"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForInstructorInstitute} />
            <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            hate={this.state.hate}
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
            friends = {this.state.friends}
            connections = {this.state.connections}
            profilePicture = {this.state.profilePicture}
          />
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
          <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            hate={this.state.hate}
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
            friends = {this.state.friends}
            connections = {this.state.connections}
            profilePicture = {this.state.profilePicture}
          />
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
          <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            hate={this.state.hate}
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
            friends = {this.state.friends}
            connections = {this.state.connections}
            profilePicture = {this.state.profilePicture}
          />
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
          <Profile
            educations={this.state.educations}
            skills={this.state.skills}
            interests={this.state.interests}
            hate={this.state.hate}
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
            friends = {this.state.friends}
            connections = {this.state.connections}
            profilePicture = {this.state.profilePicture}
          />
        </div>
        </React.Fragment>
      );
    }
  }



  }
}
export default ProfilePage;
