import React, { Component } from 'react'
import './MessageList.css'
import profilePic from '../../assets/profilePic.png'
import { IconButton, Menu, MenuItem, Snackbar } from '@material-ui/core';
import { HiClipboardCopy } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import AxiosBaseFile from '../AxiosBaseFile';
import { MoreHoriz } from '@material-ui/icons';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageOptions: null,
            currentMessage: null,
            snackbarShow: false,
            snackbarMessage: null,

        }
        this.chatThreadRef = React.createRef();
        this.handleClose = this.handleClose.bind(this)
    }
    handleClose() {
        this.setState({ messageOptions: null })
    }
    deleteMessage(id) {
        AxiosBaseFile.post('/api/db_delete_message', { id: id })
            .then(res => {
                this.setState({ snackbarShow: true, snackbarMessage: 'Message Deleted Successfully!' })
            })
            .catch(err => {
                console.log(err);
                this.setState({ snackbarShow: true, snackbarMessage: 'Message is older than 10 Mins!' })
            })
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.props.messages > prevProps.messages) {
            const chatThreadRef = this.chatThreadRef.current;
            return chatThreadRef.scrollHeight - chatThreadRef.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const chatThreadRef = this.chatThreadRef.current;
            chatThreadRef.scrollTop = chatThreadRef.scrollHeight;
        }
    }
    render() {
        return (
            <div className='message-box'>
                <ul className='message-list' ref={this.chatThreadRef}>
                    {this.props.messages.map((message, index) => {
                        if (message.username1 === localStorage.getItem('username')) {
                            return (
                                <div key={index} className='messageRow'>
                                    <li style={{ listStyleType: 'none', cursor: 'pointer' }}>
                                        <div className='time mr-2 mt-1 text-right'>
                                            {message.time}
                                        </div>
                                        <div className='d-flex flex-row justify-content-end align-items-center'>
                                            <div className='messageMenuContainer'>
                                                <IconButton onClick={(e) => { this.setState({ messageOptions: e.currentTarget, currentMessage: message }) }}>
                                                    <MoreHoriz />
                                                </IconButton>
                                            </div>
                                            <div className='message1 mr-2 text-right'>{message.message.split('\n').map(function (item, index) {
                                                return (
                                                    <span key={index}>
                                                        {item}
                                                        <br />
                                                    </span>
                                                )
                                            })}</div>
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
                                        <MenuItem onClick={() => { this.handleClose(); this.deleteMessage(this.state.currentMessage._id.$oid) }}><MdDelete size={20} style={{ marginRight: '1em' }} />Delete Message</MenuItem>
                                        <MenuItem onClick={() => {
                                            this.handleClose();
                                            navigator.clipboard.writeText(this.state.currentMessage.message);
                                            this.setState({ snackbarShow: true, snackbarMessage: 'Message Copied Successfully!' })
                                        }}>
                                            <HiClipboardCopy size={20} style={{ marginRight: '1em' }} />Copy Message
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
                                        onClose={() => this.setState({ snackbarShow: false })}
                                    >
                                    </Snackbar>

                                </div>
                            )
                        } else {
                            return (
                                <li key={index} style={{ listStyleType: 'none' }}>
                                    <div className="d-flex flex-row justify-content-start">
                                        <div className="time ml-2 mt-1 text-left">{message.time}</div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-start">
                                        <div className='message2 ml-2 text-left'>{message.message.split('\n').map(function (item, index) {
                                            return (
                                                <span key={index}>
                                                    {item}
                                                    <br />
                                                </span>
                                            )
                                        })}</div>
                                    </div>
                                </li>
                            )
                        }

                    })}
                </ul>
                {this.props.messages.length > 1 ? this.props.messages[this.props.messages.length - 1].user2seen == true && this.props.messages[this.props.messages.length - 1].username1 == localStorage.getItem('username') ?
                    <div className='seenMarker'>Seen</div>
                    :
                    <div className='seenMarker'>.</div>
                    :
                    null
                }
            </div>
        )
    }
}

export default MessageList