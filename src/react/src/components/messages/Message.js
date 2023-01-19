import React, { Component } from 'react'
import MessageList from './MessageList.js'
import SendMessage from './SendMessage.js'
import style from './Message.module.css'
import { Link } from 'react-router-dom';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import AxiosBaseFile from '../AxiosBaseFile.js';

class Message extends Component {
    constructor() {
        super()
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        AxiosBaseFile.post('/api/db_get_messages', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser')})
        .then(res => {
            console.log(res.data)
            this.setState({messages: res.data})
        })
        .catch(err => console.log(err));
        
        this.checkNewMessage = setInterval(() => {
            AxiosBaseFile.post('/api/db_get_messages', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser')})
            .then(res => {
                this.setState({
                    messages: res.data
                })
            })
        }, 2000)
    }


    componentWillUnmount() {
        clearInterval(this.checkNewMessage);
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        return (
            <>
            {(() => {
                if (localStorage.getItem('targetUser')){
                return <div className={style.chatBox}>
                <div className={style.chatHeader}>
                    <span>
                    <Link to={"/profile/".concat(localStorage.getItem('targetUser'))} title='Visit Profile' style={{textDecoration: 'none'}}>
                        {localStorage.getItem('profilePictureTargetUser') ?
                            <ListItemAvatar>
                                <img src={require('../../assets/profilePictures/'+ localStorage.getItem('profilePictureTargetUser'))} className={style.profilePictureChatHeader}/>
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
