import React, { Component } from 'react'
import './discussionList.css'
import CreateThread from './createThread.component.js'
import { Link } from 'react-router-dom';
import { Avatar, Button, Divider } from '@material-ui/core';
import AxiosBaseFile from '../AxiosBaseFile';
import { Add, TrendingFlat } from '@material-ui/icons';
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

class DiscussionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newDiscussion: false,
            threads: [],
            community: this.props.community
        }
        this.changeDiscussionSortingOption = this.changeDiscussionSortingOption.bind(this)
    }
    componentDidMount() {
        var resThread = {};
        var thread = [];
        document.getElementById('tabDiscussionSorting-1').checked = true;
        if (this.props.community) {
            AxiosBaseFile.post('/api/db_get_all_threads_of_community', { 'username': localStorage.getItem('username'), 'community': this.state.community, 'option': 'New' })
                .then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        resThread['name'] = response.data[i].name;
                        resThread['community'] = response.data[i].community;
                        resThread['id'] = response.data[i]._id.$oid;
                        resThread['title'] = response.data[i].title;
                        resThread['total_number_of_replies'] = response.data[i].total_number_of_replies;
                        resThread['date'] = response.data[i].timestamps[0];
                        resThread['profilePicture'] = response.data[i].profilePicture;

                        thread[i] = JSON.parse(JSON.stringify(resThread));
                    }
                    this.setState({ threads: thread })
                })
                .catch((error) => {
                    this.setState({ threads: [] })
                    console.log(error)
                });
        } else {
            AxiosBaseFile.post('/api/db_get_all_threads', { 'username': localStorage.getItem('username'), 'option': 'New' })
                .then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        resThread['name'] = response.data[i].name;
                        resThread['community'] = response.data[i].community;
                        resThread['id'] = response.data[i]._id.$oid;
                        resThread['title'] = response.data[i].title;
                        resThread['total_number_of_replies'] = response.data[i].total_number_of_replies;
                        resThread['date'] = response.data[i].timestamps[0];
                        resThread['profilePicture'] = response.data[i].profilePicture;

                        thread[i] = JSON.parse(JSON.stringify(resThread));
                    }
                    this.setState({ threads: thread })
                })
                .catch((error) => {
                    this.setState({ threads: [] })
                    console.log(error)
                });
        }
    }
    createThreadToggle = () => {
        this.setState({
            newDiscussion: !this.state.newDiscussion
        });
    };

    changeDiscussionSortingOption(option) {
        var resThread = {};
        var thread = [];

        if (this.props.community) {
            AxiosBaseFile.post('/api/db_get_all_threads_of_community', { 'username': localStorage.getItem('username'), 'community': this.state.community, 'option': option })
                .then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        resThread['name'] = response.data[i].name;
                        resThread['community'] = response.data[i].community;
                        resThread['id'] = response.data[i]._id.$oid;
                        resThread['title'] = response.data[i].title;
                        resThread['total_number_of_replies'] = response.data[i].total_number_of_replies;
                        resThread['date'] = response.data[i].timestamps[0];
                        resThread['profilePicture'] = response.data[i].profilePicture;

                        thread[i] = JSON.parse(JSON.stringify(resThread));
                    }
                    this.setState({ threads: thread })
                })
                .catch((error) => {
                    this.setState({ threads: [] })
                    console.log(error)
                });
        } else {
            AxiosBaseFile.post('/api/db_get_all_threads', { 'username': localStorage.getItem('username'), 'option': option })
                .then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        resThread['name'] = response.data[i].name;
                        resThread['community'] = response.data[i].community;
                        resThread['id'] = response.data[i]._id.$oid;
                        resThread['title'] = response.data[i].title;
                        resThread['total_number_of_replies'] = response.data[i].total_number_of_replies;
                        resThread['date'] = response.data[i].timestamps[0];
                        resThread['profilePicture'] = response.data[i].profilePicture;

                        thread[i] = JSON.parse(JSON.stringify(resThread));
                    }
                    this.setState({ threads: thread })
                })
                .catch((error) => {
                    this.setState({ threads: [] })
                    console.log(error)
                });
        }
    }
    render() {
        return (
            <div className='discussion-list-container'>
                <div className="addDiscussionButtonContainer">
                    <button className="addDiscussionButton" onClick={this.createThreadToggle}>
                        <Add />
                    </button>
                </div>

                {this.props.community ? <div className='mt-4'></div> : null}

                <div className="d-flex justify-content-center">
                    <input name="tabDiscussionSorting" type="radio" id="tabDiscussionSorting-1" className="inputDiscussionSortingOption" onChange={() => this.changeDiscussionSortingOption("New")} />
                    <label for="tabDiscussionSorting-1" className="labelSortingOption">New</label>

                    <input name="tabDiscussionSorting" type="radio" id="tabDiscussionSorting-2" className="inputDiscussionSortingOption" onChange={() => this.changeDiscussionSortingOption("Trending")} />
                    <label for="tabDiscussionSorting-2" className="labelSortingOption">Trending</label>

                    <input name="tabDiscussionSorting" type="radio" id="tabDiscussionSorting-3" className="inputDiscussionSortingOption" onChange={() => this.changeDiscussionSortingOption("My Discussions")} />
                    <label for="tabDiscussionSorting-3" className="labelSortingOption">My Discussions</label>

                    <input name="tabDiscussionSorting" type="radio" id="tabDiscussionSorting-4" className="inputDiscussionSortingOption" onChange={() => this.changeDiscussionSortingOption("Saved")} />
                    <label for="tabDiscussionSorting-4" className="labelSortingOption">Saved</label>
                </div>

                {this.state.newDiscussion ? <CreateThread community={this.props.community} /> : null}

                <div className='discussion-list-list'>
                    {this.state.threads.length > 0 ?
                        this.state.threads.map(
                            (thread, index) =>
                                <div id={thread.id} key={index} className="divStyle">
                                    <Link to={'/discussionDetail/'.concat(thread.id)} style={{ color: '#403e42', textDecoration: "none" }}>

                                        <div className='d-flex justify-content-between align-items-center px-2 pt-2' style={{ textOverflow: "ellipsis" }}>
                                            <div>
                                                {thread.profilePicture != 'null' ?
                                                    <img src={require('../../assets/profilePictures/' + thread.profilePicture)} className='smallSizeProfilePicture' />
                                                    :
                                                    <img src={generator.generateRandomAvatar(thread.name)} className='smallSizeProfilePicture' />
                                                }
                                            </div>
                                            <div className='userFullNameDiscussion ml-2'>{thread.name}</div>
                                            {/*
                                            <div>
                                                <span>
                                                    <svg height="100%" viewBox="0 0 20 20" width="1em" style={{ overflow: "visible", transform: 'rotate(-90deg)', marginRight: '1vw' }}>
                                                        <defs><clipPath><rect height="100%" width="0" x="0"></rect></clipPath></defs>
                                                        <circle cx="50%" cy="50%" fill="none" r="10" stroke="#eeeeee" stroke-width="3"></circle>
                                                        <circle cx="50%" cy="50%" fill="none" r="10" stroke="var(--purpleDark)" stroke-dasharray="100" stroke-dashoffset={100 - thread.timePassedInPercent / 1.66} stroke-linecap="round" stroke-width="3"></circle>
                                                        <circle cx="50%" cy="50%" fill="var(--purpleDark)" r="0"></circle>
                                                    </svg>
                                                </span>
                                            </div>
                                            */}
                                        </div>

                                        <div style={{ fontWeight: '600' }} className='px-2 pt-2'> {thread.title} </div>


                                        <div className='communityNameDiscussionBlock'>
                                            <Link to={'/discussionList/'.concat(thread.community)} style={{ textDecoration: 'none', color: 'var(--pureBlack)' }}>
                                                {thread.community}
                                            </Link>
                                        </div>


                                        <Divider />

                                        {thread.total_number_of_replies > 0 ?
                                            <div style={{ fontSize: 'small' }} className='px-2 py-1 d-flex justify-content-between align-items-center'>
                                                <div>

                                                </div>
                                                <div>
                                                    {thread.total_number_of_replies} Replies
                                                </div>
                                            </div>
                                            :
                                            <div style={{ fontSize: 'small', color: 'var(--purpleDark)' }} className='px-2 py-1 d-flex justify-content-end align-items-center'>
                                                Start Discussion <TrendingFlat />
                                            </div>
                                        }
                                    </Link>
                                </div>
                        )
                        :
                        <div className='text-center mt-5'>No Discussions Found</div>
                    }

                </div>
            </div>
        )
    }
}
export default DiscussionList
