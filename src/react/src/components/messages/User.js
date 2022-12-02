import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import createMessage from '../../assets/createMessage.png'
import style from './user.module.css'
import profilePic from '../../assets/profilePic.png'
import Message from './Message'
import { Avatar, OutlinedInput } from '@material-ui/core'
import AxiosBaseFile from '../AxiosBaseFile'

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
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        localStorage.setItem('targetUser', this.state.targetUser);
        AxiosBaseFile.post('/api/db_search_user', {'username': localStorage.getItem('targetUser')})
        .then(res =>{
            let responseData = res.data;
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
        AxiosBaseFile.post('/api/db_get_messaged_users', { 'username' : localStorage.getItem('username')})
            .then( res => {
                var responseData =  res.data;
                for (let i=0; i<responseData.length; i++){

                    var time = res.data[i].time.split(':');

                    if (responseData[i].time.includes(',')){
                        const numberOfDays = responseData[i].time.split(',')
                        responseData[i].time= numberOfDays[0]+ ' ago';
                    }
                    else if (time[0] != 0){
                        responseData[i].time= time[0]+ ' hours ago';
                    }
                    else if (time[0] == 0 && time[1] != 0){
                        responseData[i].time= time[1]+ ' mins ago';
                    }else{
                        responseData[i].time= 'Just now';
                    }

                }
                this.setState({recentChatUsers: responseData});
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
                    <OutlinedInput className={style.searchUser}
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
                        <div className={style.userChatThumbnailImage}>  <Avatar> {user.username2==localStorage.getItem('username') ? user.username1[0] : user.username2[0] } </Avatar></div>
                        <div className={style.userNameAndRecentMessage}> <div className={style.userChatThumbnailUsername}>   {user.username2==localStorage.getItem('username') ? user.username1 : user.username2 }</div> <div className={style.lastMessage}>{user.message}</div>   </div>
                        <div className={style.userChatThumbnailTime}>  {user.time} </div>
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