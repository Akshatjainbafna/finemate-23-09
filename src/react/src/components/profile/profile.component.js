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
import ColourText from "./colourText.component.js";
import axios from "axios";
import { Add } from "@material-ui/icons";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaying: true,
      editButton: false
    };
    this.newFirstName = React.createRef();
    this.newLastName = React.createRef();
    this.newPhoneNumber = React.createRef();
    this.newName = React.createRef();
    this.newDescription = React.createRef();
    this.submit = this.submit.bind(this);
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
    return (
      <form
        className="main"
        id="my-form"
        onSubmit={e =>
          this.submit(e, description, name, firstName, lastName, phoneNumber)
        }
      >
        {/* card with education info */}
        <Card className="edu">
        <div className="headerOfBlockInfoCard">
          <div className="profileDisplayData">
          <div className="leftBlockofInfoCard">
              <div className="profile_pic_slot">
                <div><img src={profilePic} className="elementPic" /> </div>
                <div className="usernameBlocky">{username}</div>
              </div>
              </div>

            <div className="rightBlockofInfoCard">
              <div className="pointsAndFriendsCountSection">
                <div className="pointsAndFriendsCount"><div>573</div> <div>Points</div> </div>
                <div className="pointsAndFriendsCount"><div>73</div> <div>Friends</div> </div>
                <div className="pointsAndFriendsCount"><div>248</div> <div>Network</div> </div>
              </div> 
              {localStorage.getItem('username')==username ? <div className="addButton"> <button className="edit_button_profile" type="button" onClick={() => {
                this.setState({ displaying: !this.state.displaying });
              }}>Edit Profile</button> </div>
              :
              <div className="addButton">
                  <button
                    className="addFriend_button"
                    type="submit"
                    onClick={() => {}}
                  >
                    Add Friend
                  </button>
                  <button
                    className="connect_button"
                    type="submit"
                    onClick={() => {}}
                  >
                    Connect 
                  </button>
              </div>
              }
            </div> 

          </div>
            
            <div className="descriptionOf"> {this.state.displaying ? description
            : 
              <input
                className="description"
                type="text"
                defaultValue={description}
                ref={this.newDescription}
                placeholder="Update Bio"
              />
            } </div>
          </div>


          <Card.Body>
            
            <Card.Title className="listed_titles">Education</Card.Title>
            <Card.Text className="listed_educations">
              <ColourText textInfo={educations} />
            </Card.Text>

            <Card.Title className="listed_titles">Skills</Card.Title>
            <Card.Text className="listed_skills">
              <ColourText textInfo={skills} />
            </Card.Text>

            <Card.Title className="listed_titles">Completed course</Card.Title>
            <Card.Text className="listed_courses">
              <ColourText textInfo={completedCourses} />
            </Card.Text>

            <Card.Title className="listed_titles">Languages</Card.Title>
            <Card.Text className="listed_languages">
              <ColourText textInfo={languages} />
            </Card.Text>

            <Card.Title className="listed_titles">Interests</Card.Title>
            <Card.Text className="listed_interests">
              <ColourText textInfo={interests} />
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
                <div className="individualProfileElement">
                <img src={fb} className="element_image" />
                <img src={fb} className="element_image" />
                <img src={fb} className="element_image" />
                </div>
              </div>
            </Card.Body>
            <Card.Body className="profileElements">
              <Card.Title className="profileElementsTitle">
                Recent Posts
              </Card.Title>
              <div className="profileElementContainer">
                <div className="individualProfileElement">
                <img src={fb} className="element_image" />
                <img src={fb} className="element_image" />
                <img src={fb} className="element_image" />
                </div>
              </div>
            </Card.Body>
            <Card.Body className="profileElements">
              <Card.Title className="profileElementsTitle">
                Saved Posts
              </Card.Title>
              <div className="profileElementContainer">
                <div className="individualProfileElement">
                <img src={fb} className="element_image" />
                <img src={fb} className="element_image" />
                <img src={fb} className="element_image" />
                </div>
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
                <input
                  className="body"
                  type="text"
                  defaultValue={firstName}
                  ref={this.newFirstName}
                />
              )}
            </Card.Body>
            <Card.Body>
              <Card.Title className="title">Last Name</Card.Title>
              {this.state.displaying ? (
                <Card.Text className="body">{lastName}</Card.Text>
              ) : (
                <input
                  className="body"
                  type="text"
                  defaultValue={lastName}
                  ref={this.newLastName}
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
                <input
                  className="body"
                  type="text"
                  defaultValue={phoneNumber}
                  ref={this.newPhoneNumber}
                />
              )}
            </Card.Body>
          </div>
          <div className="pic_and_account_top">
            <div className="pic">
              <Card.Body>
                <Card.Title className="title">Picture</Card.Title>
              </Card.Body>
            </div>
            <div className="linked">
              <Card.Body>
                <Card.Title className="title">Linked Accounts</Card.Title>
              </Card.Body>
            </div>
          </div>
          <div className="pic_and_account_bottom">
            <div className="pic">
              
              <div className="spacer"></div>
              <div className="edit_slot">
                <button className="element_button">Upload</button>
                <button className="element_button">Edit</button>
                <button className="element_button">Delete</button>
              </div>
            </div>
            <div className="linked">
              <div className="linked_pics">
                <button className="invis_button">
                  <img src={fb} className="element_image" />
                </button>
                <button className="invis_button">
                  <img src={li} className="element_image" />
                </button>
              </div>
            </div>
          </div>
          <div style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <button
              className="edit_button"
              type="button"
              onClick={() => {
                this.setState({ displaying: false });
              }}
            >
              Edit
            </button>
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


  submit(e, description, name, firstName, lastName, phoneNumber) {
    // e.preventdefault();
    if (this.newFirstName.current.value != firstName) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_first_name", {
          first_name: this.newFirstName.current.value,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.newLastName.current.value != lastName) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_last_name", {
          last_name: this.newLastName.current.value,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.newPhoneNumber.current.value != phoneNumber) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_phone_number", {
          phone_number: this.newPhoneNumber.current.value,
          username: localStorage.getItem("username")
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.newDescription.current.value != description) {
      axios
        .post("http://127.0.0.1:8103/api/db_update_profile_description", {
          description: this.newDescription.current.value,
          username: localStorage.getItem("username")
        })
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
