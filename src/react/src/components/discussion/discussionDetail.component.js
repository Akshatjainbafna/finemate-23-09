import React, { Component } from 'react'
import './discussionDetail.css'
import { Avatar, Button, IconButton, Menu, MenuItem, Snackbar, TextField } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import AxiosBaseFile from '../AxiosBaseFile';
import { Delete, InfoOutlined, MoreHoriz, Send } from '@material-ui/icons';
import { MdDelete } from 'react-icons/md';
import { HiClipboardCopy, HiSave } from 'react-icons/hi';
import { RiAlertFill } from 'react-icons/ri';

class DiscussionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replies: [{ 'bodies': '', 'timestamps': '', 'users': '' }],
            title: "",
            handle: this.props.handle,
            body: "",
            threadDeleted: false,
            community: '',
            threadMenu: false,
            snackbarMessage: '',
            snackbarShow: false,
            name: '',
            profilePicture: '',
            descriptionVisible: false,
            messageOptions: null
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.viewDescription = this.viewDescription.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.saveThread = this.saveThread.bind(this);
    }
    componentDidMount() {
        var resReply = {};
        var reply = [];
        AxiosBaseFile.post('/api/db_get_thread_id', { '_id': this.state.handle })
            .then(response => {
                AxiosBaseFile.post('/api/db_get_profile_picture', { username: response.data.users[0] })
                    .then(res => {
                        this.setState({ profilePicture: res.data.profilePicture, name: res.data.name })
                    })
                    .catch(err => {
                        this.setState({ profilePicture: '' })
                    })

                for (var i = 0; i < response.data.bodies.length; i++) {
                    resReply['bodies'] = response.data.bodies[i];
                    resReply['timestamps'] = response.data.timestamps[i];
                    resReply['users'] = response.data.users[i];
                    reply[i] = JSON.parse(JSON.stringify(resReply));
                }
                this.setState({ replies: reply, title: response.data.title, community: response.data.community })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    onChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        this.setState(data);
    }
    handleClose() {
        this.setState({ messageOptions: null })
    }
    viewDescription() {
        this.setState({ descriptionVisible: !this.state.descriptionVisible }, () => {
            if (this.state.descriptionVisible) {
                document.getElementById('descriptionOfDiscussion').style.whiteSpace = 'normal';
            } else {
                document.getElementById('descriptionOfDiscussion').style.whiteSpace = 'nowrap';
            }
        })
    }
    onSubmitHandler() {
        if (this.state.body) {
            AxiosBaseFile.put('/api/db_put_thread_reply', { 'username': localStorage.getItem('username'), '_id': this.state.handle, 'body': this.state.body })
                .then(res => {
                    let resReply = {};
                    resReply['bodies'] = this.state.body;
                    resReply['timestamps'] = 'Just Now';
                    resReply['users'] = localStorage.getItem('username');
                    let newReply = JSON.parse(JSON.stringify(resReply));
                    console.log(newReply)

                    this.setState({ replies: [...this.state.replies, newReply], body: "" }, () => console.log(this.state.replies))
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    deletePastReply() {
        var indexToBeDeleted = this.state.currentIndex + 1;
        AxiosBaseFile.post('/api/db_delete_reply', { 'username': localStorage.getItem('username'), '_id': this.state.handle, 'index': indexToBeDeleted })
            .then(res => {
                var replies = this.state.replies;
                replies.splice(indexToBeDeleted, 1)
                this.setState({ snackbarMessage: 'Reply deleted Successfully!', snackbarShow: true })
                this.setState(replies)
            })
            .catch(err => console.log(err))
    }
    deleteThread() {
        AxiosBaseFile.post('/api/db_delete_thread', { '_id': this.state.handle })
            .then(res => {
                this.setState({ threadDeleted: true })
            })
            .catch(err => this.setState({ snackbarMessage: 'Couldnot delete the discussion!', snackbarShow: true }))
    }
    saveThread(){
        this.setState({threadMenu: false, snackbarMessage: 'Discussion saved successfully!', snackbarShow: true })
    }
    render() {
        if (this.state.threadDeleted) {
            const LastPageVisited = '/discussionList/' + this.state.community;
            return <Redirect to={LastPageVisited} />;
        }
        return (
            <div className='discussion-detail-container'>
                <div className='discussion-header-content p-2'>
                    <h5 style={{ margin: "2%", padding: "2%", color: 'var(--darkThemeFontPrimary)', backgroundColor: 'var(--lightThemeFontSecondary)', borderRadius: '10px' }}>
                        {this.state.title}
                    </h5>

                    <div style={{ margin: "2%" }}>
                        {this.state.replies[0].bodies != 'NO DESCRIPTION' ?
                            <div id='descriptionOfDiscussion' className='descriptionOfDiscussion' onClick={this.viewDescription}>
                                <InfoOutlined style={{ color: '#717175', fontSize: '1em', marginRight: '5px', marginBottom: '3px' }} />
                                Description:  {this.state.replies[0].bodies}
                            </div>
                            :
                            null
                        }

                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center flex-grow-1 mt-3'>
                                <div>{this.state.profilePicture ? <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/' + this.state.profilePicture} className='smallSizeProfilePicture' /> : <Avatar className='smallSizeProfilePicture'>{this.state.name.charAt(0)}</Avatar>} </div>
                                <div style={{ marginLeft: "2%", color: "#aaa", fontSize: "small" }}>
                                    <Link style={{ color: "#aaa" }} to={"/profile/".concat(this.state.replies[0].users)}>
                                        {this.state.replies[0].users}
                                    </Link>
                                </div>
                                <div style={{ marginLeft: "2%", color: "#aaa", fontSize: "xx-small" }}>
                                    {this.state.replies[0].timestamps}
                                </div>
                            </div>
                            <IconButton style={{ marginRight: "1%" }} onClick={() => this.setState({ threadMenu: true })}>
                                <MoreHoriz style={{ color: '#aaa' }} />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={this.state.threadMenu}
                                open={Boolean(this.state.threadMenu)}
                                onClose={() => this.setState({ threadMenu: false })}
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
                                {this.state.replies[0].users == localStorage.getItem('username') ? <MenuItem onClick={() => { this.deleteThread(); this.setState({ threadMenu: false, snackbarShow: true, snackbarMessage: 'Thread Deleted Successfully!' }) }}><MdDelete size={20} style={{ marginRight: '1em' }} />Delete Thread</MenuItem> : null}
                                <MenuItem onClick={this.saveThread}>
                                    <HiSave size={20} style={{ marginRight: '1em' }} /> Save
                                </MenuItem>
                                {this.state.replies[0].bodies != 'NO DESCRIPTION' ?
                                    <MenuItem onClick={() => {
                                        navigator.clipboard.writeText(this.state.replies[0].bodies);
                                        this.setState({threadMenu: false, snackbarShow: true, snackbarMessage: 'Message Copied Successfully!' })
                                    }}>
                                        <HiClipboardCopy size={20} style={{ marginRight: '1em' }} />Copy Message
                                    </MenuItem>
                                    :
                                    null
                                }
                            </Menu>
                        </div>
                    </div>

                    <hr></hr>

                    <div className='d-flex' style={{ margin: "2%" }}>
                        <TextField minRows={1} multiline variant="outlined" placeholder="Add a reply..." fullWidth name='body' value={this.state.body} onChange={this.onChangeHandler} inputProps={{ maxLength: "365" }} required />
                        <IconButton onClick={this.onSubmitHandler}>
                            <Send />
                        </IconButton>
                    </div>

                    <hr></hr>

                </div>

                <div className='discussion-detail-li p-2'>

                    {this.state.replies.slice(1).map(
                        (reply, index) => {
                            if (reply.users == localStorage.getItem('username')) {
                                return (
                                    <div key={index} className='d-flex justify-content-end mt-2 messageRow'>
                                        <div className='messageMenuContainer'>
                                            <IconButton onClick={(e) => { this.setState({ messageOptions: e.currentTarget, currentReply: reply.bodies, currentIndex: index, currentUser: reply.users }) }}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </div>
                                        <div className='discussionReply1'>
                                            <div>{reply.bodies}</div>
                                            <div style={{ color: "#dfdfdf", fontSize: "xx-small" }} className='d-flex justify-content-between mt-2'>
                                                <div>
                                                    <Link style={{ color: "#dfdfdf", marginRight: '2vw' }} to={"/profile/".concat(reply.users)}>
                                                        {reply.users}
                                                    </Link>
                                                </div>
                                                <div>{reply.timestamps}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={index} className='d-flex justify-content-start mt-2 messageRow'>
                                        <div className='discussionReply2'>
                                            <div>{reply.bodies}</div>
                                            <div style={{ color: "#dfdfdf", fontSize: "xx-small" }} className='d-flex justify-content-between mt-2'>
                                                <div>
                                                    <Link style={{ color: "#dfdfdf", marginRight: '2vw' }} to={"/profile/".concat(reply.users)}>
                                                        {reply.users}
                                                    </Link>
                                                </div>
                                                <div>{reply.timestamps}</div>
                                            </div>
                                        </div>

                                        <div className='messageMenuContainer'>
                                            <IconButton onClick={(e) => { this.setState({ messageOptions: e.currentTarget, currentReply: reply.bodies, currentIndex: index, currentUser: reply.users }) }}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )}

                    <Menu
                        id="reply-menu"
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
                        {this.state.currentUser == localStorage.getItem('username') ? <MenuItem onClick={() => { this.handleClose(); this.deletePastReply() }}><MdDelete size={20} style={{ marginRight: '1em' }} />Delete Message</MenuItem> : <MenuItem onClick={() => { this.handleClose() }}><RiAlertFill size={20} style={{ marginRight: '1em' }} />Report</MenuItem>}

                        <MenuItem onClick={() => {
                            this.handleClose();
                            navigator.clipboard.writeText(this.state.currentReply);
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
            </div>
        )
    }
}
export default DiscussionDetail
