import React, { Component } from 'react'
import './MessageList.css'
import profilePic from '../../assets/profilePic.png'
import { Menu, MenuItem, Snackbar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { BiCopy } from 'react-icons/bi';
import { FaCopy } from 'react-icons/fa';
import { HiClipboardCopy } from 'react-icons/hi';
import { MdDelete, MdOutlineDeleteOutline } from 'react-icons/md';
import AxiosBaseFile from '../AxiosBaseFile';

class MessageList extends Component {
    constructor(props) {  
        super(props);  
        this.state ={
            messageOptions: null,
            currentMessage: null,
            snackbarShow: false,
            snackbarMessage: null,

        }
        this.chatThreadRef = React.createRef();  
        this.handleClose = this.handleClose.bind(this)
      }  
      handleClose(){
        this.setState({messageOptions: null})
      }
      deleteMessage(id){
        AxiosBaseFile.post('/api/db_delete_message', {id: id})
        .then(res => {
            this.setState({snackbarShow: true, snackbarMessage: 'Message Deleted Successfully!'})
        })
        .catch(err => {
            console.log(err);
            this.setState({snackbarShow: true, snackbarMessage: 'Message is older than 10 Mins!'})
        })
      }
    getSnapshotBeforeUpdate(prevProps, prevState){
        if (this.props.messages > prevProps.messages) {
            const chatThreadRef = this.chatThreadRef.current;
            return chatThreadRef.scrollHeight - chatThreadRef.scrollTop;
          }
          return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
          const chatThreadRef = this.chatThreadRef.current;
          chatThreadRef.scrollTop = chatThreadRef.scrollHeight - snapshot;
        }
      }
    render() {
        return (
            <div className= 'message-box'>
            <ul className='message-list' ref={this.chatThreadRef}>
                {this.props.messages.map((message, index) => {
                    if (message.username1 === localStorage.getItem('username')){
                        return (
                            <div key={index}>
                                <li style={{listStyleType: 'none', cursor: 'pointer'}} onClick={(e) => {this.setState({messageOptions: e.currentTarget, currentMessage: message})}}>
                                <div className='d-flex flex-row justify-content-end' >
                                    <div className='time mr-2 mt-1 text-right'>
                                        {message.time}
                                        </div>
                                    <div className="user1 mt-1 mb-1 mr-3 text-right">{message.username1}</div>
                                </div>
                                <div className='d-flex flex-row justify-content-end'>
                                    <div className='message1 mr-2 text-right'>{message.message.split('  ').map(function(item) {
                                    return (
                                        <span>
                                            {item}
                                            &nbsp;
                                        </span>
                                        )
                                    })}</div>
                                    <img className='profilePic1 mr-3 'src={profilePic}/>
                                </div>
                            </li>

                            <Menu
                                id="basic-menu"
                                anchorEl={this.state.messageOptions}
                                open={Boolean(this.state.messageOptions)}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  PaperProps={{
                                    style: {
                                        boxShadow: '0px 0px 5px 1px rgba(180, 180, 180, 0.15)',
                                        borderRadius: '5px'
                                    }
                                }}
                              >
                                <MenuItem onClick={() => {this.handleClose(); this.deleteMessage(this.state.currentMessage._id.$oid)}}><MdDelete size={20} style={{marginRight: '1em'}}/>Delete Message</MenuItem>
                                <MenuItem onClick={() => {
                                    this.handleClose();
                                    navigator.clipboard.writeText(this.state.currentMessage.message);
                                    this.setState({snackbarShow: true, snackbarMessage: 'Message Copied Successfully!'})
                                    }}>
                                    <HiClipboardCopy size={20} style={{marginRight: '1em'}}/>Copy Message
                                </MenuItem>

                            </Menu>
                            
                            <Snackbar 
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                  }}
                                open={this.state.snackbarShow} 
                                autoHideDuration={4000} 
                                message={this.state.snackbarMessage} 
                                onClose={() => this.setState({snackbarShow: false})}
                            >
                            </Snackbar> 

                            </div>
                    )
                    } else {
                        return (
                            <li key={index} style={{listStyleType: 'none'}}>
                                <div className="d-flex flex-row justify-content-start">
                                    <div className="user2 mt-1 mb-1 text-left">{message.username1}</div>
                                    <div className="time ml-2 mt-1 text-left">{message.time}</div>
                                </div>
                                <div className="d-flex flex-row justify-content-start">
                                    <img className='profilePic2'src={profilePic}/>
                                    <div className='message2 ml-2 text-left'>{message.message.split('  ').map(function(item) {
                                    return (
                                        <span>
                                            {item}
                                            &nbsp;
                                        </span>
                                        )
                                    })}</div>
                                </div>
                            </li>
                        )
                    }
                    
                })}
            </ul>
            {this.props.messages.length > 1 ? this.props.messages[this.props.messages.length - 1].user2seen == true &&  this.props.messages[this.props.messages.length-1].username1 == localStorage.getItem('username')? 
            <div className='seenMarker'>Seen</div>
            :
            null
            :
            null
            }
            </div>
        )
    }
}

export default MessageList