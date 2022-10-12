import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


import Sidebar from "./components/sidebar/sidebar.component.js";
import CreateAccount from "./components/createAccount/createAccount.component.js";
import CreateAccountPage from "./pages/createAccount/createAccount.js";
import LogInPage from "./pages/login/login.js";
import Logout from "./components/createAccount/logout.component.js";
import "./components/createAccount/loginAndSignup.css";
import SchedulePage from "./pages/schedulePage/schedulePage.js";

// Icons
import classes from "./assets/classes.png";
import scheduling from "./assets/scheduling.png";
import community from "./assets/community.png";
import mailbox from "./assets/mailbox.png";
import achievements from "./assets/achievements.png";
import settings from "./assets/settings.png";
import dashboard from "./assets/dashboard.png";
import profile from "./assets/profile.png";


import Headerbar from "./components/headerbar/HeaderTaskbar.js";
import Classes from "./components/yourClasses/yourClasses.component.js";
import InstructorClasses from "./components/yourClasses/instructorClasses.component.js";
import Events from "./components/events/events.component.js";
import News from "./components/news/news.component.js";

// HomePageMainPages(Active)
import DashPage from "./pages/dashboard/dashboard.component.js";
import AllCourses from "./pages/allCourses/allCoursesPage.js";
import LibraryManagementSystem from "./pages/library/LibraryManagementSystem.js";
import SearchPage from "./pages/searchPage/SearchPage.js";
import AttendanceManagementSystem from "./pages/attendance/AttendanceManagementSystem.js";
import GradesManagementSystem from "./pages/grades/GradeManagementSystem.js";
import DiscussionListPage from "./pages/discussion/discussionListPage.js"
import Marketplace from "./pages/marketplace/MarketPlace.js";
import FeesPaymentSystem from "./pages/feesPayment/FeesPaymentSystem.js";
import AccomodationAndTransportManagementSystem from "./pages/accomodationAndTransortation/AccomodationAndTransportManagementSystem.js";


//HomePageMainPages(inActive)
import AllClassListPage from "./pages/Classes/classes.js";
import AllEventListPage from "./pages/Events/events.js";
import CreateClass from "./components/createClass/createClass.component.js";
import CreateEvent from "./components/createEvent/createEvent.component.js";
import ProfilePage from "./pages/profile/profilePage.js";
import FAQPage from "./pages/faq/faqPage.js";
import DiscussionDetailPage from "./pages/discussion/discussionDetailPage.js";
import MessagePage from "./pages/message/MessagePage.js";
import SpecifyUserPage from "./pages/message/SpecifyUserPage.js";
import CreateClassPage from "./pages/createClass/createClassPage.js";
import CreateEventPage from "./pages/createEvent/createEventPage.js";
import AllEventsList from "./components/events/eventlist";
import Questionaire from "./pages/Questionaire/Questionaire.js";
import AboutPage from "./pages/about/aboutPage.js";
import SolutionsPage from "./pages/solutions/solutionsPage.js";
import TeamPage from "./pages/team/Team.js"
import HomePage from "./pages/home/homePage.js"
import ContentAuthoringToolComponentWindow from "./components/newsfeed/contentAuthoringTool.component";
import NotificationPage from "./pages/notifications/Notifications";
import DiscussionCommunitiesPage from "./pages/discussion/discussionCommunities";


window.token = localStorage.getItem("token");

let navItems = [
  { id: 1, link: "", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "", imgSrc: classes, title: "Classes" },
  { id: 3, link: "", imgSrc: scheduling, title: "Scheduling" },
  { id: 4, link: "", imgSrc: community, title: "Community" },
  { id: 5, link: "", imgSrc: mailbox, title: "Mailbox" },
  { id: 6, link: "", imgSrc: achievements, title: "Achievements" },
  { id: 7, link: "", imgSrc: settings, title: "Settings" }
];

let headerItems = { link: "/profile", title: "Dashboard", profileImg: profile };

