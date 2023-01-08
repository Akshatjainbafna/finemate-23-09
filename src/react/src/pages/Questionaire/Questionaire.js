import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Questionaire.css";

//images
import BackImage from "../../assets/undraw_questions.png";
import Confirm from "../../assets/confirm.png";
//icons
import { Add } from "@material-ui/icons";
import { FormControlLabel, Input, MenuItem, OutlinedInput, Radio, RadioGroup, Select } from "@material-ui/core";
import { BsXCircleFill } from "react-icons/bs";
//components
import LoadingGif from "../../components/loadingGif";
import AxiosBaseFile from "../../components/AxiosBaseFile";



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
      searchedSubjects: [],
      numberOfYears: 0
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
    else if(! this.state.searchedSubjects.includes(education)){
      alert('Please Enter a valid subject.')
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
    else if(! this.state.searchedSubjects.includes(newSubject)){
      alert('Please Enter a valid subject.')
    }
    else{
      this.setState({arrayOfLookingForwardToLearn: [...this.state.arrayOfLookingForwardToLearn, newSubject]});
    }
    this.setState({newSubject: ""});
  }

  coreStream(event){
    this.setState({coreStream: event.target.value})
    AxiosBaseFile.post('/api/db_get_all_subjects_of_stream', {stream: event.target.value, numberOfYears: this.state.numberOfYears})
    .then(res => {
      this.setState({arrayOfEducation: res.data})
    })
  }
  search(event){
    AxiosBaseFile.post('/api/db_search_a_subject', {subject: event.target.value})
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
'Information Technology',
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
'Agriculture',
'Biotechnology',
'Zoology',
'Clinical Research & Healthcare Management',
'Forestry',
'Microbiology',
'Nursing',
'Physiotherapy',
'Radiology',
'Bioinformatics',
'Physics',
'Botany',
'Computer Science',
'Business Administration',
'Management Science',
'Computer Applications',
'Fine Arts',
'Event Management',
'Law',
'Journalism and Mass Communication',
'Fashion Designing',
'Social Work',
'Business Studies',
'Travel and Tourism Management',
'Aviation Courses',
'Interior Design',
'Hospitality and Hotel Administration',
'Design',
'Performing Arts',
'Chartered Accountancy',
'Company Secretary',
'Foreign Language',
'Pharmacy',
'Dental Surgery',
'Finance',
'Marketing',
'Data Science',
'Economics',
'Philosophy',
'Mathematics',
'Chemistry',
'History',
'Geography',
'Psychology',
'Political Science & International Relations',
'Statistics',
'Anthropology',
'Geology',
'Sociology',
'Commerce',
'Science',
'Arts',
'UPSC',
'SSC',
'Foreign Trade',
'Hindi',
'English'
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
                    <FormControlLabel value="Working Professional" control={<Radio style={{color: '#929699'}} required={true}/>} label="Working Professional" />
                    <FormControlLabel value="PhD" control={<Radio style={{color: '#929699'}} required={true}/>} label="PhD" />
                    <FormControlLabel value="Post Graduation" control={<Radio style={{color: '#929699'}} required={true}/>} label="Post Graduation" />
                    <FormControlLabel value="Graduation" control={<Radio style={{color: '#929699'}} required={true}/>} label="Graduation" />
                    <FormControlLabel value="Undergraducation" control={<Radio style={{color: '#929699'}} required={true}/>} label="Undergraduation" />
                    </div>
                    <div className="d-flex flex-column">
                    <FormControlLabel value="Senior Secondary" control={<Radio style={{color: '#929699'}} required={true}/>} label="Senior Secondary" />
                    <FormControlLabel value="Higher Secondary" control={<Radio style={{color: '#929699'}} required={true}/>} label="Higher Secondary" />
                    <FormControlLabel value="Diploma" control={<Radio style={{color: '#929699'}} required={true}/>} label="Diploma" />
                    <FormControlLabel value="Crash Course" control={<Radio style={{color: '#929699'}} required={true}/>} label="Crash Course" />
                    <FormControlLabel value="Exam Preparation" control={<Radio style={{color: '#929699'}} required={true}/>} label="Exam Preparation" />
                    </div>
                    </div>
                </RadioGroup>
                <p></p>

                {this.state.qualification ? 

                  <div className="mb-5">
                    <div className="yearSliderQuestionaireContainer">
                      <input className='yearSliderQuestionaire' value={this.state.numberOfYears} type="range" min= "0" max= "5" onChange={(e) => this.setState({numberOfYears: e.target.value})}/>
                    </div>
                    <ul class="numberOfYears-labels">
                      <li>Just Started</li>
                      <li>1st yr</li>
                      <li>2nd yr</li>
                      <li>3rd yr</li>
                      <li>4th yr</li>
                      <li>4+ yr</li>
                    </ul>
                  </div>
                : 
                null
                }
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
                All the subjects of your core streams are added, you can add and remove subjects. (select all that apply)
              </h3>
              <br />  
              <div className="allTheTopics">
                <div className="d-flex">
                  <input list="subjects" type='search' name="subject" className="form-control inputQuestionairePage" placeholder="Add Subjects..." value={this.state.education} onChange={(e) => {this.search(e); this.setState({education : e.target.value})}} size='30' maxLength='45'/>
                  <button type="submit" className="addSubjectButtonQuestionaire" onClick={this.addEducation}> <Add /> </button>
                </div>
                
                <datalist id="subjects">
                  {this.state.searchedSubjects.map((name) => 
                    <option key={name} value={name}/>
                  )}
                </datalist>
              </div>
              <br />
              <div className="allTheSubjectsContainer">
                {this.state.arrayOfEducation.map((item, index) => {
                  return <div className="newlyAddedSubject" key={index}>
                    <span>{item}</span>
                    <BsXCircleFill onClick={() => {
                      var arrayOfEducation = this.state.arrayOfEducation;
                      arrayOfEducation.splice(index, 1);
                      this.setState(arrayOfEducation);
                      }}
                      style={{color: 'grey', marginLeft: '4px'}}
                    />
                  </div>
                })}
              </div>
              <br />
              <br />
              <br />
              <br />

              <h3 class="text-dark font-weight-bold">
                What do you want to learn more about? (select all that apply)
              </h3>
                <h3 class="note">
                  You may change your answers afterward on the Profile page.
                </h3>
              <br />
              <div className="allTheTopics">
                <div className="d-flex">
                  <input list="subjects" className="form-control inputQuestionairePage" name="subject" placeholder="Add Subjects..." value={this.state.newSubject} onChange={(e) => {this.search(e); this.setState({newSubject : e.target.value})}} size='30' maxLength='45'/>
                  <button type="submit" className="addSubjectButtonQuestionaire" onClick={this.addNewSubject}> <Add /> </button>
                </div>
                  
                <datalist id="subjects">
                  {this.state.searchedSubjects.map((name) => 
                    <option key={name} value={name}/>
                  )}
                </datalist>

              </div>
              <br />
              <div className="allTheSubjectsContainer">
                {this.state.arrayOfLookingForwardToLearn.map((item, index) => {
                  return <div className="newlyAddedSubject" key={index}>
                    <span>{item}</span>
                    <BsXCircleFill onClick={() => {
                      var arrayOfLookingForwardToLearn = this.state.arrayOfLookingForwardToLearn;
                      arrayOfLookingForwardToLearn.splice(index, 1);
                      this.setState(arrayOfLookingForwardToLearn);
                      }}
                      style={{color: 'grey', marginLeft: '4px'}}
                    />
                  </div>
                })}
              </div>
              <br />
              <br />
              <br />
              <br />
              <p id="messageForNoEducation"></p>
              <div className="d-flex justify-content-end">
                <button class="button">
                    CONFIRM
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
    AxiosBaseFile.post("/api/add_education_from_questionaire", {"username": localStorage.getItem("username"), "qualification": this.state.qualification, "coreStream" : this.state.coreStream, "listOfPreviousEducation": this.state.arrayOfEducation, "listOfLookingForwardToLearn": this.state.arrayOfLookingForwardToLearn, "numberOfYears": this.state.numberOfYears})
    this.setState({ done: true });
    }
  }
}

export default Questionaire;
