import React, { Component } from 'react'
import './discussionList.css'
import CreateThread from './createThread.component.js'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AxiosBaseFile from '../AxiosBaseFile';

class DiscussionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newThread : false,
            threads: [],
            community: this.props.community
        }
    }
    componentDidMount() {
        var resThread = {};
        var thread = [];
        AxiosBaseFile.post('/api/db_get_all_threads', {'community': this.state.community})
            .then(response => {
                for (var i = 0; i < response.data.length; i++){
                    resThread['id'] = response.data[i]._id.$oid;
                    resThread['title'] = response.data[i].title;
                    resThread['replies'] = response.data[i].bodies.length - 1;
                    resThread['date'] = response.data[i].timestamps[0];
                    resThread['timePassedInPercent'] = response.data[i].timePassedInPercent;
                    thread[i] = JSON.parse(JSON.stringify(resThread));
                }
                this.setState({threads: thread}, () => console.log(this.state.threads))
            })
			.catch((error) => {
			console.log(error)
        });
    }
    createThreadToggle = () => {
        this.setState({
            newThread: !this.state.newThread
        });

    };
    render() {
        return(
            <div className = 'discussion-list-container'>
                <div style = {{margin: "1%", position: "sticky", top: "0"}}>
                    Discussion Threads: 
                    <span>
                        <Button style={{backgroundColor: "#77737a", color: "white", border: "5px"}} onClick = {this.createThreadToggle}>
                            Create Thread
                        </Button>
                    </span>
                </div>
                {this.state.newThread ? <CreateThread community={this.state.community}/> : null}
                <div className = 'discussion-list-list'>
                    {this.state.threads.map(
                        (thread, index) => 
                            <div id={thread.id} key = {index} className="divStyle">
                                <Link to = {'/discussionDetail/'.concat(thread.id)} style = {{color: '#403e42', textDecoration: "none"}}>
                                    <div className='d-flex justify-content-between' style={{ textOverflow: "ellipsis"}}>
                                        <span style={{ textOverflow: "ellipsis"}}>{thread.title}</span>
                                        <span>
                                            <span>
                                                <svg height="100%" viewBox="0 0 20 20" width="1em" style={{overflow: "visible", transform: 'rotate(-90deg)', marginRight: '1vw'}}>
                                                    <defs><clipPath><rect height="100%" width="0" x="0"></rect></clipPath></defs>
                                                    <circle cx="50%" cy="50%" fill="none" r="10" stroke="#eeeeee" stroke-width="3"></circle>
                                                    <circle cx="50%" cy="50%" fill="none" r="10" stroke="#77737a" stroke-dasharray="100" stroke-dashoffset={100-thread.timePassedInPercent/1.66} stroke-linecap="round" stroke-width="3"></circle>
                                                    <circle cx="50%" cy="50%" fill="#77737a" r="0"></circle>
                                                </svg>
                                            </span>
                                            <span className='repliesBlock'>{thread.replies}</span>
                                        </span>
                                    </div>
                                    <div style={{fontSize: "small", color: "#9d98a1"}}>
                                        {thread.date}
                                    </div>
                                </Link>
                            </div>
                            
                    )}
                    
                </div>
                
            </div>
            )
        }
}
export default DiscussionList
