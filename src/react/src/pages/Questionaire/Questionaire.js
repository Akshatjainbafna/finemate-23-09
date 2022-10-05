import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Questionaire.css";

//images
import BackImage from "../../assets/undraw_questions.png";
import Confirm from "../../assets/confirm.png";
import profile from "../../assets/profile.png";
//sidebar images
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

//components
import Headerbar from "../..//components/headerbar/HeaderTaskbar.js";
import Sidebar from "../..//components/sidebar/sidebar.component.js";
import { Add, TimerSharp } from "@material-ui/icons";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

let headerItems = {
  link: "/profile",
  title: "Questionaire",
  profileImg: profile
};

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

class Questionaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      education: "",
      arrayOfEducation: [],
      newSubject: "",
      arrayOfLookingForwardToLearn: [],
      qualification: "",
      coreStream: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.addNewSubject = this.addNewSubject.bind(this);
  }

  componentDidMount() {
    if (window.token) {
      this.setState({ loggedIn: true });
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let data = {};
    data[name] = value;

    this.setState(data);
  }

  addEducation(event){
    event.preventDefault();
    var arrayOfEducation = this.state.arrayOfEducation;
    var education = this.state.education;

    if (arrayOfEducation.includes(education)){
      console.log("Aleady Added!")
    }
    else{
      this.setState({arrayOfEducation: [...this.state.arrayOfEducation, education]});
    }
    this.setState({education: ""});
  }

  addNewSubject(event){
    event.preventDefault();
    var arrayOfLookingForwardToLearn = this.state.arrayOfLookingForwardToLearn;
    var newSubject =this.state.newSubject;

    if (arrayOfLookingForwardToLearn.includes(newSubject)){
      console.log("Aleady Added")
    }
    else{
      this.setState({arrayOfLookingForwardToLearn: [...this.state.arrayOfLookingForwardToLearn, newSubject]});
    }
    this.setState({newSubject: ""});
  }

  render() {
    if (this.state.done) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <React.Fragment>
        <Sidebar books={navItems} />
        <Headerbar icons={headerItems} />
        <img class="image" src={BackImage} alt="Map"></img>
        <form class="flex-column" onSubmit={this.submit}>
          <div className="d-flex page">
            <div className="questionairePage">
              <h1 class="header text-dark font-weight-bold">
                Welcome to Finemate!
              </h1>
              <br />
              <h3 class="text-dark font-weight-bold">
                What is your Highest Qualification?
              </h3>
              <br />
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={this.state.qualification}
                  onChange={(e) => { this.setState({qualification: e.target.value}) }}
                  name="qualification"
                            >
                    <FormControlLabel value="Post Graduation" control={<Radio required={true}/>} label="Post Graduation" />
                    <FormControlLabel value="Graduation" control={<Radio required={true}/>} label="Graduation" />
                    <FormControlLabel value="Undergraducation" control={<Radio required={true}/>} label="Undergraduation" />
                    <FormControlLabel value="Senior Secondary" control={<Radio required={true}/>} label="Senior Secondary" />
                    <FormControlLabel value="Higher Secondary" control={<Radio required={true}/>} label="Higher Secondary" />
                </RadioGroup>
              <br />
              <br />

              <h3 class="text-dark font-weight-bold">
                What is your recent core stream?
              </h3>
              <br />
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={this.state.coreStream}
                  onChange={(e) => { this.setState({coreStream: e.target.value}) }}
                  name="coreStream"
                            >
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    <FormControlLabel value="Science" control={<Radio required={true}/>} label="Science" />
                    <FormControlLabel value="Commerce" control={<Radio required={true}/>} label="Commerce" />
                    <FormControlLabel value="Arts" control={<Radio required={true}/>} label="Arts" />
                    <FormControlLabel value="Computer Applications" control={<Radio required={true} />} label="Computer Applications" />
                    <FormControlLabel value="Nursing" control={<Radio required={true}/>} label="Nursing" />
                  </div>
                  <div className="d-flex flex-column">
                    <FormControlLabel value="Medical" control={<Radio required={true}/>} label="Medical" />
                    <FormControlLabel value="Medicinal" control={<Radio required={true}/>} label="Medicinal"  />
                    <FormControlLabel value="Engineering" control={<Radio required={true}/>} label="Engineering" />
                    <FormControlLabel value="Finance" control={<Radio required={true}/>} label="Finance" />
                    <FormControlLabel value="Management" control={<Radio required={true}/>} label="Management" />
                  </div>
                </div>
                </RadioGroup>
                <input type="text" className="form-control fonm-control-md" placeholder="Other"></input>
              <br />
              <br />


              <h3 class="text-dark font-weight-bold">
                What are the Subjects or Skills have already studied or acquired? (select all that apply)
              </h3>
              <br />
              <div className="allTheTopics">
              <div className="d-flex">
                <input list="subjects" name="subject" className="form-control fonm-control-md" placeholder="Add Subjects..." value={this.state.education} onChange={(e) => this.setState({education : e.target.value})} size='20' maxLength='20' required/>
                <button type="submit" className="addSubjectButtonQuestionaire" onClick={this.addEducation}> <Add /> </button>
              </div>
                <datalist id="subjects">
                    <option value="Computer Science"/>
                    <option value="Science"/>
                    <option value="Geography"/>
                    <option value="Pharmacy"/>
                    <option value="Accounts"/>
                    <option value="Economics"/>
                    <option value="Chemistry"/>
                    <option value="Physics"/>
                 </datalist>
              </div>
              <br />
              {this.state.arrayOfEducation.map((item, index) => {
                return <span className="newlyAddedSubject" key={index}>{item}</span>
              })}
              <br />
              <br />
              <br />
              <br />

              <h3 class="text-dark font-weight-bold">
                What do you want to learn more about? (select all that apply)
              </h3>
                <h3 class="note">
                  You may change your answers afterward in the Profile page.
                </h3>
              <br />
              <div className="allTheTopics">
                <div className="d-flex">
                  <input list="subjects" className="form-control fonm-control-md" name="subject" placeholder="Add Subjects..." value={this.state.newSubject} onChange={(e) => this.setState({newSubject : e.target.value})} size='20' maxLength='20' required/>
                  <button type="submit" className="addSubjectButtonQuestionaire" onClick={this.addNewSubject}> <Add /> </button>
                </div>
                  
                  <datalist id="subjects">
                    <option value="Computer Science"/>
                    <option value="Science"/>
                    <option value="Geography"/>
                    <option value="Pharmacy"/>
                    <option value="Accounts"/>
                    <option value="Economics"/>
                    <option value="Chemistry"/>
                    <option value="Physics"/>
                 </datalist>
              </div>
              <br />
              {this.state.arrayOfLookingForwardToLearn.map((item, index) => {
                return <span className="newlyAddedSubject" key={index}>{item}</span>
              })}
              <br />
              <br />
              <br />
              <br />
              <p id="messageForNoEducation"></p>
            </div>
          </div>
          <button class="button">
            <span className="confirm">
              <img src={Confirm} alt="Map"></img>
            </span>
          </button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }

  submit(e) {
    e.preventDefault();
    if (this.state.arrayOfEducation.length == 0 || this.state.arrayOfLookingForwardToLearn == 0){
      document.getElementById("messageForNoEducation").innerHTML="Please Add Subjects that you have already Learnt and Subjects/Topics you want to learn."
    }
    else{
    axios.post("http://127.0.0.1:8103/api/add_education_from_questionaire", {"username": localStorage.getItem("username"), "qualification": this.state.qualification, "coreStream" : this.state.coreStream, "listOfPreviousEducation": this.state.arrayOfEducation, "listOfLookingForwardToLearn": this.state.arrayOfLookingForwardToLearn})
    this.setState({ done: true });
    }
  }
}

export default Questionaire;
