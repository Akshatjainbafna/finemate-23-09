import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";
import style from './notifications.module.css';

class NotificationComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            allThePending: []
        }
    }
    componentDidMount(){
        AxiosBaseFile.post('/api/db_get_pending', {'username' : localStorage.getItem('username')})
        .then(res => {
            this.setState({allThePending: res.data})
        })
        .catch(err => console.log(err))
    }

    addFriend(username2, index){
        AxiosBaseFile.post('/api/db_add_friend', {'username1' : localStorage.getItem('username'), 'username2' : username2})
        .then(() => {
            var allThePending = this.state.allThePending;
            allThePending.splice(index);
            this.setState(allThePending)
        })
        .catch(err => console.log(err))
    }

    disconnect(username2, index){
        AxiosBaseFile.post('/api/db_remove_connection', {'username1' : localStorage.getItem('username'), 'username2' : username2})
        .then(() => {
            var allThePending = this.state.allThePending;
            allThePending.splice(index);
            this.setState(allThePending)
        })
        .catch(err => console.log(err))
    }


    render(){
        return(
            <div className={style.notificationContainer}>
                {this.state.allThePending.length > 0 ? 
                this.state.allThePending.map((user, index) => 
                <div key={index}>
                    <List>
                        <ListItem>
                            <Link style={{textDecoration: 'none', color : '#302c35'}} className="d-flex" to={"/profile/".concat(user.username)}>
                                {user.profilePicture ?
                                    <ListItemAvatar>
                                        <img src={require('../../assets/profilePictures/'+ user.profilePicture)} className={style.profilePictureThumbnail}/>
                                    </ListItemAvatar>
                                    :
                                    <ListItemAvatar>
                                        <Avatar> {user.username[0]} </Avatar>
                                    </ListItemAvatar>
                                    }
                            <ListItemText>
                                {user.username}
                            </ListItemText>
                            </Link>
                            <ListItemSecondaryAction>
                                <Button style={{padding: "0.25rem", fontSize: "small", backgroundColor: '#cdb5e7', color: 'white', marginRight: "0.5em"}} onClick={() => this.addFriend(user.username, index)}>
                                    Add Friend
                                </Button>
                                <Button style={{padding: "0.25rem", fontSize: "small", backgroundColor: "#cdb5e7", color: 'white'}} onClick={() => this.disconnect(user.username, index)}>
                                    Disconnect
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>)
                :
                <div className="d-flex align-items-center justify-content-center p-4">
                    <div>No Connections to Show</div>
                </div>
                }
            </div>
        );
    }
}

export default NotificationComponent
