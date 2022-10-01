import React, { Component } from 'react'
import axios from 'axios';
import MessageList from './MessageList.js'
import SendMessage from './SendMessage.js'
import style from './Message.module.css'
import profilePic from '../../assets/profilePic.png'

class Message extends Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8103/api/db_get_messages', {'username1': localStorage.getItem('username'), 'username2': localStorage.getItem('targetUser')})
            .then(res => {
                this.setState({
                    messages: res.data
                })
            })
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
                <div className={style.chatHeader}><img className={style.profilePictureChatHeader} src={profilePic}/><span className={style.targetUser}>{localStorage.getItem('targetUser')}</span></div>
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