import React, { Component } from "react";
import "./discussionListPage.css";
import { Link, Redirect } from "react-router-dom";

import HeaderBarForMobile from "../../components/headerbar/HeaderTaskbarForMobile";
import FooterBarForMobile from "../../components/headerbar/FooterBarForMobile";

// Bunch of pictures
import Headerbar from "../..//components/headerbar/HeaderTaskbar.js";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import profileee from "../../assets/profile.png";

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
import { FiShoppingCart } from 'react-icons/fi';
import { ImLibrary } from 'react-icons/im';
import { BsUiChecksGrid } from 'react-icons/bs';
import { BsCashStack } from 'react-icons/bs';
import { FaRegChartBar } from 'react-icons/fa';
import StartupClub from '../../assets/sampleImages/startup-club.png';
import CodersClub from '../../assets/sampleImages/coders-club.png';
import FinemateHangout from '../../assets/sampleImages/finemate-hangout.png';
import FinanceClub from '../../assets/sampleImages/finance-club.png';
import Web3Club from '../../assets/sampleImages/web3-club.png';
import ScienceClub from '../../assets/sampleImages/science-club.png';
import MedicoClub from '../../assets/sampleImages/medico-club.png';
import EditorsClub from '../../assets/sampleImages/editors-club.png';
import LawClub from '../../assets/sampleImages/law-club.png';
import SportsClub from '../../assets/sampleImages/sports-club.png';
import MarketersClub from '../../assets/sampleImages/marketers-club.png';
import DesignersClub from '../../assets/sampleImages/designers-club.png';
import CreateThread from "../../components/discussion/createThread.component";
import { Add } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import DiscussionList from "../../components/discussion/discussionList.component";
// End of pictures

let headerItems = { link: "/profile", title: "Communitites", profileImg: profileee };


let navItemsForNormalUser = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses" },
  { id: 3, link: "/search", imgSrc: search, title: "Search" },
  { id: 4, link: "/communities", imgSrc: forum, title: "Community" },
  { id: 5, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
];

let navItemsForStudent = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses" },
  { id: 3, link: "/library", imgSrc: library, title: "Library" },
  { id: 4, link: "/search", imgSrc: search, title: "Search" },
  { id: 5, link: "/attendanceUser", imgSrc: attendance, title: "Attendance" },
  { id: 6, link: "/gradesUser", imgSrc: grades, title: "Grades" },
  { id: 7, link: "/communities", imgSrc: forum, title: "Community" },
  { id: 8, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 9, link: "/feesPayment", imgSrc: fees, title: "Fees Payment" },
];

let navItemsForInstructorInstitute = [
  { id: 1, link: "/dashboard", imgSrc: dashboard, title: "Home" },
  { id: 2, link: "/allcoursesUser", imgSrc: courses, title: "Courses" },
  { id: 3, link: "/library", imgSrc: library, title: "Library" },
  { id: 4, link: "/search", imgSrc: search, title: "Search" },
  { id: 5, link: "/attendanceUser", imgSrc: attendance, title: "Attendance" },
  { id: 6, link: "/gradesUser", imgSrc: grades, title: "Grades" },
  { id: 7, link: "/communities", imgSrc: forum, title: "Community" },
  { id: 8, link: "/marketplace", imgSrc: cart, title: "Marketplace" },
  { id: 9, link: "/feesPayment", imgSrc: fees, title: "Salary" },
]

let navItemsMobileForNormalUser = [
  { id: 1, link: "/marketplace", imgSrc: <FiShoppingCart />, title: "Marketplace" },
];

let navItemsMobileForStudent = [
  { id: 1, link: "/library", imgSrc: <ImLibrary />, title: "Library" },
  { id: 2, link: "/attendanceUser", imgSrc: <BsUiChecksGrid />, title: "Attendance" },
  { id: 3, link: "/gradesUser", imgSrc: <FaRegChartBar />, title: "Grades" },
  { id: 4, link: "/marketplace", imgSrc: <FiShoppingCart />, title: "Marketplace" },
  { id: 5, link: "/feesPayment", imgSrc: <BsCashStack />, title: "Fees Payment" },
];

