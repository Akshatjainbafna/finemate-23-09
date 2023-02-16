import React, { Component } from 'react'
import './createThread.css';
import './discussionList.css';
import { Link, Redirect } from 'react-router-dom';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputLabel, Menu, MenuItem, OutlinedInput, Snackbar, TextField, Tooltip, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import AxiosBaseFile from '../AxiosBaseFile';
import { KeyboardArrowDown, KeyboardArrowDownOutlined, TrendingFlat } from '@material-ui/icons';

import StartupClub from '../../assets/sampleImages/startup-club.png';
import CodersClub from '../../assets/sampleImages/coders-club.png';
import FinemateHangout from '../../assets/sampleImages/finemate-hangout.png';
import FinanceClub from '../../assets/sampleImages/finance-club.png';
import Web3Club from '../../assets/sampleImages/web3-club.png';
import ScienceClub from '../../assets/sampleImages/science-club.png';
import MedicoClub from '../../assets/sampleImages/medico-club.png';
import EditorsClub from '../../assets/sampleImages/editors-club.png';
import LawClub from '../../assets/sampleImages/law-club.png';
import SportsClub from '../../assets/sampleImages/sports-club.png';
import MarketersClub from '../../assets/sampleImages/marketers-club.png';
import DesignersClub from '../../assets/sampleImages/designers-club.png';


class CreateThreadClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            setOpen: this.props.createThread,
            community: this.props.community,
            snackbarShow: false,
            dashoffset: 91.25,
            anchorEl: false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleCloseCommunityOptionList = this.handleCloseCommunityOptionList.bind(this);
    }
    componentWillMount() {
        if (! this.props.community){
            this.setState({ community: 'Finemate Hangout' });
        }
        this.setState({ setOpen: true });
    }
    onChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        if (name == 'body') {
            const dashoffset = 91.25 - value.length / 6;
            this.setState({ dashoffset: dashoffset })
        }
        this.setState(data);
    }
    onSubmitHandler() {
        if (this.state.title && this.state.community) {
            AxiosBaseFile.post('/api/db_create_thread',
                { 'username': localStorage.getItem('username'), 'title': this.state.title, 'body': this.state.body, 'community': this.state.community })
                .then(response => {
                    AxiosBaseFile.post('/api/db_get_profile_picture', { username: localStorage.getItem('username') })
                        .then(res => {
                            this.setState({ profilePicture: res.data.profilePicture, name: res.data.name, newThread: response.data, snackbarShow: true })
                        })
                        .catch(err => {
                            this.setState({ profilePicture: '' })
                        })
                })
                .catch((error) => {
                    console.log(error)
                });
            this.setState({ setOpen: false });
        }
        else {
            alert("Select a community and give the discussion a title.")
        }
    }

    handleClose() {
        this.setState({ setOpen: false })
    }
    handleCloseCommunityOptionList() {
        this.setState({ anchorEl: false })
    }
    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to='/login' />
        }
        const { fullScreen } = this.props;

        let allTheComunitities = [
            { id: 1, imgSrc: StartupClub, title: "Startup Club" },
            { id: 2, imgSrc: CodersClub, title: "Coders Club" },
            { id: 3, imgSrc: FinemateHangout, title: "Finemate Hangout" },
            { id: 4, imgSrc: FinanceClub, title: "Finance Club" },
            { id: 5, imgSrc: Web3Club, title: "Web3 Club" },
            { id: 6, imgSrc: ScienceClub, title: "Science Club" },
            { id: 7, imgSrc: MedicoClub, title: "Medico Club" },
            { id: 8, imgSrc: SportsClub, title: "Sports Club" },
            { id: 9, imgSrc: EditorsClub, title: "Editors Club" },
            { id: 10, imgSrc: MarketersClub, title: "Marketers Club" },
            { id: 11, imgSrc: LawClub, title: "Law Club" },
            { id: 12, imgSrc: DesignersClub, title: "Designers Club" },
        ]

        return (
            <>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarShow}
                    autoHideDuration={4000}
                    message='Thread created Successfully!'
                    onClose={() => this.setState({ snackbarShow: false })}
                >
                </Snackbar>

                <Dialog
                    fullScreen={fullScreen}
                    fullWidth={true}
                    open={this.state.setOpen}
                    onClose={() => this.handleClose()}
                    aria-labelledby="responsive-dialog-title"
                >

                    <DialogTitle color="primary"><b> Start a discussion</b></DialogTitle>

                    <DialogContent>
                        <div className='d-flex align-items-center mb-3'>
                            <div>
                                {localStorage.getItem('profilePicture') != 'undefined' ? <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/' + localStorage.getItem('profilePicture')} className='smallSizeProfilePicture' /> : <Avatar className='smallSizeProfilePicture'>{localStorage.getItem('name').charAt(0)}</Avatar>}
                            </div>
                            <div className='mx-2'>
                                <small>
                                    Posting to:
                                </small>
                            </div>
                            <div>
                                <Button
                                    id="demo-customized-button"
                                    variant="contained"
                                    disableElevation
                                    onClick={() => this.setState({ anchorEl: true })}
                                    endIcon={<KeyboardArrowDown />}
                                    style={{ backgroundColor: 'var(--lightBackgroundSecondary)', color: 'var(--purpleDark)', borderRadius: '30px', fontSize: 'small', padding: '5px 10px' }}
                                >
                                    {this.state.community}
                                </Button>
                                <Menu
                                    id="demo-customized-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleCloseCommunityOptionList}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    {allTheComunitities.map((community, index) =>
                                        <MenuItem key={index} onClick={() => {
                                            this.setState({ community: community.title });
                                            this.handleCloseCommunityOptionList();
                                        }} disableRipple>
                                            { !this.props.community ?
                                                <img style={{ width: '1.25em', height: '1.25em', marginRight: '8px' }} src={community.imgSrc} alt="club-icon" />
                                                : 
                                                null
                                            }
                                            {community.title}
                                        </MenuItem>
                                    )}
                                </Menu>
                            </div>
                        </div>
                        <InputLabel htmlFor='titleOfThread'>Title</InputLabel>
                        <OutlinedInput id="titleOfThread" type="text" name='title' placeholder="Add a Intriguing title..." fullWidth inputProps={{ maxLength: "100" }} value={this.state.title} onChange={this.onChangeHandler} required />
                        <p></p>
                        <InputLabel htmlFor='exampleFormControlTextarea1'>Description</InputLabel>
                        <TextField minRows={2} multiline variant="outlined" placeholder="Add a description..." fullWidth name='body' value={this.state.body} onChange={this.onChangeHandler} inputProps={{ maxLength: "365" }} />

                        <div className='d-flex justify-content-end mt-3'>
                            <Tooltip title={this.state.body.length + " / 365"}>
                                <svg height="100%" viewBox="0 0 20 20" width="1.75em" style={{ overflow: "visible", transform: 'rotate(-90deg)' }}>
                                    <defs><clipPath><rect height="100%" width="0" x="0"></rect></clipPath></defs>
                                    <circle cx="50%" cy="50%" fill="none" r="10" stroke="#eeeeee" stroke-width="2"></circle>
                                    <circle cx="50%" cy="50%" fill="none" r="10" stroke="var(--purpleMain)" stroke-dasharray="91.25" stroke-dashoffset={this.state.dashoffset} stroke-linecap="round" stroke-width="2"></circle>
                                    <circle cx="50%" cy="50%" fill="var(--purpleMain)" r="0"></circle>
                                </svg>
                            </Tooltip>
                        </div>
                        <br />
                    </DialogContent>

                    <DialogActions>
                        <Button style={{ color: 'var(--purpleMain)' }} onClick={() => this.handleClose()}>
                            Cancel
                        </Button>
                        <Button style={{ backgroundColor: 'var(--purpleMain)', color: '#ffffff' }} type="submit" onClick={this.onSubmitHandler}>
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>

                {this.state.newThread ?

                    <div className="divStyle">
                        <Link to={'/discussionDetail/'.concat(this.state.newThread._id.$oid)} style={{ color: '#403e42', textDecoration: "none" }}>

                            <div className='d-flex justify-content-between p-2' style={{ textOverflow: "ellipsis" }}>
                                <div>{this.state.profilePicture ? <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/' + this.state.profilePicture} className='smallSizeProfilePicture' /> : <Avatar className='smallSizeProfilePicture'>{this.state.name.charAt(0)}</Avatar>} </div>
                                <div className='userFullNameDiscussion ml-2'>{this.state.name}</div>
                                <div>
                                    <span>
                                        <svg height="100%" viewBox="0 0 20 20" width="1em" style={{ overflow: "visible", transform: 'rotate(-90deg)', marginRight: '1vw' }}>
                                            <defs><clipPath><rect height="100%" width="0" x="0"></rect></clipPath></defs>
                                            <circle cx="50%" cy="50%" fill="none" r="10" stroke="#eeeeee" stroke-width="3"></circle>
                                            <circle cx="50%" cy="50%" fill="none" r="10" stroke="var(--purpleDark)" stroke-dasharray="100" stroke-dashoffset='100' stroke-linecap="round" stroke-width="3"></circle>
                                            <circle cx="50%" cy="50%" fill="var(--purpleDark)" r="0"></circle>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className='p-2 font-weight-bold'> {this.state.newThread.title} </div>
                            <Divider />
                            <div style={{ fontSize: 'small', color: 'var(--purpleDark)' }} className='p-2 d-flex justify-content-end align-items-center'>
                                Start Discussion <TrendingFlat />
                            </div>
                        </Link>
                    </div>

                    :

                    null
                }
            </>
        )
    }
}
export default function CreateThread(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return <CreateThreadClass fullScreen={fullScreen} createThread={true} community={props.community} />;
}
