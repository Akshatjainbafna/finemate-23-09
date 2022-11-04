import React, { Component } from 'react'
import axios from 'axios';
import MessageList from './MessageList.js'
import SendMessage from './SendMessage.js'
import style from './Message.module.css'
import profilePic from '../../assets/profilePic.png'
import { Link } from 'react-router-dom';
import { Avatar, ListItemAvatar } from '@material-ui/core';

class Message extends Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            profilePicture: ''
        }
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8103/api/db_get_messages', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser')})
            .then(res => {
                this.setState({
                    messages: res.data
                })
            })
        axios.post('http://127.0.0.1:8103/api/db_get_profile_picture', {'username': localStorage.getItem('targetUser')})
            .then(response => {
              this.setState({profilePicture: response.data.profilePicture});
            })
            .catch(err => console.log(err))
    }

    componentDidUpdate() {
        axios.post('http://127.0.0.1:8103/api/db_get_messages', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser')})
            .then(res => {
                this.setState({
                    messages: res.data
                })
            })
    }

    render() {
        return (
            <>
            {(() => {
                if (localStorage.getItem('targetUser')){
                return <div className={style.chatBox}>
                <div className={style.chatHeader}>
                    <span>
                    <Link to={"/profile/".concat(localStorage.getItem('targetUser'))}>
                        {this.state.profilePicture ?
                            <ListItemAvatar>
                                <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/'+ this.state.profilePicture} className={style.profilePictureChatHeader}/>
                            </ListItemAvatar>
                            :
                            <ListItemAvatar>
                                <Avatar className={style.profilePictureChatHeader}> {localStorage.getItem('targetUser')[0]} </Avatar>
                            </ListItemAvatar>
                        }
                    </Link>
                    </span>
                    <span className={style.targetUser}>
                        {localStorage.getItem('targetUser')}
                    </span>
                </div>
                <MessageList
                    messages={this.state.messages}
                />
                <SendMessage
                    message={this.message}
                />
            </div>
            }else{
                return null
            }
            })()}
            </>
        )
    }

}

export default Message