ReactDOM.render(
  <Router>
    <Switch>

    {/* Account creation and other pages */}
      {/* create account page*/}
      <Route exact path="/create">
        <CreateAccountPage />
      </Route>
      {/* Landing Page*/}
      <Route exact path="/">
        <HomePage />
      </Route>
      {/* FAQ page*/}
      <Route exact path="/FAQ">
        <FAQPage />
      </Route>
      {/* profile page*/}
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/allnotifications">
        <NotificationPage />
      </Route>
      {/* login page*/}
      <Route exact path="/login">
        <LogInPage />
      </Route>
      {/* On logout redirecting to the login page*/}
      <Route exact path="/logout">
        <Logout />
      </Route>

      <Route exact path="/createpost">
        <ContentAuthoringToolComponentWindow />
      </Route>

    {/* Home Screen Starts Here*/}
      {/*Profile update questionaire*/}
      <Route exact path="/questionaire">
        <Questionaire />
      </Route>
      {/* dashboard*/}
      <Route exact path="/dashboard">
        <DashPage />
      </Route>
      {/* courses */}
      <Route exact path="/allcoursesUser">
        <AllCourses />
      </Route>
      {/* library */}
      <Route exact path="/library">
        <LibraryManagementSystem />
      </Route>
      {/* Search Page*/}
      <Route exact path="/search">
        <SearchPage />
      </Route>
      {/* attendance page */}
      <Route exact path="/attendanceUser">
        <AttendanceManagementSystem />
      </Route>
      {/* grades/marks of students */}
      <Route exact path="/gradesUser">
        <GradesManagementSystem />
      </Route>
      <Route exact path="/communities">
        <DiscussionCommunitiesPage />
      </Route>
      {/* discussionList*/}
      <Route exact path="/discussionList/:community" component = {DiscussionListPage}></Route>
      { /* discussionDetail*/}
      <Route exact path="/discussionDetail/:handle" component = {DiscussionDetailPage}></Route>
      {/* marketplace */}
      <Route exact path="/marketplace">
        <Marketplace />
      </Route>
      {/* Fees Payment System */}
      <Route exact path="/feesPayment">
        <FeesPaymentSystem />
      </Route>
      {/* Accomodation/ Hostel Management & Transportation */}
      <Route exact path="/a&t">
        <AccomodationAndTransportManagementSystem />
      </Route>
      {/* Search user and Message Page */}
      <Route exact path="/messageuser">
        <SpecifyUserPage />
      </Route>


    {/* Pages not in use currently so they aren't redirected from Dashboard page */}
      {/* classes the one you have enrolled in Faculties can add a course */}
      <Route exact path="/classes">
        <Classes />
      </Route>
      {/*instructorclass Faculties can add a course*/}
      <Route exact path="/iclasses">
        <InstructorClasses />
      </Route>
      {/* create a class */}
      <Route exact path="/createclass">
        <CreateClass />
      </Route>
      <Route exact path="/classcreation">
        <CreateClassPage />
      </Route>
      {/* all the classes */}
      <Route exact path="/allclasslist">
        <AllClassListPage />
      </Route>
      

      {/* events the one you have enrolled in*/}
      <Route exact path="/events">
        <Events />
      </Route>
      <Route exact path="/eventlist">
        <AllEventsList />
      </Route>
      {/* create event component and page*/}
      <Route exact path="/eventcreation">
        <CreateEventPage />
      </Route>
      <Route exact path="/createevent">
        <CreateEvent />
      </Route>
      {/* list of all the events */}
      <Route exact path="/alleventlist">
        <AllEventListPage />
      </Route>
      
      {/* news comp*/}
      <Route exact path="/news">
        <News />
      </Route>
      {/* schedule page for teachers*/}
      <Route exact path="/schedule">
        <SchedulePage />
      </Route>
      {/* not in used currently*/}
      <Route exact path="/message">
        <MessagePage />
      </Route>
      {/* about*/}
      <Route exact path="/about">
        <AboutPage />
      </Route>
      {/* solutions*/}
      <Route exact path="/solutions">
        <SolutionsPage />
      </Route>
      {/* team */}
      <Route exact path="/team">
        <TeamPage />
      </Route>

      {/* side bar (not in use coz all the sidebars and props are maniually given on all the pages)*/}
      <Route path="/sidebar">
        <Sidebar books={navItems} />
        <Headerbar icons={headerItems} />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
