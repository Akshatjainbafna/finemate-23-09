import React from "react";
import './TodoListPage.css';
import Headerbar from "../../components/headerbar/HeaderTaskbar.js";
import profile from "../../assets/profile.png";
import Sidebar from "../..//components/sidebar/sidebar.component.js";

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
import TodoComponent from "../../components/todo/todo.component";


let headerItems = { link: "/profile", title: "Todos", profileImg: profile };

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
  


class TodoListPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }
  
  componentDidMount(){
    setTimeout(() => {
    this.setState({loading: false})
    }, 2000);
  }
    render() {
        if (!localStorage.getItem("token")) {
          return <Redirect to="/login" />;
        }
        if (this.state.loading){
          return  <div className="loadingGif">
                    <svg xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="25%" height="60px" viewBox="5.5 13 89 14"><defs><filter id="ldBar-5d1975c4de22-filter" x="-1" y="-1" width="3" height="3"><feMorphology operator="dilate" radius="3"></feMorphology><feColorMatrix values="0 0 0 0 1    0 0 0 0 1    0 0 0 0 1    0 0 0 1 0" result="cm"></feColorMatrix></filter><mask id="ldBar-5d1975c4de22-mask"><image xlinkHref="" filter="url(#ldBar-5d1975c4de22-filter)" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid"></image></mask><g><mask id="ldBar-5d1975c4de22-mask-path"><path d="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20" fill="#fff" stroke="#fff" filter="url(#ldBar-5d1975c4de22-filter)"></path></mask></g><clipPath id="ldBar-5d1975c4de22-clip"><rect class="mask" fill="#000"></rect></clipPath><pattern id="ldBar-5d1975c4de22-pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="150" height="150"><image x="0" y="0" width="150" height="150" xlinkHref="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KICAgICAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIwIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOWRmIi8+PHN0b3Agb2Zmc2V0PSI2LjI1JSIgc3RvcC1jb2xvcj0iIzlmZCIvPjxzdG9wIG9mZnNldD0iMTIuNSUiIHN0b3AtY29sb3I9IiNkZjkiLz48c3RvcCBvZmZzZXQ9IjE4Ljc1JSIgc3RvcC1jb2xvcj0iI2ZkOSIvPjxzdG9wIG9mZnNldD0iMjUlIiBzdG9wLWNvbG9yPSIjOWRmIi8+PHN0b3Agb2Zmc2V0PSIzMS4yNSUiIHN0b3AtY29sb3I9IiM5ZmQiLz48c3RvcCBvZmZzZXQ9IjM3LjUlIiBzdG9wLWNvbG9yPSIjZGY5Ii8+PHN0b3Agb2Zmc2V0PSI0My43NSUiIHN0b3AtY29sb3I9IiNmZDkiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzlkZiIvPjxzdG9wIG9mZnNldD0iNTYuMjUlIiBzdG9wLWNvbG9yPSIjOWZkIi8+PHN0b3Agb2Zmc2V0PSI2Mi41JSIgc3RvcC1jb2xvcj0iI2RmOSIvPjxzdG9wIG9mZnNldD0iNjguNzUlIiBzdG9wLWNvbG9yPSIjZmQ5Ii8+PHN0b3Agb2Zmc2V0PSI3NSUiIHN0b3AtY29sb3I9IiM5ZGYiLz48c3RvcCBvZmZzZXQ9IjgxLjI1JSIgc3RvcC1jb2xvcj0iIzlmZCIvPjxzdG9wIG9mZnNldD0iODcuNSUiIHN0b3AtY29sb3I9IiNkZjkiLz48c3RvcCBvZmZzZXQ9IjkzLjc1JSIgc3RvcC1jb2xvcj0iI2ZkOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzlkZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgo8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNncmFkaWVudCkiPgo8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgZnJvbT0iLTEwMCwtMCIKdG89IjAsMCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3JlY3Q+PC9zdmc+"></image></pattern></defs><g><path d="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20" fill="none" class="baseline" stroke="#ddd" stroke-width="0.5"></path></g><g><path d="M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20" class="mainline" clip-path="" fill="none" stroke-width="3" stroke="url(#ldBar-5d1975c4de22-pattern)" stroke-dasharray="41.60917663574219 42.60917663574219"></path></g></svg>
                  </div>
        }
    
    
        if (window.innerWidth <= 600){
          if(localStorage.getItem("usertype")=="noraml"){
            return (
              <>
                <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForNormalUser} />
                  <div className="todoPageMobile">
                    <TodoComponent />
                  </div>
                <FooterBarForMobile className="footerForMobile"/>
              </>
            )
          }
          if(localStorage.getItem("usertype")=="student"){
            return (
              <>
                <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForStudent} />
                    <div className="todoPageMobile">
                        <TodoComponent />
                    </div>
                <FooterBarForMobile className="footerForMobile" />
              </>
            )
          }
          if(localStorage.getItem("usertype")=="instructor" || "institute"){
            return (
              <>
                <HeaderBarForMobile className="headerForMobile" books={navItemsMobileForInstructorInstitute} />
                    <div className="todoPageMobile">
                        <TodoComponent />
                    </div>
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
                <TodoComponent />
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
                <TodoComponent />
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
                <TodoComponent />
              </div>
            </React.Fragment>
          );
        }
      }
    }
}
export default TodoListPage