import React, { Component } from "react";
import { Card } from "react-bootstrap";
import fb from "../../assets/fb.png";
import li from "../../assets/li.png";
import profilePic from "../../assets/profilePic.png";
import tinyprofilePic from "../../assets/tinyprofile.png";
import up from "../../assets/up.png";
import edit from "../../assets/edit.png";
import del from "../../assets/del.png";
import editButton from "../../assets/editButton.png";
import "./profile.css";
import ColourText from "./colorText.component.js";
import axios from "axios";
import { Add, AddPhotoAlternateRounded } from "@material-ui/icons";
import { Button, Input, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaying: true,
      newFirstName: this.props.firstName,
      newLastName: this.props.lastName,
      newPhoneNumber: this.props.phoneNumber,
      newDescription: this.props.description,
      newProfilePicture: this.props.profilePicture,
      recentPosts: [],
      savedPosts: []
    };
    this.submit = this.submit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value)
        let data = {};
        data[name] = value;
        this.setState(data);
  }

  componentDidMount(){
    Axios.post('http://127.0.0.1:8103/api/db_get_all_post_of_user', {username: localStorage.getItem('username')})
    .then(res => {
      console.log(res.data)
        this.setState({recentPosts : res.data})
    })
    .catch(err => console.log(err))

    Axios.post('http://127.0.0.1:8103/api/db_get_saved_post_of_user', {username: localStorage.getItem('username')})
    .then(res => {
      console.log(res.data)
        this.setState({savedPosts : res.data})
    })
    .catch(err => console.log(err))
  }


  render() {
    const { educations } = this.props;
    const { skills } = this.props;
    const { interests } = this.props;
    const { completedCourses } = this.props;
    const { languages } = this.props;
    const { description } = this.props;
    const { name } = this.props;
    const { username } = this.props;
    const { totalDaysJoined } = this.props;
    const { firstName } = this.props;
    const { lastName } = this.props;
    const { email } = this.props;
    const { phoneNumber } = this.props;
    const { friends } = this.props;
    const { connections } = this.props;
    const { profilePicture } = this.props;

    const education = [
      'Computer Science',
      'Mechanical',
      'Electical',
      'Fine Arts',
      'Archiology',
      'Economics',
      'Finance',
      'Marketing',
      'Foreign Trade',
      'Business Studies',
      'Hotel Management',
      'Event Management',
      'Data Science',
      'Machine Learning',
      'WEB 3',
      'Blockchain',
      'Artificial Intelligence',
      'Cloud Computing',
      'Advanced Mathematics',
      'Advanced Physics',
      'Chemical Engineering',
      'Database Management',
      'Deep Learning',
      'Natural Language Processing',
      'Neuroscience',
      'Accounts',
      'Indian Constitution',
      'Forensic Science',
      'Political Studies',
      'Quants',
      'English Literature',
      
    ];
    const skill = [
      'Wen Designing',
      'UI/UX Designing',
      'AutoCad',
      'Fashion Designing',
      'Interior Designing',
      'Video Editing',
      'Cinematography',
      'Basic Photoshop',
      'Advanced Photoshop',
      '2D Animations',
      '3D Animations',
      'Painting',
    ];
    const course = [
      
    ];
    const language = [
      'Chinese', 'English', 'Spanish', 'Arabic', 'French', 'Persian', 'German', 'Russian', 'Malay', 'Portuguese', 'Italian', 'Turkish', 'Lahnda', 'Tamil', 'Urdu', 'Korean', 'Hindi', 'Bengali', 'Japanese', 'Vietnamese', 'Telugu', 'Marathi'
    ];
    const interest = [
      'Swimming',
      'Soccer',
      'Cricket',
      'Dancing',
      'Singing',
      'Listening Music',
      'Cooking',
      'Badminton',
      'Entreprenurship',
      'K-POP',
      'Movies',
      'Guitar',
      'Piano',
    ];
    return (
      <form
        className="main"
        id="my-form"
        onSubmit={e =>
          this.submit(e, description, name, firstName, lastName, phoneNumber, profilePicture)
        }
      >
        {/* card with education info */}
        <Card className="edu">
        <div className="headerOfBlockInfoCard">
          <div className="profileDisplayData">
          <div className="leftBlockofInfoCard">

              <div className="profile_pic_slot">
                {this.state.displaying ? 
                  profilePicture ? 
                    <div><img src={require('../../assets/profilePictures/'+ profilePicture)} className="elementPic" /> </div> 
                    :
                    <div><img src={profilePic} className="elementPic" /> </div>
                :
                <div>
                  <Button variant="contained" component="label" className='changeProfilePictureBtn' >
                    <AddPhotoAlternateRounded />
                    <div id="uploadMedia"> <input hidden type="file" name="newProfilePicture"  onChange={this.onChangeHandler} form="my-form" accept="image/*"/></div>
                  </Button>
                </div>
                }
                <div className="usernameBlocky">{username}</div>
              </div>

              </div>

            <div className="rightBlockofInfoCard">
              <div className="pointsAndFriendsCountSection">
                <div className="pointsAndFriendsCount"><div><Button>10</Button></div> <div>Points</div> </div>
                <div className="pointsAndFriendsCount"><div><Button>{friends ? friends.length : "0"}</Button></div> <div>Friends</div> </div>
                <div className="pointsAndFriendsCount"><div><Button>{connections ? connections.length : "0"}</Button></div> <div>Network</div> </div>
              </div> 
              <div className="addButton"> <button className="edit_button_profile" type="button" onClick={() => { this.setState({ displaying: !this.state.displaying }) }}>Edit Profile</button> </div>
            </div> 

          </div>
            
            <div className="descriptionOf"> {this.state.displaying ? description
            : 
              <TextField
                variant="outlined"
                fullWidth={true}
                className="description"
                type="text"
                defaultValue={description}
                name="newDescription"
                placeholder="Update Bio"
                onChange={this.onChangeHandler}
              />
            } </div>
          </div>


          <Card.Body>
            
            <Card.Title className="listed_titles">Education</Card.Title>
            <Card.Text className="listed_educations">
              <ColourText textInfo={educations} field='education' editMode={!this.state.displaying} listOfItems={education} />
            </Card.Text>

            <Card.Title className="listed_titles">Skills</Card.Title>
            <Card.Text className="listed_skills">
              <ColourText textInfo={skills} field='skill' editMode={!this.state.displaying} listOfItems={skill} />
            </Card.Text>

            <Card.Title className="listed_titles">Completed course</Card.Title>
            <Card.Text className="listed_courses">
              <ColourText textInfo={completedCourses} field='course' editMode={!this.state.displaying} listOfItems={course} />
            </Card.Text>

            <Card.Title className="listed_titles">Languages</Card.Title>
            <Card.Text className="listed_languages">
              <ColourText textInfo={languages} field='language' editMode={!this.state.displaying} listOfItems={language}  />
            </Card.Text>

            <Card.Title className="listed_titles">Interests</Card.Title>
            <Card.Text className="listed_interests">
              <ColourText textInfo={interests} field='interest' editMode={!this.state.displaying} listOfItems={interest}/>
            </Card.Text>

          </Card.Body>
        </Card>

        {this.state.displaying ? 
        <Card className="info"> 
            <Card.Body className="profileElements">
              <Card.Title className="profileElementsTitle">
                Achievements
              </Card.Title>
              <div className="profileElementContainer">
                
              </div>
            </Card.Body>

            <Card.Body className="profileElements">
              <Card.Title className="profileElementsTitle">
                Recent Posts
              </Card.Title>
              <div className="profileElementContainer">
                {this.state.recentPosts.map((post, index) => 
                  <Link to={'/post/'.concat(post._id.$oid)} title='Post' key={index}>
                      <div className="postThumbnail">
                        <div className="factThumbnail" name="factName" ref={this.referenceToPostFact}>
                            <p className="subTopicThumbnail">{post.subtopic}</p>
                            <p className="fact"> {post.fact}</p>
                        </div>
                        <img src={require('../../assets/postBackgroundImages/'+ post.background)} />
                      </div>
                    </Link>
                )}
              </div>
            </Card.Body>

            <Card.Body className="profileElements">
              <Card.Title className="profileElementsTitle">
                Saved Posts
              </Card.Title>
              <div className="profileElementContainer">
              {this.state.savedPosts.map((post, index) => 
                <Link to={'/post/'.concat(post._id.$oid)} title='Post' key={index}>
                  <div className="postThumbnail">
                    <div className="factThumbnail" name="factName" ref={this.referenceToPostFact}>
                      <p className="subTopicThumbnail">{post.subtopic}</p>
                      <p className="fact"> {post.fact}</p>
                    </div>
                    <img src={require('../../assets/postBackgroundImages/'+ post.background)} />
                  </div>
                </Link>
              )}
              </div>
            </Card.Body>
        </Card>
      :
        
        <Card className="info">

          {/* card with personal info */}

          <div className="top">
            <Card.Body>
              <Card.Title className="title">First Name</Card.Title>
              {this.state.displaying ? (
                <Card.Text className="body">{firstName}</Card.Text>
              ) : (
                <Input
                  className="body"
                  type="text"
                  defaultValue={firstName}
                  name="newFirstName"
                  onChange={this.onChangeHandler}
                />
              )}
            </Card.Body>
            <Card.Body>
              <Card.Title className="title">Last Name</Card.Title>
              {this.state.displaying ? (
                <Card.Text className="body">{lastName}</Card.Text>
              ) : (
                <Input
                  className="body"
                  type="text"
                  defaultValue={lastName}
                  name="newLastName"
                  onChange={this.onChangeHandler}
                />
              )}
            </Card.Body>
          </div>
          <div className="bottom">
            <Card.Body style={{ flex: 1 }}>
              <Card.Title className="title">
                Registered Email Address
              </Card.Title>
              <Card.Text className="body">{email}</Card.Text>
            </Card.Body>
            <Card.Body style={{ flex: 1 }}>
              <Card.Title className="title">Registered Phone Number</Card.Title>
              {this.state.displaying ? (
                <Card.Text className="body">{phoneNumber}</Card.Text>
              ) : (
                <Input
                  className="body"
                  type="text"
                  defaultValue={phoneNumber}
                  name="newPhoneNumber"
                  onChange={this.onChangeHandler}
                />
              )}
            </Card.Body>
          </div>
          <div style={{ flexDirection: "row", alignSelf: "flex-end"}}>
            <button
              className="edit_button"
              form="my-form"
              type="submit"
              onClick={() => {}}
            >
              Save
            </button>
          </div>
        </Card>
  }
      </form>
    );
  }


  submit(e, description, firstName, lastName, phoneNumber, profilePicture) {
    // e.preventdefault();
    if (this.state.newFirstName != firstName) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_first_name", {
          first_name: this.state.newFirstName,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newLastName != lastName) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_last_name", {
          last_name: this.state.newLastName,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newPhoneNumber != phoneNumber) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_phone_number", {
          phone_number: this.state.newPhoneNumber,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newDescription != description) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_description", {
          description: this.state.newDescription,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newProfilePicture != profilePicture) {
      const form_data = new FormData();
      const profilePictureSend = document.querySelector('#uploadMedia > input[type="file"]').files[0];
      form_data.append('username', localStorage.getItem('username'));
      form_data.append("profilePicture" , profilePictureSend);
      for (var key of form_data.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

      axios.post("http://127.0.0.1:8103/api/db_update_profile_picture", form_data)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
export default Profile;
