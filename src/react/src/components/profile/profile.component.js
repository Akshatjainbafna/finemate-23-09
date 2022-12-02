import React, { Component } from "react";
import { Card } from "react-bootstrap";
import profilePic from "../../assets/profilePic.png";
import "./profile.css";
import ColourText from "./colorText.component.js";
import { AddPhotoAlternateRounded } from "@material-ui/icons";
import { Button, Input, Menu, MenuItem, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";

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
      savedPosts: [],
      redirectToLeaderboard: false,
      openFriendList: null,
      openConnectionList: null,
      selectededNewProfilePicture: false
    };
    this.submit = this.submit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;
        this.setState(data, () => {
          if (name == 'newProfilePicture' && value){
            this.setState({selectededNewProfilePicture: true}, () => {
              const bgImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];
              const idOfPreview = document.getElementById('previewBackground');
              idOfPreview.src = URL.createObjectURL(bgImage)
            })
          }
      });
  }

  componentDidMount(){
    AxiosBaseFile.post('/api/db_get_all_post_of_user', {username: localStorage.getItem('username')})
    .then(res => {
        this.setState({recentPosts : res.data})
    })
    .catch(err => console.log(err))

    AxiosBaseFile.post('/api/db_get_saved_post_of_user', {username: localStorage.getItem('username')})
    .then(res => {
        this.setState({savedPosts : res.data})
    })
    .catch(err => console.log(err))
  }
  removeFriend(username2){
    AxiosBaseFile.post('/api/db_remove_friend', {'username1' : localStorage.getItem('username'), 'username2' : username2})
    .then(() => {
      window.location.reload(true);

    })
    .catch(err => console.log(err))
}

disconnect(username2){
    AxiosBaseFile.post('/api/db_remove_connection', {'username1' : localStorage.getItem('username'), 'username2' : username2})
    .then(() => {
      window.location.reload(true);
    })
    .catch(err => console.log(err))
}

