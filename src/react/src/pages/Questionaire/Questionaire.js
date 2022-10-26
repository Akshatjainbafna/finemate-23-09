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
import { FormControlLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select } from "@material-ui/core";
import LoadingGif from "../../components/loadingGif";

let headerItems = {
  link: "/profile",
  title: "Questionaire",
  profileImg: profile
};

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
      coreStream: "",
      loading: true,
      searchedSubjects: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.addNewSubject = this.addNewSubject.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);
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

  coreStream(event){
    this.setState({coreStream: event.target.value})
    axios.post('http://127.0.0.1:8103/api/db_get_all_subjects_of_stream', {stream: event.target.value})
    .then(res => {
      this.setState({arrayOfEducation: res.data})
    })
  }
  search(event){
    axios.post('http://127.0.0.1:8103/api/db_search_a_subject', {subject: event.target.value})
    .then(res => {
      this.setState({searchedSubjects: res.data})
    })
  }

  render() {
    if (this.state.done) {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.loading){
      return  <div className="loadingGif">
                <LoadingGif />
              </div>
    }
    const listOfCoreStreams=[
'Architecture',
'Aeronautical Engineering',
'Industrial Engineering',
'Aerospace Engineering',
'Marine Engineering',
'Automobile Engineering',
'Mechanical Engineering',
'Biomedical Engineering',
'Mechatronics Engineering',
'Biotechnology Engineering',
'Metallurgical Engineering',
'Ceramic Engineering',
'Mining Engineering',
'Chemical Engineering',
'Petroleum Engineering',
'Civil Engineering',
'Power Engineering',
'Communications Engineering',
'Production Engineering',
'Computer Science Engineering',
'Robotics Engineering',
'Construction Engineering',
'Structural Engineering',
'Electrical Engineering',
'Telecommunication Engineering',
'Electronics & Communication Engineering',
'Textile Engineering',
'Electronics Engineering',
'Tool Engineering',
'Environmental Engineering',
'Transportation Engineering',
'BSc Agriculture',
'BSc Biotechnology',
'BSc Zoology',
'BSc Clinical Research & Healthcare Management',
'BSc Forestry',
'BSc Microbiology',
'BSc Nursing',
'B.Sc. Physiotherapy',
'B.Sc. Radiology',
'B.Sc. Bioinformatics',
'B.Sc. Physics',
'B.Sc. Chemistry',
'B.Sc. Botany',
'B.Sc. IT',
'B.Sc. Computer Science',
'Business Administration',
'Management Science',
'Computer Applications',
'Fine Arts',
'Event Management',
'LL.B',
'Journalism and Mass Communication',
'Fashion Designing',
'Social Work',
'Business Studies',
'Travel and Tourism Management',
'Aviation Courses',
'Interior Design',
'Hospitality and Hotel Administration',
'BA in Design',
'Performing Arts',
'BA in History',
'Chartered Accountancy',
'Company Secretary',
'Foreign Language',
'Pharmacy',
'Dental Surgery',
'Finance',
'Marketing',
'Data Science',
'Economics',
'Physics', 
'Philosophy',
'Mathematics',
'Chemistry',
'History',
'Geography',
'Psychology',
'Political Science & International Relations',
'Statistics',
'Zoology',
'Anthropology',
'Geology',
'Psychology',
'Sociology',
'Commerce'
    ]

    return (
      <React.Fragment>
        <img class="image" src={BackImage} alt="Map"></img>
        <form class="flex-column" onSubmit={this.submit}>
          <div className="d-flex page">
            <div className="questionairePage">
              <h1 class="header text-dark font-weight-bold">
                Welcome to Finemate!
              </h1>
              <br />
              <h3 class="text-dark font-weight-bold">
                What is your Current Field?
              </h3>
              
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={this.state.qualification}
                  onChange={(e) => { this.setState({qualification: e.target.value}) }}
                  name="qualification"
                            >
                    <div className="d-flex">
                      <div className="d-flex flex-column">
                    <FormControlLabel value="Working Professional" control={<Radio required={true}/>} label="Post Graduation" />
                    <FormControlLabel value="PhD" control={<Radio required={true}/>} label="Post Graduation" />
                    <FormControlLabel value="Post Graduation" control={<Radio required={true}/>} label="Post Graduation" />
                    <FormControlLabel value="Graduation" control={<Radio required={true}/>} label="Graduation" />
                    <FormControlLabel value="Undergraducation" control={<Radio required={true}/>} label="Undergraduation" />
                    </div>
                    <div className="d-flex flex-column">
                    <FormControlLabel value="Senior Secondary" control={<Radio required={true}/>} label="Senior Secondary" />
                    <FormControlLabel value="Higher Secondary" control={<Radio required={true}/>} label="Higher Secondary" />
                    <FormControlLabel value="Diploma" control={<Radio required={true}/>} label="Diploma" />
                    <FormControlLabel value="Crash Course" control={<Radio required={true}/>} label="Crash Course" />
                    <FormControlLabel value="Exam Preparation" control={<Radio required={true}/>} label="Exam Preparation" />
                    </div>
                    </div>
                </RadioGroup>
                <p><br /></p>


              <h3 class="text-dark font-weight-bold">
                What is your most recent stream?
              </h3>
              <br />
              
              <Select
                value={this.state.coreStream}
                onChange={(e) =>  this.coreStream(e)}
                input={<OutlinedInput className='selectFormColortext' />}
                name="coreStream"
              >
                  {listOfCoreStreams.sort().map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                        {name}
                    </MenuItem>
                  ))}
              </Select>
              <p><br /></p>
              <p><br /></p>


              <h3 class="text-dark font-weight-bold">
                All the subjects of your core streams are added, want to remove some or add more subjects that you know?(select all that apply)
              </h3>
              <br />  
              <div className="allTheTopics">
                <div className="d-flex">
                  <input list="subjects" type='search' name="subject" className="form-control inputQuestionairePage" placeholder="Add Subjects..." value={this.state.education} onChange={(e) => {this.search(e); this.setState({education : e.target.value})}} size='30' maxLength='30'/>
                  <button type="submit" className="addSubjectButtonQuestionaire" onClick={this.addEducation}> <Add /> </button>
                </div>
                
                <datalist id="subjects">
                  {this.state.searchedSubjects.map((name) => 
                    <option key={name} value={name}/>
                  )}
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
                  <input list="subjects" className="form-control inputQuestionairePage" name="subject" placeholder="Add Subjects..." value={this.state.newSubject} onChange={(e) => {this.search(e); this.setState({newSubject : e.target.value})}} size='20' maxLength='20'/>
                  <button type="submit" className="addSubjectButtonQuestionaire" onClick={this.addNewSubject}> <Add /> </button>
                </div>
                  
                <datalist id="subjects">
                  {this.state.searchedSubjects.map((name) => 
                    <option key={name} value={name}/>
                  )}
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
              <div className="d-flex justify-content-end">
                <button class="button">
                  <span className="confirm">
                    <img src={Confirm} alt="Map"></img>
                  </span>
                </button>
              </div>
            </div>
            
          </div>
        </form>
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
