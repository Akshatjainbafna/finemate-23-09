import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import style from './newsfeedHeader.module.css';
import { Dialog, Tooltip, Button, useMediaQuery, DialogActions, DialogTitle, DialogContent, TextField, OutlinedInput, FormControlLabel, InputLabel, FormControl, Switch, IconButton} from "@material-ui/core";
import {Add, AddPhotoAlternateRounded} from "@material-ui/icons";
import { useTheme } from '@material-ui/core/styles';
import AxiosBaseFile from "../AxiosBaseFile";


class ContentAuthoringTool extends Component{
    constructor(props){
        super(props);
        this.state={
            subject: localStorage.getItem('subject'),
            topic: localStorage.getItem('topic'),
            subtopic: localStorage.getItem('subtopic'),
            type: '',
            question1: '',
            fact1: '',
            background: '',
            mcq1: '',
            mcq1opt1: 'True',
            mcq1opt2: 'False',
            setOpen: this.props.createpost,
            public: true,
            listOfSubjects: [],
            listOfTopics: [],
            numberOfPosts: 1,
            maximumNumberOfPosts: 10
        }
        this.submit=this.submit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;
        this.setState(data, () => {
            console.log(this.state[name])
            if (name == 'background' && value){
                const bgImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];
                const idOfPreview = document.getElementById('previewBackground');
                idOfPreview.src = URL.createObjectURL(bgImage)
                document.getElementById('uploadBgBtn').style.color = 'green';
            }
        });
	}
    
    handleClose = () => {
        this.setState({setOpen: false});
    };
      
    generateFields(){
        let listOfFields = [];
        for (let i = 1; i <= this.state.numberOfPosts; i++) {
            listOfFields.push(this.generateInputFields(i));
          }
        return listOfFields
    }
    generateInputFields(postNumber){
        return (
            <div>
                <TextField variant="outlined" placeholder="Add a question, if applicable..." fullWidth type="text" label="Question" name={"question"+postNumber} inputProps={{ maxLength: 50 }} value={this.state['question'+postNumber]} onChange={this.handleChange}/>
                    <p></p>
                <TextField multiline variant="outlined" placeholder="Write a post of maximum 365 characters..." fullWidth type="text" label="Fact/News" form="formPost" name={"fact"+postNumber} inputProps={{ maxLength: 365 }}  value={this.state['fact' + postNumber]} onChange={this.handleChange} required/>
                    <p></p>
            </div>
        )
    }
    generateMCQ(){
        let listOfFields = [];
        for (let i = 1; i <= this.state.numberOfPosts; i++) {
            listOfFields.push(this.generateMCQFields(i));
          }
        return listOfFields
    }
    generateMCQFields(postNumber){
        return (
            <div>
                <TextField variant="outlined" fullWidth size="small" label={"Multiple Choice Question "+postNumber} name={"mcq"+postNumber} type="text" placeholder="Ask a Question related to this Post"  form="formPost" inputProps={{ maxLength: 100 }} value={this.state["mcq"+postNumber]} onChange={this.handleChange} required/>  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 1" name={"mcq"+postNumber+"opt1"} type="text" placeholder="Enter correct option here" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq"+postNumber+"opt1"]} onChange={this.handleChange} required/>  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 2" name={"mcq"+postNumber+"opt2"} type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq"+postNumber+"opt2"]} onChange={this.handleChange} required/>  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 3" name={"mcq"+postNumber+"opt3"} type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq"+postNumber+"opt3"]} onChange={this.handleChange}/>  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 4" name={"mcq"+postNumber+"opt4"} type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq"+postNumber+"opt4"]} onChange={this.handleChange}/>  <p></p>
                <br />
            </div>
        )
    }

    searchSubject(event){
        AxiosBaseFile.post('/api/db_search_a_subject', {subject: event.target.value})
        .then(res => {
          this.setState({listOfSubjects: res.data})
        })
      }
      searchTopic(event){
        AxiosBaseFile.post('/api/db_search_a_topic', {topic: event.target.value})
        .then(res => {
          this.setState({listOfTopics: res.data})
        })
      }
      componentDidMount(){
        if (localStorage.getItem('type')){
            this.setState({type: localStorage.getItem('type')})
        }else{
            this.setState({type: 'Information'})
        }
      }
      componentWillUnmount(){
        localStorage.removeItem('id');
      }
    render(){
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        }
        
        const {fullScreen} = this.props;
        if (!this.state.setOpen && !localStorage.getItem('id')){
            return <Redirect to="/dashboard" />
        }
        else if (!this.state.setOpen && localStorage.getItem('id')){
            return <Redirect to={'/post/'.concat(localStorage.getItem('id'))} />
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
        
        <DialogTitle><b>Create Post</b></DialogTitle>

        <DialogContent>
            <FormControl fullWidth autoComplete="on" className={style.formPost} method="post" id="formPost" encType="multipart/form-data" onSubmit={this.submit}>
            
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
                        label={this.state.public ? "Public" : "Private"}
                    />
                </div> 
            </div>

                <input list="subjects" name="subject" placeholder="Subject" form="formPost" value={this.state.subject} onChange={(e) => {this.searchSubject(e); this.handleChange(e)}} size='20' maxLength='45' required/>
                 <datalist id="subjects">
                 {this.state.listOfSubjects.map((name) => 
                    <option key={name} value={name}/>
                  )}
                 </datalist>
                
                 <input list="topics" name="topic" placeholder="Topic" form="formPost" value={this.state.topic} onChange={ (e) => {this.searchTopic(e); this.handleChange(e)}} size='20' maxLength='45' required/>
                 <datalist id="topics">
                 {this.state.listOfTopics.map((name) => 
                    <option key={name} value={name}/>
                  )}
                 </datalist>

                 <input name="subtopic" placeholder="Subtopic" form="formPost" value={this.state.subtopic} onChange={this.handleChange} size='20' maxLength='45' required/>

                 <select className="mt-2" name="type" form="formPost" value={this.state.type} onChange={this.handleChange} required>     
                    <option value="Information"> Information </option>
                    <option value="News"> News </option>
                    <option value="News & Information"> News & Information </option>
                 </select>

                 <p><br /></p>
                 

    
                    <span className={style.addPostFormHeading}>Create Post</span>
                    <br />
                    
                    {this.generateFields()}
                    {this.state.numberOfPosts < this.state.maximumNumberOfPosts && 
                        <div className="d-flex justify-content-center">
                            <Button onClick={() => this.setState({numberOfPosts: this.state.numberOfPosts + 1})}>
                                <Add />
                            </Button>
                        </div>
                    }
                        <br />
                        <p></p>

                 

                <span className={style.addPostFormHeading}>Multiple Choice Question</span>
                <br />
                
                {this.generateMCQ()}

                {this.state.background ? <div className="d-flex justify-content-center"><img id='previewBackground' alt='not found'/></div> : null}

                <p></p> <br /> <p id="fillTheFormCompleteMessage"></p>
                <div className="d-flex justify-content-between">                  
                    <Button component="label" id='uploadBgBtn' style={{color: "red"}} >
                        <AddPhotoAlternateRounded />
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
            
            </FormControl>
            </DialogContent>
        </Dialog>

        </>
);
}
    submit(e){
        e.preventDefault();
        if (!this.state.background || !this.state.subject || !this.state.topic || !this.state.subtopic || !this.state.type || !this.state.fact1 || !this.state.mcq1 || !this.state.mcq1opt1 || !this.state.mcq1opt2){
            document.getElementById('fillTheFormCompleteMessage').innerHTML="Please fill all the mandatory fields and Background Image to create a post.";
        }
        else{
            if ( ! localStorage.getItem('id')){
                const form_data = new FormData();
                var backgroundImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];
                const mcq1Opts = Array();

                for (let i=1; i <= 4; i++){
                    if (this.state['mcq1opt'+i]){
                        mcq1Opts.push(this.state['mcq1opt'+i])
                    }
                }

                form_data.append('username', localStorage.getItem('username'));
                form_data.append('subject', this.state.subject);
                form_data.append('topic', this.state.topic);
                form_data.append('subtopic', this.state.subtopic);
                form_data.append('type', this.state.type);
                form_data.append('question', this.state.question1);
                form_data.append('fact', this.state.fact1);
                form_data.append('background', backgroundImage);
                form_data.append('mcq1', this.state.mcq1);
                form_data.append('mcq1Opts', mcq1Opts);
                form_data.append('public', this.state.public);

                if (! this.state.listOfSubjects.includes(this.state.subject) && this.state.subject != localStorage.getItem('subject')){
                    document.getElementById('fillTheFormCompleteMessage').innerHTML="Please Enter a Valid Subject.";
                }
                else if(! this.state.listOfTopics.includes(this.state.topic) && this.state.topic != localStorage.getItem('topic')){
                    document.getElementById('fillTheFormCompleteMessage').innerHTML="Please Enter a Valid Topic.";
                }
                else if(this.state.subject != this.state.topic != this.state.subtopic){
                    localStorage.setItem('subject', this.state.subject);
                    localStorage.setItem('topic', this.state.topic);
                    localStorage.setItem('subtopic', this.state.subtopic);
                    localStorage.setItem('type', this.state.type);

                    if (this.state.numberOfPosts > 1){
                        const form_data_list_of_posts = new FormData();
                        form_data_list_of_posts.append('username', localStorage.getItem('username'));
                        form_data_list_of_posts.append('subject', this.state.subject);
                        form_data_list_of_posts.append('topic', this.state.topic);
                        form_data_list_of_posts.append('subtopic', this.state.subtopic);
                        form_data_list_of_posts.append('type', this.state.type);
                        form_data_list_of_posts.append('public', this.state.public);
                        form_data_list_of_posts.append('background', backgroundImage)

                        var listOfPosts = Array();

                        for (let x=2; x <= this.state.numberOfPosts; x++){
                            if (this.state['fact'+x] && this.state['mcq'+x] && this.state['mcq' +x+ 'opt1'] && this.state['mcq' +x+ 'opt2']){
                                const post = {}
                                if (this.state['question'+x]){
                                    post.question = this.state['question'+x];
                                }else{
                                    post.question = '';
                                }
                                post.fact = this.state['fact'+x];
                                post.mcq = this.state['mcq'+x];
                                const mcq1Opts = Array();

                                for (let i=1; i <= 4; i++){
                                    if (this.state['mcq' +x+ 'opt'+i]){
                                        mcq1Opts.push(this.state['mcq' +x+ 'opt'+i])
                                    }
                                }
                        
                                post.mcq1Opts = mcq1Opts;
                                listOfPosts.push(post);
                            }
                        }
                        form_data_list_of_posts.append('listOfPosts', JSON.stringify(listOfPosts));

                        if (listOfPosts.length == this.state.numberOfPosts - 1){
                            AxiosBaseFile.post("/api/db_create_post", form_data)
                            .then(response => {
                                    form_data_list_of_posts.append('currentPostId', response.data._id.$oid)
                                    form_data_list_of_posts.append('previousBackground', response.data.background)
                                
                                    AxiosBaseFile.post('/api/db_add_next_post', form_data_list_of_posts)
                                    .then(res =>{
                                        this.setState({setOpen: false})
                                    })
                                    .catch(err => {
                                        document.getElementById('fillTheFormCompleteMessage').innerHTML="Could not process this task.";
                                        console.log(err)
                                    })
                            })
                            .catch((error) => {
                              console.log(error);
                              alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
                            });

                        }else{
                            document.getElementById('fillTheFormCompleteMessage').innerHTML="Please fill all the mandatory fields and Background Image to create a post.";
                        }
                    }
                    else{
                        AxiosBaseFile.post("/api/db_create_post", form_data)
                        .then(response => {
                            this.setState({setOpen: false})
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
                        });
                    }
                }
                else{
                    document.getElementById('fillTheFormCompleteMessage').innerHTML="Subject, Topic & Subtopic should not be same.";
                }
            }

            else{
                {/*For Adding Next Posts*/}
                
                var backgroundImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];

                if (! this.state.listOfSubjects.includes(this.state.subject) && this.state.subject != localStorage.getItem('subject')){
                    document.getElementById('fillTheFormCompleteMessage').innerHTML="Please Enter a Valid Subject.";
                }
                else if(! this.state.listOfTopics.includes(this.state.topic) && this.state.topic != localStorage.getItem('topic')){
                    document.getElementById('fillTheFormCompleteMessage').innerHTML="Please Enter a Valid Topic.";
                }
                else if(this.state.subject != this.state.topic != this.state.subtopic){

                    localStorage.setItem('subject', this.state.subject);
                    localStorage.setItem('topic', this.state.topic);
                    localStorage.setItem('subtopic', this.state.subtopic);
                    localStorage.setItem('type', this.state.type);

                    const form_data_list_of_posts = new FormData();
                    form_data_list_of_posts.append('username', localStorage.getItem('username'));
                    form_data_list_of_posts.append('subject', this.state.subject);
                    form_data_list_of_posts.append('topic', this.state.topic);
                    form_data_list_of_posts.append('subtopic', this.state.subtopic);
                    form_data_list_of_posts.append('type', this.state.type);
                    form_data_list_of_posts.append('public', this.state.public);
                    form_data_list_of_posts.append('background', backgroundImage)
                    form_data_list_of_posts.append('currentPostId', localStorage.getItem('id'));
                    form_data_list_of_posts.append('previousBackground', '');

                    var listOfPosts = Array();

                    for (let x=1; x <= this.state.numberOfPosts; x++){
                        if (this.state['fact'+x] && this.state['mcq'+x] && this.state['mcq' +x+ 'opt1'] && this.state['mcq' +x+ 'opt2']){
                            const post = {}
                            if (this.state['question'+x]){
                                post.question = this.state['question'+x];
                            }else{
                                post.question = '';
                            }
                            post.fact = this.state['fact'+x];
                            post.mcq = this.state['mcq'+x];
                            const mcq1Opts = Array();

                            for (let i=1; i <= 4; i++){
                                if (this.state['mcq' +x+ 'opt'+i]){
                                    mcq1Opts.push(this.state['mcq' +x+ 'opt'+i])
                                }
                            }
                    
                            post.mcq1Opts = mcq1Opts;
                            listOfPosts.push(post);
                        }
                    }
                    form_data_list_of_posts.append('listOfPosts', JSON.stringify(listOfPosts));

                    if (listOfPosts.length == this.state.numberOfPosts){
                        AxiosBaseFile.post('/api/db_add_next_post', form_data_list_of_posts)
                        .then(res =>{
                            localStorage.removeItem('id');
                            this.setState({setOpen: false})
                        })
                        .catch((error) => {
                            console.log(error);
                            document.getElementById('fillTheFormCompleteMessage').innerHTML="Could not process this task.";
                            alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
                        });
                    }else{
                        document.getElementById('fillTheFormCompleteMessage').innerHTML="Please fill all the mandatory fields and Background Image to create a post.";
                    }
                    

                }
                else{
                    document.getElementById('fillTheFormCompleteMessage').innerHTML="Subject, Topic & Subtopic should not be same.";
                }
            }
            
        }
    }


}

export default function ContentAuthoringToolWindow() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return <ContentAuthoringTool fullScreen={fullScreen} createpost={true}/>;
  }
