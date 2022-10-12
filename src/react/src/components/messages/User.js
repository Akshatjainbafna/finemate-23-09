import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import createMessage from '../../assets/createMessage.png'
import style from './user.module.css'
import profilePic from '../../assets/profilePic.png'
import Message from './Message'
import { Avatar } from '@material-ui/core'
import { deepOrange, deepPurple } from '@material-ui/core/colors'

class User extends Component {
    constructor() {
        super()
        this.state = {
            targetUser: '',
            recentChatUsers: [],
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            targetUser: e.target.value
        }, () => console.log(this.state.targetUser))
    }

    handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem('targetUser', this.state.targetUser);
        axios.post('http://127.0.0.1:8103/api/db_search_user', {'username': localStorage.getItem('targetUser')})
        .then(res =>{
            let responseData = res.data;
            console.log(responseData, localStorage.getItem('targetUser'));
            if (responseData == localStorage.getItem('targetUser')){
                console.log(localStorage.getItem('targetUser'))
            }else{
                window.alert('No user with this Username found. Please Enter the Correct username.')
            }
        })
        .catch(err => console.log(err))
        this.setState({
            targetUser: '',
            submitted: true
        })
    }

    openChatBox(e, index){
        console.log(this.state.recentChatUsers[index].username1, this.state.recentChatUsers[index].username2);

        if (this.state.recentChatUsers[index].username1 == localStorage.getItem('username')){
            localStorage.setItem('targetUser', this.state.recentChatUsers[index].username2);
        }
        else{
            localStorage.setItem('targetUser', this.state.recentChatUsers[index].username1);

        }

        this.setState({
            submitted: true
        })
    }
    componentDidMount(){
        axios.post('http://127.0.0.1:8103/api/db_get_messaged_users', { 'username' : localStorage.getItem('username')})
            .then( res => {
                console.log(res.data);
                this.setState({recentChatUsers: res.data});
            })
            .catch(
                (error) => console.log(error)
            )
    }

    render() {
        if (window.innerWidth <= 600 && this.state.submitted==true){
            return <Redirect to="/message" />
        }
        return (
            <>
            <div className={style.recentUserList}>
                <form
                    onSubmit={this.handleSubmit}
                    className={style.targetUser}>
                    <input className={style.searchUser}
                        onChange={this.handleChange}
                        value={this.state.targetUser}
                        placeholder='Search User...'
                        type='text'/>
                    <button className={style.writeButton} onClick={this.handleSubmit}>
                         <img
                             src={createMessage}
                             alt={createMessage}/>
                         </button>
                </form>

                <div className={style.recentChats}> {this.state.recentChatUsers.map((user, index) => 
                    <div className={style.userChatThumbnail} key={index} onClick={(e)=>{this.openChatBox(e, index)}}>
                        <div className={style.userChatThumbnailImage}>  <Avatar sx={{ bgcolor: deepOrange[200] }}> {user.username2==localStorage.getItem('username') ? user.username1[0] : user.username2[0] } </Avatar></div>
                        <div className={style.userNameAndRecentMessage}> <div className={style.userChatThumbnailUsername}>   {user.username2==localStorage.getItem('username') ? user.username1 : user.username2 }</div> <div className={style.lastMessage}>{user.message.slice(0, 25)+"..."}</div>   </div>
                        <div className={style.userChatThumbnailTime}>    03:44</div>
                    </div>
                )}  
                </div>
                
            </div>
            {/*List of All recent Chats will come here*/}
            </>
        )
    }


}

export default User