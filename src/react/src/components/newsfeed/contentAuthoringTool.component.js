import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import style from './newsfeedHeader.module.css';
import addPost from "../../assets/addPost.png";
import axios from "axios";
import { Dialog, Tooltip, Button, useMediaQuery, DialogActions, DialogTitle, DialogContent, TextField, OutlinedInput, FormControlLabel, InputLabel, FormControl, Switch} from "@material-ui/core";
import {AddPhotoAlternateRounded} from "@material-ui/icons";
import { useTheme } from '@material-ui/core/styles';


class ContentAuthoringTool extends Component{
    constructor(props){
        super(props);
        this.state={
            subject: '',
            topic: '',
            subtopic: '',
            type: '',
            question: '',
            fact: '',
            background: '',
            mcq1: '',
            mcq1opt1: '',
            mcq1opt2: '',
            mcq1opt3: '',
            mcq1opt4: '',
            setOpen: this.props.createpost,
            public: true
        }
        this.submit=this.submit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value)
        let data = {};
        data[name] = value;
        this.setState(data);
	}
    
    handleClose = () => {
        this.setState({setOpen: false});
      };
      


    render(){
        const {fullScreen} = this.props;
        if (!this.state.setOpen){
            return <Redirect to="/dashboard" />
        }
        return (
        <>

        <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={this.state.setOpen}
        onClose={() => this.handleClose()}
        aria-labelledby="responsive-dialog-title"
        >
        
        <DialogTitle color="primary"><b>Create Post</b></DialogTitle>

        <DialogContent>
            <form autoComplete="on" className={style.formPost} method="post" id="formPost" encType="multipart/form-data" onSubmit={this.submit}>
            
            <div className={style.addPostFormHeading}>
                <div>
                    Select Category
                </div>
                <div>
                    <FormControlLabel 
                        control={
                        <Switch 
                            style={{color: 'lightgray'}} 
                            color="default"
                            checked={this.state.public} 
                            onChange={() => this.setState({public: !this.state.public})}
                            />
                        } 
                        label="Public"
                    />
                </div> 
            </div>
                <input list="subjects" name="subject" placeholder="Subject" form="formPost" value={this.state.subject} onChange={this.handleChange} size='20' maxLength='20' required/>
                 <datalist id="subjects">
                    <option value="Computer Science"/>
                    <option value="Science"/>
                    <option value="Geography"/>
                    <option value="Pharmacy"/>
                    <option value="Accounts"/>
                    <option value="Economics"/>
                    <option value="Chemistry"/>
                    <option value="Physics"/>
                 </datalist>
                
                 <input list="topics" name="topic" placeholder="Topic" form="formPost" value={this.state.topic} onChange={this.handleChange} size='20' maxLength='20' required/>
                 <datalist id="topics">
                    <option value="Computer Science"/>
                    <option value="Science"/>
                    <option value="Geography"/>
                    <option value="Pharmacy"/>
                    <option value="Accounts"/>
                    <option value="Economics"/>
                    <option value="Chemistry"/>
                    <option value="Physics"/>
                 </datalist>

                 <input list="subTopics" name="subtopic" placeholder="Subtopic" form="formPost" value={this.state.subtopic} onChange={this.handleChange} size='20' maxLength='25' required/>
                 <datalist id="subTopics">
                    <option value="Computer Science"/>
                    <option value="Science"/>
                    <option value="Geography"/>
                    <option value="Pharmacy"/>
                    <option value="Accounts"/>
                    <option value="Economics"/>
                    <option value="Chemistry"/>
                    <option value="Physics"/>
                 </datalist>

                 <input list="type" name="type" placeholder="Type" form="formPost" value={this.state.type} onChange={this.handleChange} required/>
                 <datalist id="type">
                    <option value="News"/>
                    <option value="Information"/>
                    <option value="News & Information"/>
                 </datalist>
                 <br />

    
                    <span className={style.addPostFormHeading}>Create Post</span>
                    <br />
                    
                    <TextField variant="outlined" placeholder="Add a Question, if applicable..." fullWidth type="text" label="Question" name="question" inputProps={{ maxLength: 40 }} value={this.state.question} onChange={this.handleChange}/>
<p></p>
                    <TextField multiline variant="outlined" placeholder="Write a post of Max. 365 letters..." fullWidth type="text" label="Fact" form="formPost" name="fact" inputProps={{ maxLength: 365 }}  value={this.state.fact} onChange={this.handleChange} required/>
                    
<p></p>
<br />
<p></p>

                 

                <span className={style.addPostFormHeading}>Add Multiple Choice Answer</span>
                <br />
                    <TextField variant="outlined" fullWidth size="small" label="Multiple Choice Question" name="mcq1" type="text" placeholder="Ask a Question related to this Post"  form="formPost" inputProps={{ maxLength: 60 }} value={this.state.mcq1} onChange={this.handleChange} required/>  <p></p>
                    <TextField variant="outlined" fullWidth size="small" label="Option 1" name="mcq1opt1" type="text" placeholder="Enter correct option here" form="formPost" inputProps={{ maxLength: 40 }} value={this.state.mcq1opt1} onChange={this.handleChange} required/>  <p></p>
                    <TextField variant="outlined" fullWidth size="small" label="Option 2" name="mcq1opt2" type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 40 }} value={this.state.mcq1opt2} onChange={this.handleChange}required/>  <p></p>
                    <TextField variant="outlined" fullWidth size="small" label="Option 3" name="mcq1opt3" type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 40 }} value={this.state.mcq1opt3} onChange={this.handleChange}/>  <p></p>
                    <TextField variant="outlined" fullWidth size="small" label="Option 4" name="mcq1opt4" type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 40 }} value={this.state.mcq1opt4} onChange={this.handleChange}/>  <p></p>
                    <p></p> <br /> <p id="fillTheFormCompleteMessage"></p>

