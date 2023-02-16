import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";
import style from './notifications.module.css';

class NotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top20LatestNotifications: [],
            allThePending: [],
            category: 'Notifications'
        }
    }
    componentDidMount() {
        document.getElementById('notificationTab-1').checked = true;
        AxiosBaseFile.post('/api/db_get_notifications', { 'username': localStorage.getItem('username') })
            .then(res => {
                var responseData = res.data;
                console.log(responseData)
                for (let i = 0; i < responseData.length; i++) {

                    var time = responseData[i].time_of_creation.split(':');

                    if (responseData[i].time_of_creation.includes(',')) {
                        const numberOfDays = responseData[i].time_of_creation.split(',')
                        responseData[i].time_of_creation = numberOfDays[0] + ' ago';
                    }
                    else if (time[0] != 0) {
                        responseData[i].time_of_creation = time[0] + ' hours ago';
                    }
                    else if (time[0] == 0 && time[1] != 0) {
                        responseData[i].time_of_creation = time[1] + ' mins ago';
                    } else {
                        responseData[i].time_of_creation = 'Just now';
                    }
                }
                this.setState({ top20LatestNotifications: responseData }, () => {
                    for (let i = 0; i < responseData.length; i++) {
                        if (responseData[i].is_read == false) {
                            var currentNotification = 'notification' + i;
                            document.getElementById(currentNotification).style.backgroundColor = '#f7f4fc';
                            document.getElementById(currentNotification).style.borderLeft = '2px solid #dfd6e9';
                        }
                        else {
                            break
                        }
                    }
                })
            })
            .catch(err => console.log(err))
    }

    addFriend(username2, index) {
        AxiosBaseFile.post('/api/db_add_friend', { 'username1': localStorage.getItem('username'), 'username2': username2 })
            .then(() => {
                var allThePending = this.state.allThePending;
                allThePending.splice(index);
                this.setState(allThePending)
            })
            .catch(err => console.log(err))
    }

    disconnect(username2, index) {
        AxiosBaseFile.post('/api/db_remove_connection', { 'username1': localStorage.getItem('username'), 'username2': username2 })
            .then(() => {
                var allThePending = this.state.allThePending;
                allThePending.splice(index);
                this.setState(allThePending)
            })
            .catch(err => console.log(err))
    }

    getNotifications(type) {
        this.setState({ category: type })
        if (type === 'Connections') {
            AxiosBaseFile.post('/api/db_get_pending', { 'username': localStorage.getItem('username') })
                .then(res => {
                    this.setState({ allThePending: res.data })
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className={style.notificationContainer}>
                <div className="d-flex justify-content-around">

                    <input name="notificationsCategoryRadioGroup" type="radio" id="notificationTab-1" className={style.inputSearchOption} onChange={() => this.getNotifications('Notifications')} />
                    <label for="notificationTab-1" className={style.labelSearchOption}>Notifications</label>

                    <input name="notificationsCategoryRadioGroup" type="radio" id="notificationTab-2" className={style.inputSearchOption} onChange={() => this.getNotifications('Connections')} />
                    <label for="notificationTab-2" className={style.labelSearchOption}>Connections</label>

                </div>
                <Divider />

                {(() => {
                    if (this.state.category === 'Notifications') {
                        return <div className={style.notificationList}>
                            {this.state.top20LatestNotifications.length > 0 ?
                                this.state.top20LatestNotifications.map((notification, index) => {
                                    if (notification.object_type === 'thread') {
                                        return <div id={'notification' + index} key={index} className={style.notification}>

                                            <Link style={{ textDecoration: 'none', color: 'rgb(140, 140, 140)' }} to={"/discussionDetail/".concat(notification.object_id)}>

                                                <div className="d-flex">
                                                    <Link style={{ textDecoration: 'none', color: 'rgb(140, 140, 140)', display: 'flex', alignItems: 'center' }} to={"/profile/".concat(notification.sender)}>
                                                        <span>
                                                            {notification.profilePicture ?
                                                                <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/' + notification.profilePicture} className={style.profilePictureThumbnail} />
                                                                :
                                                                <Avatar> {notification.sender[0]} </Avatar>
                                                            }
                                                        </span>
                                                        <span style={{ margin: 'auto 0.5em', fontWeight: '600' }}>
                                                            {notification.sender}
                                                        </span>
                                                        <span style={{ fontSize: 'small', fontWeight: '500' }}>
                                                            {notification.activity_type}
                                                        </span>
                                                    </Link>
                                                </div>

                                                <div style={{ textDecoration: 'none', color: 'rgb(120, 120, 120)' }}>
                                                    {notification.title}
                                                </div>

                                                <div style={{ fontSize: 'small', color: 'rgb(180, 180, 180)' }}>
                                                    {notification.time_of_creation}
                                                </div>

                                            </Link>
                                        </div>
                                    }
                                    else {

                                        return <div id={'notification' + index} key={index} className={style.notification}>

                                            <Link style={{ textDecoration: 'none', color: 'rgb(140, 140, 140)' }} to={"/profile/".concat(notification.sender)}>

                                                <div className="d-flex align-items-center">
                                                    <span>
                                                        {notification.profilePicture ?
                                                            <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/' + notification.profilePicture} className={style.profilePictureThumbnail} />
                                                            :
                                                            <Avatar> {notification.sender[0]} </Avatar>
                                                        }
                                                    </span>
                                                    <span style={{ margin: 'auto 0.5em', fontWeight: '600' }}>
                                                        {notification.sender}
                                                    </span>
                                                    <span style={{ fontSize: 'small', fontWeight: '500' }}>
                                                        {notification.activity_type}
                                                    </span>
                                                </div>

                                                <div style={{ fontSize: 'small', color: 'rgb(180, 180, 180)' }}>
                                                    {notification.time_of_creation}
                                                </div>

                                            </Link>
                                        </div>
                                    }
                                }
                                )
                                :
                                <div className="d-flex align-items-center justify-content-center pt-5">
                                    <div>No Notifications Recieved Yet !</div>
                                </div>
                            }
                        </div>
                    }
                    else {
                        return <div>
                            {this.state.allThePending.length > 0 ?
                                <List>
                                    {this.state.allThePending.map((user, index) =>
                                        <div key={index} style={{ borderBottom: '1px solid rgb(222, 222, 222)' }}>
                                            <ListItem>
                                                <Link style={{ textDecoration: 'none', color: 'rgb(140, 140, 140)' }} className="d-flex" to={"/profile/".concat(user.username)}>
                                                    {user.profilePicture ?
                                                        <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/' + user.profilePicture} className={style.profilePictureThumbnail} />
                                                        :
                                                        <Avatar> {user.username[0]} </Avatar>
                                                    }
                                                    <ListItemText style={{ marginLeft: '2vw' }}>
                                                        {user.username}
                                                    </ListItemText>
                                                </Link>
                                                <ListItemSecondaryAction>
                                                    <Button style={{ padding: "0.25rem", fontSize: "small", backgroundColor: 'var(--purpleMain)', color: 'white', marginRight: "0.5em" }} onClick={() => this.addFriend(user.username, index)}>
                                                        Add Friend
                                                    </Button>
                                                    <Button style={{ padding: "0.25rem", fontSize: "small", backgroundColor: "var(--purpleMain)", color: 'white' }} onClick={() => this.disconnect(user.username, index)}>
                                                        Disconnect
                                                    </Button>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </div>
                                    )}
                                </List>
                                :
                                <div className="d-flex align-items-center justify-content-center pt-5">
                                    <div className="mt-3">No Connections to Show</div>
                                </div>
                            }
                        </div>
                    }
                })()}
            </div>
        );
    }
}

export default NotificationComponent
