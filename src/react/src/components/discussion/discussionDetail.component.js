import React, { Component } from 'react'
import './discussionDetail.css'
import CreateReply from './createReply.component.js'
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

class DiscussionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            replies: [{'bodies': '', 'timestamps': '', 'users': ''}],
            title: "",
            handle: this.props.handle,
            body: "",
            addReply:[]
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }
    componentDidMount() {
        var resReply = {};
        var reply = [];
        axios.post('http://127.0.0.1:8103/api/db_get_thread_id', {'_id': this.state.handle})
            .then(response => {
                console.log(response.data);
                for (var i = 0; i < response.data.bodies.length; i++){
                    resReply['bodies'] = response.data.bodies[i];
                    resReply['timestamps'] = response.data.timestamps[i];
                    resReply['users'] = response.data.users[i];
                    reply[i] = JSON.parse(JSON.stringify(resReply));
                }
                console.log(reply);
                this.setState({replies: reply, title: response.data.title})
            })
			.catch((error) => {
			console.log(error)
        });
    }
    onChangeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value)
        let data = {};
        data[name] = value;

        this.setState(data);
    }
    onSubmitHandler(){
        if (this.state.body){
            axios.put('http://127.0.0.1:8103/api/db_put_thread_reply', {'username': localStorage.getItem('username'), '_id': this.state.handle,'body': this.state.body})
            .catch((error) => {
                console.log(error)
            });
            this.setState({addReply: [this.state.body, ...this.state.addReply]})
            this.setState({body: ""})
        }
    }
    render() {
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
                    <span style={{marginLeft: "2%", color: "#aaa", fontSize: "small"}}>
                        <Link style={{color: "#aaa"}} to={"/profile/".concat(this.state.replies[0].users)}>
                            {this.state.replies[0].users}
                        </Link> 
                    </span>
                    <span style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>
                        {this.state.replies[0].timestamps}
                    </span>
                </div>
                <hr></hr>
                <div className='d-flex' style = {{margin: "2%"}}>
                <TextField minRows={1}  multiline variant="outlined" placeholder="Add a reply..." fullWidth name='body' value={this.state.body} onChange={this.onChangeHandler} inputProps={{maxLength: "365"}} required />
                <Button onClick={this.onSubmitHandler}>Reply</Button>
                </div>
                <hr></hr>
                <div className = 'discussion-detail-li'>

                    {this.state.addReply ?
                    this.state.addReply.map((reply, index) =>
                        <div key={index} className='divStyl'>
                            <span style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>{localStorage.getItem('username')} </span>
                            <span style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>Just Now</span>
                                
                            <div style = {{margin: "1%", padding: "10px", border: "1px solid #dfd6e9", borderRadius: "5px"}}>
                                {reply}
                            </div>
                        </div> 
                        )
                        
                        : null}

                    {this.state.replies.slice(1).map(
                        (reply, index) => 
                            <div key={index} className='divStyl'>
                                <span style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>
                                    <Link style={{color: "#aaa"}} to={"/profile/".concat(reply.users)}>
                                        {reply.users}
                                    </Link>
                                </span>
                                <span style={{marginLeft: "2%", color: "#aaa", fontSize: "xx-small"}}>{reply.timestamps}</span>
                                
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
