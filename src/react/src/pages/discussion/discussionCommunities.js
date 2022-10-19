import React, { Component } from "react";
import "./discussionListPage.css";
import { Link, Redirect } from "react-router-dom";

import HeaderBarForMobile from "../../components/headerbar/HeaderTaskbarForMobile";
import FooterBarForMobile from "../../components/headerbar/FooterBarForMobile";

// Bunch of pictures
import Headerbar from "../..//components/headerbar/HeaderTaskbar.js";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import profileee from "../../assets/profile.png";
import profile from "../../assets/communityIcon (3).png";

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

let headerItems = { link: "/profile", title: "Discussion Board", profileImg: profileee };


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


function Communities(){
    let allTheComunitities =[
        "EntrepreneurShip",
        "Engineers",
        "Developers",
        "Data Analyst",
        "Front End Developers",
        "Blockchain Developers",
        "Ethical Hackers",
        "JEE Aspirants",
        "Android Developers",
        "Graphic Designers ",
        'Fashion Designers',
        'Architects',
        'Interior Designers',
        'Business Analysts',
        'Machine Learning',
        'Gamers',
        'Makeup Artists'
    ]
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

    return (
        <>
        <div className="communityContainer">
        {allTheComunitities.map(
            (community, index) => 
                <Link key={index} to={'/discussionList/'.concat(community)} style={{backgroundColor: "#" + ((1<<24)*Math.random() | 0).toString(16)}} title={"Community of ".concat(community)} className="community">
                    <span className="mr-2">
                        {community}
                    </span>
                    <span><img src={profile} alt=""/></span>
                </Link>
            
        )}
        </div>
        </>
    )
}


class DiscussionCommunitiesPage extends Component {

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }


    if (window.innerWidth <= 600){
      if(localStorage.getItem("usertype")=="noraml"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForNormalUser} />
              <div className="communitiesMobile"><Communities /></div>
            <FooterBarForMobile className="footerForMobile"/>
          </>
        )
      }
      if(localStorage.getItem("usertype")=="student"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForStudent} />
                <div className="communitiesMobile"><Communities /></div>
            <FooterBarForMobile className="footerForMobile" />
          </>
        )
      }
      if(localStorage.getItem("usertype")=="instructor" || "institute"){
        return (
          <>
            <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForInstructorInstitute} />
                <div className="communitiesMobile"><Communities /></div>
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
            <Communities />
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
            <Communities />
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
            <Communities />
          </div>
        </React.Fragment>
      );
    }
  }

  }
}
export default DiscussionCommunitiesPage;