displayPanel(panel){
  for (let x=1; x<=3; x++){
      var panelId= 'panel'+String(x);
      if (panelId == panel){
          document.getElementById(panelId).style.display="block";
      }
      else{
          document.getElementById(panelId).style.display="none";
      }
  }
}
  render() {
    if (this.state.redirectToLeaderboard){
      return <Redirect to='/leaderboard' />
    }
    const openFriend = Boolean(this.state.openFriendList);
    const openConnection = Boolean(this.state.openConnectionList);

    const { educations } = this.props;
    const { skills } = this.props;
    const { interests } = this.props;
    const { hate } = this.props;
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

    const education=[]
    const education2 = [
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
                    <div><img src={require('../../assets/profilePictures/'+ profilePicture)} alt="not found" className="elementPic" /> </div>   
                  :
                    <div><img src={profilePic} alt="not found" className="elementPic" /> </div>
                :
                <div>
                  <Button variant="contained" component="label" className='changeProfilePictureBtn' style={{borderRadius: '100%', padding: '0'}} >
                    {this.state.selectededNewProfilePicture ?
                      <img id="previewBackground" alt="not selected" style={{objectFit: 'cover', height:"15vh", width:"15vh", borderRadius: '100%'}} />
                      :
                      <AddPhotoAlternateRounded />
                    }
                    <div id="uploadMedia"> <input hidden type="file" name="newProfilePicture"  onChange={this.onChangeHandler} form="my-form" accept="image/*"/></div>
                  </Button>
                </div>
                }
                <div className="usernameBlocky">{username}</div>
              </div>

              </div>

            <div className="rightBlockofInfoCard">
              <div className="pointsAndFriendsCountSection">
                <div className="pointsAndFriendsCount"><div><Button onClick={() => this.setState({redirectToLeaderboard: true})}>10</Button></div> <div>Points</div> </div>
                <div className="pointsAndFriendsCount">
                  <div>
                    <Button 
                      id='friendListBtn' 
                      aria-label="friend-list-button" 
                      aria-controls='friendList'
                      aria-expanded={this.state.openFriendList ? 'true' : undefined}
                      aria-haspopup="true" 
                      onClick={(event) => this.setState({openFriendList: event.currentTarget})}
                      >
                        {friends ? friends.length : "0"}
                    </Button>
                  </div> 
                  <div>Friends</div> 
                </div>
                <div className="pointsAndFriendsCount">
                  <div>
                    <Button 
                    id='connectionListBtn' 
                    aria-label="connection-list-button" 
                    aria-controls='connectionList'
                    aria-expanded={this.state.openConnectionList ? 'true' : undefined}
                    aria-haspopup="true" 
                    onClick={(event) => this.setState({openConnectionList : event.currentTarget})}
                    >
                      {connections ? connections.length : "0"}
                    </Button>
                  </div> 
                  <div>Network</div> 
                </div>
              </div> 
              <div className="addButton"> <button className="edit_button_profile" type="button" onClick={() => { this.setState({ displaying: !this.state.displaying }) }}>Edit Profile</button> </div>
            </div> 

              <Menu
                id="friendList"
                MenuListProps={{
                'aria-labelledby': 'friend-list-button',
                }}
                anchorEl={this.state.openFriendList}
                open={openFriend}
                onClose={() => this.setState({openFriendList: null})}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                PaperProps={{
                  style: {
                    width: '520px',
                    height: '100vh',
                    padding: '0 10px',
                    color: '#302c35',
                  },
                }}
            >
              <h5>
                All Friends
              </h5>
              {friends.map((username, index) => 
              <MenuItem key={index}  className='d-flex justify-content-between'>
                <Link style={{textDecoration: 'none', color : '#302c35'}} className="flex-grow-1" to={"/profile/".concat(username)}>
                  <span>{username}</span>
                </Link>
                <Button style={{padding: "0.25rem", fontSize: "small", backgroundColor: '#cdb5e7', color: 'white', marginRight: "0.5em"}} onClick={() => this.removeFriend(username)}>
                  Unfriend
                </Button>
              </MenuItem>
              )}
                                
                                
            </Menu>

            <Menu
                id="connectionList"
                MenuListProps={{
                'aria-labelledby': 'connection-list-button',
                }}
                anchorEl={this.state.openConnectionList}
                open={openConnection}
                onClose={() => this.setState({openConnectionList: null})}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                PaperProps={{
                  style: {
                    width: '520px',
                    height: '100vh',
                    padding: '0 10px',
                    color: '#302c35',
                  },
                }}
            >
              <h5>
                All Connections
              </h5>
              {connections.map((username, index) => 
                <MenuItem key={index} className='d-flex justify-content-between'>
                <Link style={{textDecoration: 'none', color : '#302c35'}} className="flex-grow-1" to={"/profile/".concat(username)}>
                  <span>{username}</span> 
                </Link>
                  <Button style={{padding: "0.25rem", fontSize: "small", backgroundColor: "#cdb5e7", color: 'white'}} onClick={() => this.disconnect(username)}>
                    Disconnect
                  </Button>
                </MenuItem>
              )}
                                
                                
            </Menu>

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

            <Card.Title className="listed_titles">Hate</Card.Title>
                <Card.Text className="listed_interests">
                    <ColourText textInfo={hate}  field='hate' editMode={!this.state.displaying} listOfItems={interest}/>
                </Card.Text>
          </Card.Body>
        </Card>

        {this.state.displaying ? 


        <Card className="info"> 

          <div className="d-flex justify-content-around mt-3">
              <span>
                <input name="tabNews" type="radio" id="tabNews-1" className="radioProfilePage" onChange={() => this.displayPanel("panel1")} />
                <label for="tabNews-1" className="profileElementsTitle">
                      Recent Posts
                </label>
              </span>
              <span>
                <input name="tabNews" type="radio" id="tabNews-2" className="radioProfilePage" onChange={() => this.displayPanel("panel2")}/>
                <label for="tabNews-2" className="profileElementsTitle">
                  Saved Posts
                </label>
              </span>
              <span>
                <input name="tabNews" type="radio" id="tabNews-3" className="radioProfilePage" onChange={() => this.displayPanel("panel3")}/>
                <label for="tabNews-3" className="profileElementsTitle">
                  Achievements
                </label>
              </span>
          </div>

            <div>
            <Card.Body className="profileElements" id="panel1">
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

            <Card.Body className="profileElements" id="panel2">
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

            <Card.Body className="profileElements" id="panel3">
              <div className="profileElementContainer">
                
              </div>
            </Card.Body>
            </div>
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
      AxiosBaseFile.post("/api/db_update_profile_first_name", {
          first_name: this.state.newFirstName,
          username: localStorage.getItem("username")
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newLastName != lastName) {
      AxiosBaseFile.post("/api/db_update_profile_last_name", {
          last_name: this.state.newLastName,
          username: localStorage.getItem("username")
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newPhoneNumber != phoneNumber) {
      AxiosBaseFile.post("/api/db_update_profile_phone_number", {
          phone_number: this.state.newPhoneNumber,
          username: localStorage.getItem("username")
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.state.newDescription != description) {
      AxiosBaseFile.post("/api/db_update_profile_description", {
          description: this.state.newDescription,
          username: localStorage.getItem("username")
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

      AxiosBaseFile.post("/api/db_update_profile_picture", form_data, {headers: {'Content-Type': 'multipart/form-data'}})
        .catch(error => {
          console.log(error);
        });
    }
  }
}
export default Profile;
