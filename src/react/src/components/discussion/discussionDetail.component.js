import React, { Component } from 'react'
import './discussionDetail.css'
import { Button, TextField } from '@material-ui/core';
import { Link, Redirect} from 'react-router-dom';
import AxiosBaseFile from '../AxiosBaseFile';
import { Delete } from '@material-ui/icons';

class DiscussionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replies: [{'bodies': '', 'timestamps': '', 'users': ''}],
            title: "",
            handle: this.props.handle,
            body: "",
            addReply:[],
            threadDeleted: false,
            community: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }
    componentDidMount() {
        var resReply = {};
        var reply = [];
        AxiosBaseFile.post('/api/db_get_thread_id', {'_id': this.state.handle})
            .then(response => {
                console.log(response.data);
                for (var i = 0; i < response.data.bodies.length; i++){
                    resReply['bodies'] = response.data.bodies[i];
                    resReply['timestamps'] = response.data.timestamps[i];
                    resReply['users'] = response.data.users[i];
                    reply[i] = JSON.parse(JSON.stringify(resReply));
                }
                this.setState({replies: reply, title: response.data.title, community: response.data.community})
            })
			.catch((error) => {
			console.log(error)
        });
    }
    onChangeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        this.setState(data);
    }
    onSubmitHandler(){
        if (this.state.body){
            AxiosBaseFile.put('/api/db_put_thread_reply', {'username': localStorage.getItem('username'), '_id': this.state.handle,'body': this.state.body})
            .then(res =>{
                this.setState({addReply: [this.state.body, ...this.state.addReply]}, () => console.log(this.state.addReply))
                this.setState({body: ""})
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    deleteRecentlyAddedReply(index){
        console.log(index)
        var indexToBeDeleted = this.state.addReply.length - index + this.state.replies.length - 1;
        AxiosBaseFile.post('/api/db_delete_reply', {'username': localStorage.getItem('username'), '_id': this.state.handle, 'index': indexToBeDeleted})
        .then(res => {
            var addReply = this.state.addReply;
            addReply.splice(index, 1)
            this.setState(addReply)
        })
        .catch(err => console.log(err))
    }

    deletePastReply(index){
        var indexToBeDeleted = index + 1;
        AxiosBaseFile.post('/api/db_delete_reply', {'username': localStorage.getItem('username'), '_id': this.state.handle, 'index': indexToBeDeleted})
        .then(res => {
            var replies = this.state.replies;
            replies.splice(indexToBeDeleted, 1)
            this.setState(replies)
        })
        .catch(err => console.log(err))
    }
    deleteThread(){
        AxiosBaseFile.post('/api/db_delete_thread', {'_id': this.state.handle})
        .then(res => {
            this.setState({threadDeleted: true})
        })
        .catch(err => this.setState({threadDeleted: true}))
    }

    render() {
        if (this.state.threadDeleted){
            const LastPageVisited = '/discussionList/' + this.state.community;
            return <Redirect to={LastPageVisited} />;
        }
        return(
            <div className = 'discussion-detail-container'>
                <h4 style = {{margin: "2%"}}>
                    {this.state.title}
                </h4>

                <div style = {{margin: "2%"}}>
                    <div style = {{marginLeft: "1%", marginRight: "1%", padding: "10px", 
                                    border: "1px solid #dfd6e9", borderRadius: "5px", fontSize: "medium"}}>
                        {this.state.replies[0].bodies}
                    </div>
                    <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-grow-1 mt-2'>
                    <div style={{marginLeft: "2%", color: "#aaa", fontSize: "small"}}>
                        <Link style={{color: "#aaa"}} to={"/profile/".concat(this.state.replies[0].users)}>
                            {this.state.replies[0].users}
                        </Link> 
                    </div>
                    <div style={{marginLeft: "2%", marginTop: "0.5em", color: "#aaa", fontSize: "xx-small"}}>
                        {this.state.replies[0].timestamps}
                    </div>
                    </div>
                    {this.state.replies[0].users == localStorage.getItem('username') ? <div style={{marginRight: "2%"}}><Delete style={{color: '#aaa', fontSize: 'medium'}} onClick={() => this.deleteThread()} /></div> : null}
                    </div>
                </div>

                <hr></hr>

                <div className='d-flex' style = {{margin: "2%"}}>
                <TextField minRows={1}  multiline variant="outlined" placeholder="Add a reply..." fullWidth name='body' value={this.state.body} onChange={this.onChangeHandler} inputProps={{maxLength: "365"}} required />
                <Button onClick={this.onSubmitHandler}>Reply</Button>
                </div>

                <hr></hr>

                <div className = 'discussion-detail-li'>

                    {this.state.addReply.map((reply, index) =>
                        <div key={index} className='divStyl'>
                            <div className='d-flex justify-content-between'>
                                    <div className='d-flex flex-grow-1 mt-2'>
                                        <div style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>
                                            <Link style={{color: "#aaa"}} to={"/profile"}>
                                                {localStorage.getItem('username')}
                                            </Link>
                                        </div>
                                        <div style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>Just Now</div>
                                    </div>
                                    <div style={{marginRight: "2%"}}><Delete style={{color: '#aaa', fontSize: 'small'}} onClick={() => this.deleteRecentlyAddedReply(index)} /></div>
                                </div>
                                
                                <div style = {{margin: "1%", padding: "10px", border: "1px solid #dfd6e9", borderRadius: "5px"}}>
                                        {reply}
                                </div>
                        </div> 
                        )}

                    {this.state.replies.slice(1).map(
                        (reply, index) => 
                            <div key={index} className='divStyl'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex flex-grow-1 mt-2'>
                                        <div style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>
                                            <Link style={{color: "#aaa"}} to={"/profile/".concat(reply.users)}>
                                                {reply.users}
                                            </Link>
                                        </div>
                                        <div style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>{reply.timestamps}</div>
                                    </div>
                                    {reply.users == localStorage.getItem('username') ? <div style={{marginRight: "2%"}}><Delete style={{color: '#aaa', fontSize: 'small'}} onClick={() => this.deletePastReply(index)} /></div> : null }
                                </div>
                                
                                <div style = {{margin: "1%", padding: "10px", border: "1px solid #dfd6e9", borderRadius: "5px"}}>
                                        {reply.bodies}
                                </div>
                                
                            </div>
                    )}
                </div>
            </div>
            )
        }
}
export default DiscussionDetail
