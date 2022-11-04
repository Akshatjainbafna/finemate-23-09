import React, { Component } from 'react'
import './discussionList.css'
import CreateThread from './createThread.component.js'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
        axios.post('http://127.0.0.1:8103/api/db_get_all_threads', {'community': this.state.community})
            .then(response => {
                for (var i = 0; i < response.data.length; i++){
                    resThread['id'] = response.data[i]._id;
                    resThread['title'] = response.data[i].title;
                    resThread['replies'] = response.data[i].bodies.length - 1;
                    resThread['date'] = response.data[i].timestamps[0];
                    thread[i] = JSON.parse(JSON.stringify(resThread));
                }
                this.setState({threads: thread})
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
                        (thread) => 
                            <div key = {thread.id} className="divStyle">
                                <Link to = {'/discussionDetail/'.concat(thread.id)} style = {{color: '#403e42', textDecoration: "none"}}>
                                    <div className='d-flex justify-content-between' style={{ textOverflow: "ellipsis" }}>
                                        <span style={{ textOverflow: "ellipsis", width: "calc(100% - 20px)"}}>{thread.title}</span>
                                        <span className='repliesBlock'>{thread.replies}</span>
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
