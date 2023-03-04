import React, { Component, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import "./profile.css";
import profilePic from "../../assets/profilePic.png";
import { Button, Divider, Menu, MenuItem } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { BsChatSquareTextFill } from 'react-icons/bs'
import { IconContext } from "react-icons";
import ColourTextUser from "./colourTextUserProfile.component.js";
import AxiosBaseFile from "../AxiosBaseFile";
import ReactQuill from "react-quill";


function Fact(props) {
  let quillRef = useRef();
  let modules = {
    syntax: true,
    toolbar: false
  }

  useEffect(() => {
    let data = JSON.parse(props.fact);
    quillRef.current.getEditor().setContents(data)
  }, [props.fact]);

  return (
    <ReactQuill ref={quillRef} theme='bubble' modules={modules} readOnly />
  )

}

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      recentPosts: [],
      openConnectionList: null,
      redirectDashboard: false,
      connected: this.props.connected
    };
  }

  addConnection(usernameFromTheConnectionList) {
    if (usernameFromTheConnectionList) {
      var username2 = usernameFromTheConnectionList;
    } else {
      var username2 = this.state.username;
    }
    AxiosBaseFile.post('/api/db_add_connection', { 'username1': localStorage.getItem('username'), 'username2': username2 })
      .then(res => this.setState({ connected: !this.state.connected }))
      .catch(err => console.log(err))
  }

  removeConnection(connections, friends) {
    if (connections.includes(localStorage.getItem('username'))) {
      AxiosBaseFile.post('/api/db_remove_connection', { 'username1': localStorage.getItem('username'), 'username2': this.state.username })
        .then(res => this.setState({ connected: !this.state.connected }))
        .catch(err => console.log(err))
    }
    if (friends.includes(localStorage.getItem('username'))) {
      AxiosBaseFile.post('/api/db_remove_friend', { 'username1': localStorage.getItem('username'), 'username2': this.state.username })
        .then(res => this.setState({ connected: !this.state.connected }))
        .then(res => {
        })
        .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    document.getElementById('tabNews-1').checked = true;
    AxiosBaseFile.post('/api/db_get_public_post_of_user', { username: this.state.username })
      .then(res => {
        this.setState({ recentPosts: res.data })
      })
      .catch(err => console.log(err))
  }
  displayPanel(panel) {
    for (let x = 1; x <= 2; x++) {
      var panelId = 'panel' + String(x);
      if (panelId == panel) {
        document.getElementById(panelId).style.display = "block";
      }
      else {
        document.getElementById(panelId).style.display = "none";
      }
    }
  }
  render() {
    if (this.state.redirectDashboard) {
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
                    <div><img alt='profile' src={require('../../assets/profilePictures/' + profilePicture)} className="elementPic" /> </div>
                    :
                    <div><img alt='profile' src={profilePic} className="elementPic" /> </div>
                  }</div>
                  <div className="usernameBlocky">{username}</div>
                </div>
              </div>

              <div className="rightBlockofInfoCard">
                <div className="pointsAndFriendsCountSection">
                  <div className="pointsAndFriendsCount"><div><Button onClick={() => this.setState({ redirectDashboard: true })}>10</Button></div> <div>Points</div> </div>
                  <div className="pointsAndFriendsCount"><div><Button style={{ pointerEvents: 'none' }}>{friends ? friends.length : "0"}</Button></div> <div>Friends</div> </div>
                  <div className="pointsAndFriendsCount">
                    <div>
                      <Button
                        id='connectionListBtn'
                        aria-label="connection-list-button"
                        aria-controls='connectionList'
                        aria-expanded={this.state.openConnectionList ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => this.setState({ openConnectionList: event.currentTarget })}
                      >
                        {connections ? connections.length : "0"}
                      </Button>
                    </div>
                    <div>Network</div>
                  </div>
                </div>


                <div className="d-flex justify-content-center mt-2">
                  {this.state.connected ?
                    <div>
                      <button className="connect_button brightness-low-btn" type="button" onClick={() => this.removeConnection(connections, friends)}> Disconnect </button>
                      {(() => {
                        if (window.innerWidth <= 600) {
                          return (
                            <Link to="/message" style={{ textDecoration: " none " }} onClick={() => {
                              localStorage.setItem('targetUser', username);
                            }}>
                              <button className="message_button brightness-low-btn">
                                Message
                              </button>
                            </Link>
                          )
                        } else {
                          return (
                            <Link to="/messageUser" style={{ textDecoration: " none " }} onClick={() => {
                              localStorage.setItem('targetUser', username);
                            }}>
                              <button className="message_button brightness-low-btn">
                                Message
                              </button>
                            </Link>
                          )
                        }
                      })()}

                    </div>
                    :
                    <button className="addFriend_button brightness-low-btn" type="button" onClick={() => this.addConnection()}>Connect</button>
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
              onClose={() => this.setState({ openConnectionList: null })}
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
                  <Link style={{ textDecoration: 'none', color: '#302c35' }} className="flex-grow-1" to={"/profile/".concat(username)}>
                    <span>{username}</span>
                  </Link>
                  {username == localStorage.getItem('username') ? '' :
                    <Button style={{ padding: "0.25rem", fontSize: "small", backgroundColor: "var(--purpleDark)", color: 'white' }} onClick={() => this.addConnection(username)}>
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


          <div className="d-flex justify-content-around mt-3" style={{ marginTop: '1vh' }}>
            <span>
              <input name="tabNews" type="radio" id="tabNews-1" className="radioProfilePage" onChange={() => this.displayPanel("panel1")} />
              <label htmlFor="tabNews-1" className="profileElementsTitle">
                Recent Posts
              </label>
            </span>
            <span>
              <input name="tabNews" type="radio" id="tabNews-2" className="radioProfilePage" onChange={() => this.displayPanel("panel2")} />
              <label htmlFor="tabNews-2" className="profileElementsTitle">
                Achievements
              </label>
            </span>
          </div>
          <Divider />
          <div>
            <Card.Body className="profileElements" id="panel1">
              <div className="profileElementContainer">
                {this.state.recentPosts.map((post, index) =>
                  <Link style={{ textDecoration: 'none' }} to={'/post/'.concat(post._id.$oid)} title='Post' key={index}>
                    <div className="postThumbnail">
                      <div className="subTopicThumbnail">{post.subtopic}</div>
                      <div className="factThumbnailContainer">
                        <img alt='post thumbnail' src={require('../../assets/postBackgroundImages/' + post.background)} />
                        <div className="factThumbnail" name="factName">
                          <Fact fact={post.fact} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </Card.Body>

            <Card.Body className="profileElements" id="panel2">
              <div className="profileElementContainer">

              </div>
            </Card.Body>
          </div>

        </Card>
      </div>
    );
  }
}
export default UserProfile;