<div className="d-flex justify-content-between">                  
            <Button variant="contained" component="label" className={style.backgroundBtn} >
                <AddPhotoAlternateRounded /> Background
                <div id="uploadMedia"> <input hidden type="file" name="background"  onChange={this.handleChange} form="formPost" accept="image/*" required /></div>
            </Button>

        <DialogActions>
          <Button onClick={() => this.handleClose()}>
            Cancel
          </Button>
          <Button onClick={this.submit}>
            Save
          </Button>
        </DialogActions>
</div>
            
            </form>
            </DialogContent>
        </Dialog>

        </>
);
}
    submit(e){
        e.preventDefault();
        if (!this.state.background || !this.state.subject || !this.state.topic || !this.state.subtopic || !this.state.type || !this.state.fact || !this.state.mcq1 || !this.state.mcq1opt1 || !this.state.mcq1opt2){
            document.getElementById('fillTheFormCompleteMessage').innerHTML="Please fill all the mandatory fields and Background Image to create a post.";
        }
        else{
            const form_data= new FormData();
        const ABC= document.querySelector('#uploadMedia > input[type="file"]').files[0];
        form_data.append('username', localStorage.getItem('username'));
        form_data.append('subject', this.state.subject);
        form_data.append('topic', this.state.topic);
        form_data.append('subtopic', this.state.subtopic);
        form_data.append('type', this.state.type);
        form_data.append('question', this.state.question);
        form_data.append('fact', this.state.fact);
        form_data.append('background', ABC);
        form_data.append('mcq1', this.state.mcq1);
        form_data.append('mcq1opt1', this.state.mcq1opt1);
        form_data.append('mcq1opt2', this.state.mcq1opt2);
        form_data.append('mcq1opt3', this.state.mcq1opt3);
        form_data.append('mcq1opt4', this.state.mcq1opt4);
        form_data.append('public', this.state.public);
        axios({method: "post", url: "http://localhost:8103/api/db_create_post", data: form_data, headers: { "Content-Type": "multipart/form-data" }})
        .then(response => {
            console.log(response.data);
            this.setState({setOpen: false});
            })
        .catch((error) => {
        console.log(error);
        alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
    });
    }
    }


}

export default function ContentAuthoringToolWindow() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return <ContentAuthoringTool fullScreen={fullScreen} createpost={true}/>;
  }