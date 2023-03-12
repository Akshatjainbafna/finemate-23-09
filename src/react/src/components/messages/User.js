import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import createMessage from '../../assets/createMessage.png'
import style from './user.module.css'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput } from '@material-ui/core'
import AxiosBaseFile from '../AxiosBaseFile'
import { Search } from '@material-ui/icons'
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

class User extends Component {
    constructor() {
        super()
        this.state = {
            targetUser: '',
            recentChatUsers: [],
            setSearchData: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ targetUser: e.target.value })
        if (e.target.value.length > 4) {
            AxiosBaseFile.post('/api/db_search_user_profile', { 'username': e.target.value, 'whoSearched': localStorage.getItem('username') })
                .then(response => {
                    if (response.data) {
                        this.setState({ setSearchData: response.data })
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ setSearchData: [] })
                })
        } else {
            this.setState({ setSearchData: [] })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        AxiosBaseFile.post('/api/db_search_user', { 'username': this.state.targetUser })
            .then(res => {
                let responseData = res.data;
                if (responseData == this.state.targetUser) {
                    localStorage.setItem('targetUser', this.state.targetUser);
                } else {
                    window.alert('No user with this Username found. Please Enter the Correct username.')
                }
            })
            .catch(err => console.log(err))
        this.setState({
            targetUser: ''
        })
    }

    openChatBox(e, index) {
        localStorage.setItem('targetName', this.state.recentChatUsers[index].name);
        if (this.state.recentChatUsers[index].username1 == localStorage.getItem('username')) {
            localStorage.setItem('targetUser', this.state.recentChatUsers[index].username2)
        }
        else {
            localStorage.setItem('targetUser', this.state.recentChatUsers[index].username1);
        }
        localStorage.setItem('profilePictureTargetUser', this.state.recentChatUsers[index].profilePicture);
    }
    componentDidMount() {
        AxiosBaseFile.post('/api/db_get_messaged_users', { 'username': localStorage.getItem('username') })
            .then(res => {
                var responseData = res.data;
                for (let i = 0; i < responseData.length; i++) {

                    var time = res.data[i].time.split(':');

                    if (responseData[i].time.includes(',')) {
                        const numberOfDays = responseData[i].time.split(',')
                        responseData[i].time = numberOfDays[0] + ' ago';
                    }
                    else if (time[0] != 0) {
                        responseData[i].time = time[0] + ' hours ago';
                    }
                    else if (time[0] == 0 && time[1] != 0) {
                        responseData[i].time = time[1] + ' mins ago';
                    } else {
                        responseData[i].time = 'Just now';
                    }

                }
                this.setState({ recentChatUsers: responseData });
            })
            .catch(
                (error) => console.log(error)
            )
    }

    render() {
        return (
            <>
                <div className={style.recentUserList}>
                    <form
                        onSubmit={this.handleSubmit}
                        className={style.targetUser}>
                        <OutlinedInput className={style.searchUser}
                            onChange={this.handleChange}
                            placeholder='Search Friends!'
                            type='text' />
                        <IconButton onClick={this.handleSubmit}>
                            <Search />
                        </IconButton>
                    </form>
                    {
                        this.state.setSearchData.length > 0 ? <div className={style.recentChats}>
                            {this.state.setSearchData.map((user, index) =>
                                <div key={index} onClick={() => { localStorage.setItem('targetUser', user.username); localStorage.setItem('targetName', user.name); localStorage.setItem('profilePictureTargetUser', user.profilePicture); this.setState({setSearchData: [], targetUser: ''})}} style={{ cursor: 'pointer' }}>
                                    <List>{(() => {
                                        if (window.innerWidth <= 600) {
                                            return <Link style={{ textDecoration: "none", color: "grey" }} to={"/message"}>
                                                <ListItem>
                                                    {user.profilePicture != 'null' ?
                                                        <ListItemAvatar>
                                                            <img src={require('../../assets/profilePictures/' + user.profilePicture)} alt="Profile" className={style.profilePictureChatHeader} />
                                                        </ListItemAvatar>
                                                        :
                                                        <ListItemAvatar>
                                                            <img src={generator.generateRandomAvatar(user.name)} className={style.profilePictureChatHeader} />
                                                        </ListItemAvatar>
                                                    }

                                                    <ListItemText>
                                                        <div>
                                                            {user.name}
                                                        </div>
                                                        <div>
                                                            <small>
                                                                {user.username}
                                                            </small>
                                                        </div>
                                                    </ListItemText>
                                                </ListItem>
                                            </Link>
                                        } else {
                                            return <ListItem>
                                                {user.profilePicture != 'null'?
                                                    <ListItemAvatar>
                                                        <img src={require('../../assets/profilePictures/' + user.profilePicture)} alt="Profile" className={style.profilePictureChatHeader} />
                                                    </ListItemAvatar>
                                                    :
                                                    <ListItemAvatar>
                                                        <img src={generator.generateRandomAvatar(user.name)} className={style.profilePictureChatHeader} />
                                                    </ListItemAvatar>
                                                }

                                                <ListItemText>
                                                    <div>
                                                        {user.name}
                                                    </div>
                                                    <div>
                                                        <small>
                                                            {user.username}
                                                        </small>
                                                    </div>
                                                </ListItemText>
                                            </ListItem>
                                        }
                                    })()}
                                    </List>
                                </div>
                            )}
                        </div>
                            :
                            <div className={style.recentChats}> {this.state.recentChatUsers.map((user, index) => {
                                if (window.innerWidth <= 600) {
                                    return <div className={style.userChatThumbnail} key={index} onClick={(e) => { this.openChatBox(e, index) }}>
                                        <Link to={"/profile/".concat(user.username2 == localStorage.getItem('username') ? user.username1 : user.username2)} title='Visit Profile' style={{ textDecoration: 'none' }}>
                                            <div className={style.userChatThumbnailImage}>
                                                {user.profilePicture !='null' ?
                                                    <img src={require('../../assets/profilePictures/' + user.profilePicture)} className={style.profilePictureChatHeader} />
                                                    :
                                                    <img src={generator.generateRandomAvatar(user.name)} className={style.profilePictureChatHeader} />
                                                }
                                            </div>
                                        </Link>
                                        <Link to='/message' style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <div className={style.userNameAndRecentMessage}>
                                                <div className={style.userChatThumbnailUsername}>
                                                    {user.name}
                                                </div>
                                                {(!user.user1seen && localStorage.getItem('username') == user.username1) || (!user.user2seen && localStorage.getItem('username') == user.username2)
                                                    ?
                                                    <div style={{ color: 'rgba(0, 0, 0, 0.85)' }} className={style.lastMessage}>
                                                        {user.message}
                                                    </div>
                                                    :
                                                    <div style={{ color: '#919699' }} className={style.lastMessage}>
                                                        {user.message}
                                                    </div>}
                                            </div>
                                            <div className={style.userChatThumbnailTime}>  {user.time} </div>
                                        </Link>
                                    </div>
                                } else {
                                    return <div className={style.userChatThumbnail} key={index} onClick={(e) => { this.openChatBox(e, index) }}>
                                        <Link to={"/profile/".concat(user.username2 == localStorage.getItem('username') ? user.username1 : user.username2)} title='Visit Profile' style={{ textDecoration: 'none' }}>
                                            <div className={style.userChatThumbnailImage}>
                                                {user.profilePicture != 'null' ?
                                                    <img src={require('../../assets/profilePictures/' + user.profilePicture)} className={style.profilePictureChatHeader} />
                                                    :
                                                    <img src={generator.generateRandomAvatar(user.name)} className={style.profilePictureChatHeader} />
                                                }
                                            </div>
                                        </Link>
                                        <div className={style.userNameAndRecentMessage}>
                                            <div className={style.userChatThumbnailUsername}>
                                                {user.name}
                                            </div>
                                            {(!user.user1seen && localStorage.getItem('username') == user.username1) || (!user.user2seen && localStorage.getItem('username') == user.username2)
                                                ?
                                                <div style={{ color: 'rgba(0, 0, 0, 0.85)' }} className={style.lastMessage}>{user.message}</div>
                                                :
                                                <div style={{ color: '#919699' }} className={style.lastMessage}>{user.message}</div>
                                            }
                                        </div>
                                        <div className={style.userChatThumbnailTime}>  {user.time} </div>
                                    </div>
                                }
                            }
                            )}
                            </div>
                    }

                </div>
                {/*List of All recent Chats will come here*/}
            </>
        )
    }


}

export default User