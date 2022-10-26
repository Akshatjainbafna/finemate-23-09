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
import axios from "axios";
import { Add } from "@material-ui/icons";
import { Button, Input, Menu, MenuItem, TextField } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import {BsChatSquareTextFill} from 'react-icons/bs'
import { IconContext } from "react-icons";
import ColourTextUser from "./colourTextUserProfile.component.js";


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      recentPosts: [],
      openConnectionList: null,
      redirectDashboard: false
    };
  }

  addConnection(usernameFromTheConnectionList){
    if (usernameFromTheConnectionList){
      var username2 =  usernameFromTheConnectionList;
    }else{
      var username2 =  this.state.username;
    }
    Axios.post('http://127.0.0.1:8103/api/db_add_connection', {'username1' : localStorage.getItem('username'), 'username2': username2})
    .then(res => {
      window.location.reload(true);
    })
    .catch(err => console.log(err))
  }

  removeConnection(connections, friends){
    if (connections.includes(localStorage.getItem('username'))){
      Axios.post('http://127.0.0.1:8103/api/db_remove_connection', {'username1' : localStorage.getItem('username'), 'username2': this.state.username})
      .then(res => {
        window.location.reload(true);
    })
    .catch(err => console.log(err))
    }
    if (friends.includes(localStorage.getItem('username'))){
      Axios.post('http://127.0.0.1:8103/api/db_remove_friend', {'username1' : localStorage.getItem('username'), 'username2': this.state.username})
      .then(res => {
        window.location.reload(true);
    })
    .catch(err => console.log(err))
    }
  }

  componentDidMount(){
    Axios.post('http://127.0.0.1:8103/api/db_get_public_post_of_user', {username: this.state.username})
    .then(res => {
        console.log(res.data)
        this.setState({recentPosts : res.data})
    })
    .catch(err => console.log(err))
  }
  
  render() {
    if (this.state.redirectDashboard){
      return <Redirect to="/leaderboard" />
    }
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
    const { connected } = this.props;
    const { profilePicture } = this.props;

    return (

    <div className="main">

            {/* card with education info */}
        <Card className="edu">
            <div className="headerOfBlockInfoCard">
                <div className="profileDisplayData">

                    <div className="leftBlockofInfoCard">
                        <div className="profile_pic_slot">
                            <div>{profilePicture ? 
                                  <div><img src={require('../../assets/profilePictures/'+ profilePicture)} className="elementPic" /> </div> 
                                  :
                                  <div><img src={profilePic} className="elementPic" /> </div>
                                }</div>
                            <div className="usernameBlocky">{username}</div>
                        </div>
                    </div>

                    <div className="rightBlockofInfoCard">
                        <div className="pointsAndFriendsCountSection">
                            <div className="pointsAndFriendsCount"><div><Button onClick={() => this.setState({redirectDashboard: true})}>10</Button></div> <div>Points</div> </div>
                            <div className="pointsAndFriendsCount"><div><Button style={{pointerEvents: 'none'}}>{friends ? friends.length : "0"}</Button></div> <div>Friends</div> </div>
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

                        <div className="addButton">
                            {connected ? 
                            <div>
                                <button className="connect_button" type="button" onClick={() => this.removeConnection(connections, friends)}> Disconnect </button>
                                {(() => {
                                if (window.innerWidth <= 600) {
                                    return (
                                        <Link to="/message" style={{textDecoration: " none "}} onClick={() => {
                                            localStorage.setItem('targetUser', username);
                                        }}> <IconContext.Provider value={{size: "3.8vh", color: "#7036b3"}}> <BsChatSquareTextFill /> </IconContext.Provider>
                                        </Link>
                                    )
                                    } else {
                                    return (
                                        <Link to="/messageUser" style={{textDecoration: " none "}} onClick={() => {
                                            localStorage.setItem('targetUser', username);
                                        }}> <IconContext.Provider value={{size: "3.8vh", color: "#7036b3"}}> <BsChatSquareTextFill /> </IconContext.Provider>
                                        </Link>
                                    )
                                    }
                                    })()}

                            </div>
                            :
                                <button className="addFriend_button" type="button" onClick={() => this.addConnection()}> Connect </button>
                            }
                        </div>
                    </div>
                </div>
            
                <Menu
                id="connectionList"
                MenuListProps={{
                'aria-labelledby': 'connection-list-button',
                }}
                anchorEl={this.state.openConnectionList}
                open={Boolean(this.state.openConnectionList)}
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
                {username == localStorage.getItem('username') ? '' : 
                  <Button style={{padding: "0.25rem", fontSize: "small", backgroundColor: "#cdb5e7", color: 'white'}} onClick={() => this.addConnection(username)}>
                    Connect
                  </Button>
                }
                </MenuItem>
              )}
                                
                                
            </Menu>


                <div className="descriptionOf"> {description} </div>
            </div>


            <Card.Body>
            
                <Card.Title className="listed_titles">Education</Card.Title>
                <Card.Text className="listed_educations">
                    <ColourTextUser textInfo={educations} />
                </Card.Text>

                <Card.Title className="listed_titles">Skills</Card.Title>
                <Card.Text className="listed_skills">
                    <ColourTextUser textInfo={skills} />
                </Card.Text>

                <Card.Title className="listed_titles">Completed course</Card.Title>
                <Card.Text className="listed_courses">
                    <ColourTextUser textInfo={completedCourses} />
                </Card.Text>

                <Card.Title className="listed_titles">Languages</Card.Title>
                <Card.Text className="listed_languages">
                    <ColourTextUser textInfo={languages} />
                </Card.Text>

                <Card.Title className="listed_titles">Interests</Card.Title>
                <Card.Text className="listed_interests">
                    <ColourTextUser textInfo={interests} />
                </Card.Text>

                <Card.Title className="listed_titles">Hate</Card.Title>
                <Card.Text className="listed_interests">
                    <ColourTextUser textInfo={hate} />
                </Card.Text>
          </Card.Body>

        </Card>


        <Card className="info"> 
            <Card.Body className="profileElements">
              <Card.Title className="profileElementsTitle">
                Achievements
              </Card.Title>
              <div className="profileElementContainer">
                
              </div>
            </Card.Body>
            <Card.Body className="profileElementsUserPosts">
              <Card.Title className="profileElementsTitle">
                Recent Posts
              </Card.Title>
              <div className="profileElementContainerUserPosts">
                
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
        </Card>
    </div>
    );
  }
}
export default UserProfile;
