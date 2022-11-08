import React, { Component } from 'react'
import './createThread.css';
import './discussionList.css';
import { Link, Redirect } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, OutlinedInput, TextField, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import AxiosBaseFile from '../AxiosBaseFile';

class CreateThreadClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            setOpen: this.props.createThread,
            community: this.props.community,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }
    componentWillMount(){
        this.setState({setOpen: true});
    }
    onChangeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        this.setState(data);
    }
    onSubmitHandler(){
        if (this.state.title && this.state.body){
            AxiosBaseFile.post('/api/db_create_thread', 
            {'username': localStorage.getItem('username'), 'title': this.state.title,'body': this.state.body, 'community': this.state.community})
        .then(response => {
            this.setState({newThread: response.data})
        })
        .catch((error) => {
            console.log(error)
        });
        this.setState({setOpen: false});
        alert("submit successful");
        }
        else{
            alert("Both field's cannot be Blank.")
        }
    }

    handleClose(){
        this.setState({setOpen: false})
    }
    
    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to='/login' />
        }
        const {fullScreen} = this.props;
        return(
<>

        <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={this.state.setOpen}
        onClose={() => this.handleClose()}
        aria-labelledby="responsive-dialog-title"
        >
        
        <DialogTitle color="primary"><b>Create Thread</b></DialogTitle>

        <DialogContent>
                <InputLabel htmlFor='titleOfThread'>Title</InputLabel>
                <OutlinedInput id="titleOfThread" type="text" name='title' placeholder="Add a Intriguing title..." inputProps={{maxLength: "80"}} value={this.state.title} onChange={this.onChangeHandler} required/>
                <p></p>
                <InputLabel htmlFor='exampleFormControlTextarea1'>Description</InputLabel>
                <TextField minRows={2}  multiline variant="outlined" placeholder="Add a description..." fullWidth name='body' value={this.state.body} onChange={this.onChangeHandler} inputProps={{maxLength: "365"}} required/>
        </DialogContent>

        <DialogActions>
            <Button onClick={()=> this.handleClose()}>
                Cancel
            </Button>
            <Button type="submit" onClick={this.onSubmitHandler}>
                Create Thread
            </Button>
        </DialogActions>
        </Dialog>
        {this.state.newThread? <div className="divStyle">
                                <Link to = {'/discussionDetail/'.concat(this.state.newThread._id.$oid)} style = {{color: '#403e42', textDecoration: "none"}}>
                                    <div className='d-flex justify-content-between' style={{ textOverflow: "ellipsis" }}>
                                        <span style={{ textOverflow: "ellipsis", width: "calc(100% - 20px)"}}>{this.state.newThread.title}</span>
                                        <span className='repliesBlock'>{this.state.newThread.replies}</span>
                                    </div>
                                    <div style={{fontSize: "small", color: "#9d98a1"}}>
                                        {this.state.newThread.date}
                                    </div>
                                </Link>
                            </div>
        
    : null}
            </>           
        )
    }
}
export default function CreateThread(props){
    const theme = useTheme ();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return <CreateThreadClass fullScreen={fullScreen} createThread={true} community={props.community} />;
}