let navItemsMobileForInstructorInstitute = [
  { id: 1, link: "/library", imgSrc: <ImLibrary />, title: "Library" },
  { id: 2, link: "/attendanceUser", imgSrc: <BsUiChecksGrid />, title: "Attendance" },
  { id: 3, link: "/gradesUser", imgSrc: <FaRegChartBar />, title: "Grades" },
  { id: 4, link: "/marketplace", imgSrc: <FiShoppingCart />, title: "Marketplace" },
  { id: 5, link: "/feesPayment", imgSrc: <BsCashStack />, title: "Salary" },
]


function Communities() {
  let allTheComunitities = [
    { id: 1, imgSrc: StartupClub, title: "Startup Club" },
    { id: 2, imgSrc: CodersClub, title: "Coders Club" },
    { id: 3, imgSrc: FinemateHangout, title: "Finemate Hangout" },
    { id: 4, imgSrc: FinanceClub, title: "Finance Club" },
    { id: 5, imgSrc: Web3Club, title: "Web3 Club" },
    { id: 6, imgSrc: ScienceClub, title: "Science Club" },
    { id: 7, imgSrc: MedicoClub, title: "Medico Club" },
    { id: 8, imgSrc: SportsClub, title: "Sports Club" },
    { id: 9, imgSrc: EditorsClub, title: "Editors Club" },
    { id: 10, imgSrc: MarketersClub, title: "Marketers Club" },
    { id: 11, imgSrc: LawClub, title: "Law Club" },
    { id: 12, imgSrc: DesignersClub, title: "Designers Club" },
  ]

  /*
  let m = allTheComunitities.length, yo, t;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    yo = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = allTheComunitities[m];
    allTheComunitities[m] = allTheComunitities[yo];
    allTheComunitities[yo] = t;
  }
  */

  return (
    <>
      <ul className="communityScrollbar">
        {allTheComunitities.map(
          (community, index) =>
            <Link onClick={() => { sessionStorage.setItem('communityName', community.title) }} key={index} to={'/discussionList/'.concat(community.title)} title={community.title}>
              <li className='communityItem'>
                <div className='communityContainer'>
                  <div className='communityIcon'> <img src={community.imgSrc} alt="club-icon" /> </div>
                  <p className='communityName'>{community.title}</p>
                </div>
              </li>
            </Link>
        )}
      </ul>
    </>
  )
}


class DiscussionCommunitiesPage extends Component {
  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }


    if (window.innerWidth <= 600) {
      if (localStorage.getItem("usertype") == "normal") {
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForNormalUser} />
            <div className="communitiesMobile">
              <Communities />
              <DiscussionList />
            </div>
            <FooterBarForMobile className="footerForMobile" />
          </>
        )
      }
      if (localStorage.getItem("usertype") == "student") {
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForStudent} />
            <div className="communitiesMobile">
              <Communities />
              <DiscussionList />
            </div>
            <FooterBarForMobile className="footerForMobile" />
          </>
        )
      }
      if (localStorage.getItem("usertype") == "instructor" || "institute") {
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForInstructorInstitute} />
            <div className="communitiesMobile">
              <Communities />
              <DiscussionList />
            </div>
            <FooterBarForMobile className="footerForMobile" />
          </>
        )
      }
    }
    else {

      if (localStorage.getItem("usertype") == "normal") {
        return (
          <React.Fragment>
            <Sidebar books={navItemsForNormalUser} />
            <Headerbar icons={headerItems} />
            <div className="discussionBox">
              <Communities />
              <DiscussionList />
            </div>
          </React.Fragment>
        );
      }
      if (localStorage.getItem("usertype") == "student") {
        return (
          <React.Fragment>
            <Sidebar books={navItemsForStudent} />
            <Headerbar icons={headerItems} />
            <div className="discussionBox">
              <Communities />
              <DiscussionList />
            </div>
          </React.Fragment>
        );
      }

      if (localStorage.getItem("usertype") == "instructor" || "institute") {
        return (
          <React.Fragment>
            <Sidebar books={navItemsForInstructorInstitute} />
            <Headerbar icons={headerItems} />
            <div className="discussionBox">
              <Communities />
              <DiscussionList />
            </div>
          </React.Fragment>
        );
      }
    }

  }
}
export default DiscussionCommunitiesPage;
