import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import style from './newsfeedHeader.module.css';
import { Dialog, Tooltip, Button, useMediaQuery, DialogActions, DialogTitle, DialogContent, TextField, OutlinedInput, FormControlLabel, InputLabel, FormControl, Switch, IconButton, Snackbar, Divider, CircularProgress } from "@material-ui/core";
import { AddCircleOutline, AddPhotoAlternateRounded, RemoveCircleOutline } from "@material-ui/icons";
import { useTheme } from '@material-ui/core/styles';
import AxiosBaseFile from "../AxiosBaseFile";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import './../quill.css';
import RedirectToLastVisitedPage from "../redirectToLastVisitedPage";

const Quill = ReactQuill.Quill
var Font = Quill.import('formats/font');
Font.whitelist = ['san-serif', 'poppins', 'raleway', 'ubuntu', 'serif', 'monospace', 'cookie'];
Quill.register(Font, true);

class Fact extends Component {
    constructor(props) {
        super(props);
        this.quillRef = null;
        this.modules = {
            syntax: true,
            toolbar: [
                [{ font: Font.whitelist }],
                [{ 'size': ['small', false, 'large'] }],
                ["bold", "italic", "underline"],
                [{ color: ['#000', '#555', '#e71313', '#ff9900', '#00b000', '#0066cc', '#9933ff', '#fff', '#aaa', '#f66774', '#ffff00', '#93f400', '#4de6e6', '#fc7899'] }, { background: ['#000', '#555', '#e71313', '#ff9900', '#00b000', '#009ef2', '#9933ff', '#fff', '#aaa', '#f66774', '#ffff00', '#93f400', '#4de6e6', '#fc7899'] }],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["formula"],
                ["clean"]
            ]
        }
    }
    render() {
        return (
            <ReactQuill ref={(el) => this.quillRef = el} theme='bubble' modules={this.modules} placeholder="Write a post of maximum 365 characters..." onChange={() => {
                let name = 'fact' + this.props.postNumber;
                let value = JSON.stringify(this.quillRef.unprivilegedEditor.getContents());
                let data = {};
                data[name] = value;
                let lengthName = 'lengthOfCurrentFact' + this.props.postNumber;
                let lengthValue = this.quillRef.unprivilegedEditor.getLength() - 1;
                if (lengthValue > 365) {
                    document.getElementById('factContainer' + this.props.postNumber).style.border = "2px solid red";
                } else {
                    document.getElementById('factContainer' + this.props.postNumber).style.border = "2px solid #3f51b5";
                }
                let lengthOfCurrentFact = {};
                lengthOfCurrentFact[lengthName] = lengthValue;
                let dashoffset = {};
                dashoffset['dashoffset'] = 91.25 - lengthValue / 6;
                this.props.handleData(data, lengthOfCurrentFact, dashoffset)
            }}
            />
        )
    }
}

class ContentAuthoringTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: localStorage.getItem('subject'),
            topic: localStorage.getItem('topic'),
            subtopic: localStorage.getItem('subtopic'),
            type: '',
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
            maximumNumberOfPosts: 10,
            snackbarShow: false,
            dashoffset: 91.25,
            lengthOfCurrentFact1: 0,
            currentFocus: 1
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleData = this.handleData.bind(this);
        this.quillRef = null;
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let data = {};
        data[name] = value;

        this.setState(data, () => {
            if (name == 'background' && value) {
                const bgImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];
                const idOfPreview = document.getElementById('previewBackground');
                idOfPreview.src = URL.createObjectURL(bgImage)
                document.getElementById('uploadBgBtn').style.color = 'green';
            }
        });
    }

    handleClose = () => {
        this.setState({ setOpen: false });
    };

    generateFields() {
        let listOfFields = [];
        for (let i = 1; i <= this.state.numberOfPosts; i++) {
            listOfFields.push(this.generateInputFields(i));
        }
        return listOfFields
    }
    handleData(data, lengthOfCurrentFact, dashoffset) {
        this.setState(data);
        this.setState(lengthOfCurrentFact);
        this.setState(dashoffset)
    }
    generateInputFields(postNumber) {
        return (
            <div>
                <div className="quillField" id={'factContainer' + postNumber} onFocus={() => {
                    let lengthOfCurrentFact = this.state['lengthOfCurrentFact' + postNumber];
                    document.getElementById('factContainer' + postNumber).style.opacity = '1';
                    if (lengthOfCurrentFact > 365) {
                        document.getElementById('factContainer' + postNumber).style.border = "2px solid red";
                    } else {
                        document.getElementById('factContainer' + postNumber).style.border = "2px solid #3f51b5";
                    }
                    let dashoffset = 91.25 - lengthOfCurrentFact / 6;
                    this.setState({ dashoffset: dashoffset, currentFocus: postNumber })
                }}

                    onBlur={() => {
                        let lengthOfCurrentFact = this.state['lengthOfCurrentFact' + postNumber];
                        if (lengthOfCurrentFact <= 365) {
                            document.getElementById('factContainer' + postNumber).style.opacity = '0.25';
                            document.getElementById('factContainer' + postNumber).style.border = '1px solid #c4c4c4';
                        }
                    }}>
                    <Fact postNumber={postNumber} handleData={this.handleData} />
                </div>
                <p></p>
            </div>
        )
    }
    generateMCQ() {
        let listOfFields = [];
        for (let i = 1; i <= this.state.numberOfPosts; i++) {
            listOfFields.push(this.generateMCQFields(i));
        }
        return listOfFields
    }
    generateMCQFields(postNumber) {
        return (
            <div>
                <TextField variant="outlined" fullWidth size="small" label={"Multiple Choice Question " + postNumber} name={"mcq" + postNumber} type="text" placeholder="Ask a Question related to this Post" form="formPost" inputProps={{ maxLength: 100 }} value={this.state["mcq" + postNumber]} onChange={this.handleChange} required />  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 1" name={"mcq" + postNumber + "opt1"} type="text" placeholder="Enter correct option here" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq" + postNumber + "opt1"]} onChange={this.handleChange} required />  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 2" name={"mcq" + postNumber + "opt2"} type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq" + postNumber + "opt2"]} onChange={this.handleChange} required />  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 3" name={"mcq" + postNumber + "opt3"} type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq" + postNumber + "opt3"]} onChange={this.handleChange} />  <p></p>
                <TextField variant="outlined" fullWidth size="small" label="Option 4" name={"mcq" + postNumber + "opt4"} type="text" placeholder="Incorrect Option" form="formPost" inputProps={{ maxLength: 60 }} value={this.state["mcq" + postNumber + "opt4"]} onChange={this.handleChange} />  <p></p>
                <br />
            </div>
        )
    }

    searchSubject(event) {
        AxiosBaseFile.post('/api/db_search_a_subject', { subject: event.target.value })
            .then(res => {
                this.setState({ listOfSubjects: res.data })
            })
    }
    searchTopic(event) {
        AxiosBaseFile.post('/api/db_search_a_topic', { topic: event.target.value })
            .then(res => {
                this.setState({ listOfTopics: res.data })
            })
    }
    componentDidMount() {
        if (localStorage.getItem('type')) {
            this.setState({ type: localStorage.getItem('type') })
        } else {
            this.setState({ type: 'Information' })
        }
    }
    componentWillUnmount() {
        localStorage.removeItem('id');
    }
    render() {
        if (!localStorage.getItem("token")) {
            return <Redirect to="/login" />
        }

        if (window.innerWidth <= 600 && ! this.state.setOpen) {
            return (
                <div>
                    <Link to={'/post/'.concat(this.state.redirectPostId)}>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.state.snackbarShow}
                            autoHideDuration={6000}
                            message='Post created Successfully! Click to View.'
                            onClose={() => this.setState({ snackbarShow: false })}
                        >
                        </Snackbar>
                    </Link>
                    <RedirectToLastVisitedPage />
                </div>
            )
        } else if (window.innerWidth > 600 && ! this.state.setOpen) {
            return <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.state.snackbarShow}
                autoHideDuration={6000}
                message='Post created Successfully! Click to View.'
                onClose={() => this.setState({ snackbarShow: false })}
            >
            </Snackbar>
        }

        const { fullScreen } = this.props;

        return (
            <>

                <Dialog
                    fullScreen={fullScreen}
                    fullWidth={true}
                    open={this.state.setOpen}
                    onClose={() => this.handleClose()}
                    aria-labelledby="responsive-dialog-title"
                >

                    <DialogTitle ><b>Create Post</b></DialogTitle>
                    <Divider />
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
                                                style={{ color: 'lightgray' }}
                                                color="default"
                                                checked={this.state.public}
                                                onChange={() => this.setState({ public: !this.state.public })}
                                            />
                                        }
                                        label={this.state.public ? "Public" : "Private"}
                                    />
                                </div>
                            </div>

                            <input list="subjects" name="subject" placeholder="Subject" form="formPost" value={this.state.subject} onChange={(e) => { this.searchSubject(e); this.handleChange(e) }} size='20' maxLength='45' required />
                            <datalist id="subjects">
                                {this.state.listOfSubjects.map((name) =>
                                    <option key={name} value={name} />
                                )}
                            </datalist>

                            <input list="topics" name="topic" placeholder="Topic" form="formPost" value={this.state.topic} onChange={(e) => { this.searchTopic(e); this.handleChange(e) }} size='20' maxLength='45' required />
                            <datalist id="topics">
                                {this.state.listOfTopics.map((name) =>
                                    <option key={name} value={name} />
                                )}
                            </datalist>

                            <input name="subtopic" placeholder="Subtopic" form="formPost" value={this.state.subtopic} onChange={this.handleChange} size='20' maxLength='45' required />

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
                                <div className="d-flex justify-content-center align-items-center">

                                    {this.state['lengthOfCurrentFact' + this.state.currentFocus] ?
                                        <>
                                            <Tooltip title={this.state['lengthOfCurrentFact' + this.state.currentFocus] + " / 365"}>
                                                <svg height="100%" viewBox="0 0 20 20" width="1.75em" style={{ overflow: "visible", transform: 'rotate(-90deg)', marginRight: '1em' }}>
                                                    <defs><clipPath><rect height="100%" width="0" x="0"></rect></clipPath></defs>
                                                    <circle cx="50%" cy="50%" fill="none" r="10" stroke="#eeeeee" stroke-width="2"></circle>
                                                    <circle cx="50%" cy="50%" fill="none" r="10" stroke="var(--purpleMain)" stroke-dasharray="91.25" stroke-dashoffset={this.state.dashoffset} stroke-linecap="round" stroke-width="2"></circle>
                                                    <circle cx="50%" cy="50%" fill="var(--purpleMain)" r="0"></circle>
                                                </svg>
                                            </Tooltip>

                                            <Divider orientation="vertical" flexItem />
                                        </> : null
                                    }

                                    <IconButton onClick={() => { this.setState({ numberOfPosts: this.state.numberOfPosts + 1, dashoffset: 91.25, lengthOfCurrentFact: 0 }) }}>
                                        <AddCircleOutline />
                                    </IconButton>

                                    {this.state.numberOfPosts > 1 ?
                                        <IconButton onClick={() => this.setState({ numberOfPosts: this.state.numberOfPosts - 1 }, () => {
                                            const fact = 'fact' + this.state.numberOfPosts;
                                            const lengthName = 'lengthOfCurrentFact' + this.state.numberOfPosts;
                                            const lengthOfCurrentFact = this.state[lengthName];
                                            const dashoffset = 91.25 - lengthOfCurrentFact / 6;
                                            this.setState({ dashoffset: dashoffset, lengthOfCurrentFact: lengthOfCurrentFact });
                                        })}>
                                            <RemoveCircleOutline />
                                        </IconButton>
                                        :
                                        null
                                    }
                                </div>
                            }
                            <br />
                            <p></p>



                            <span className={style.addPostFormHeading}>Multiple Choice Question</span>
                            <br />

                            {this.generateMCQ()}

                            {this.state.background ? <div className="d-flex justify-content-center"><img id='previewBackground' alt='not found' /></div> : null}

                            <p id="fillTheFormCompleteMessage"></p>

                        </FormControl>
                    </DialogContent>
                    <Divider />
                    <div className="d-flex justify-content-between">
                        <Button component="label" id='uploadBgBtn' style={{ color: "red" }} >
                            <AddPhotoAlternateRounded />
                            <div id="uploadMedia"> <input hidden type="file" name="background" onChange={this.handleChange} form="formPost" accept="image/*" required /></div>
                        </Button>

                        <DialogActions>
                            <Button style={{ color: 'var(--purpleMain)' }} onClick={() => this.handleClose()}>
                                Cancel
                            </Button>
                            <Button style={{ backgroundColor: 'var(--purpleMain)', color: '#ffffff' }} onClick={this.submit}>
                                Post
                                {this.state.loading && (
                                    <CircularProgress
                                        size={16}
                                        style={{
                                            color: 'white',
                                            marginLeft: '0.25em'
                                        }}
                                    />
                                )}
                            </Button>

                        </DialogActions>
                    </div>
                </Dialog>
            </>
        );
    }
    submit(e) {
        this.setState({ loading: true })
        e.preventDefault();
        if (!this.state.background || !this.state.subject || !this.state.topic || !this.state.subtopic || !this.state.type || !this.state.fact1 || !this.state.mcq1 || !this.state.mcq1opt1 || !this.state.mcq1opt2 || this.state.lengthOfCurrentFact1 > 365) {
            this.setState({ loading: false })
            document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please fill all the mandatory fields and Background Image to create a post.";
        }
        else {
            if (!localStorage.getItem('id')) {
                const form_data = new FormData();
                var backgroundImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];
                const mcq1Opts = Array();

                for (let i = 1; i <= 4; i++) {
                    if (this.state['mcq1opt' + i]) {
                        mcq1Opts.push(this.state['mcq1opt' + i])
                    }
                }

                form_data.append('username', localStorage.getItem('username'));
                form_data.append('subject', this.state.subject);
                form_data.append('topic', this.state.topic);
                form_data.append('subtopic', this.state.subtopic);
                form_data.append('type', this.state.type);
                form_data.append('fact', this.state.fact1);
                form_data.append('background', backgroundImage);
                form_data.append('mcq1', this.state.mcq1);
                form_data.append('mcq1Opts', mcq1Opts);
                form_data.append('public', this.state.public);

                if (!this.state.listOfSubjects.includes(this.state.subject) && this.state.subject != localStorage.getItem('subject')) {
                    this.setState({ loading: false })
                    document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please Enter a Valid Subject.";
                }
                else if (!this.state.listOfTopics.includes(this.state.topic) && this.state.topic != localStorage.getItem('topic')) {
                    this.setState({ loading: false })
                    document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please Enter a Valid Topic.";
                }
                else if (this.state.subject != this.state.topic != this.state.subtopic) {
                    localStorage.setItem('subject', this.state.subject);
                    localStorage.setItem('topic', this.state.topic);
                    localStorage.setItem('subtopic', this.state.subtopic);
                    localStorage.setItem('type', this.state.type);

                    if (this.state.numberOfPosts > 1) {
                        const form_data_list_of_posts = new FormData();
                        form_data_list_of_posts.append('username', localStorage.getItem('username'));
                        form_data_list_of_posts.append('subject', this.state.subject);
                        form_data_list_of_posts.append('topic', this.state.topic);
                        form_data_list_of_posts.append('subtopic', this.state.subtopic);
                        form_data_list_of_posts.append('type', this.state.type);
                        form_data_list_of_posts.append('public', this.state.public);
                        form_data_list_of_posts.append('background', backgroundImage)

                        var listOfPosts = Array();

                        for (let x = 2; x <= this.state.numberOfPosts; x++) {
                            if (this.state['fact' + x] && this.state['mcq' + x] && this.state['mcq' + x + 'opt1'] && this.state['mcq' + x + 'opt2']) {
                                const post = {}
                                post.fact = this.state['fact' + x];
                                post.mcq = this.state['mcq' + x];
                                const mcq1Opts = Array();

                                for (let i = 1; i <= 4; i++) {
                                    if (this.state['mcq' + x + 'opt' + i]) {
                                        mcq1Opts.push(this.state['mcq' + x + 'opt' + i])
                                    }
                                }

                                post.mcq1Opts = mcq1Opts;
                                listOfPosts.push(post);
                            }
                        }
                        form_data_list_of_posts.append('listOfPosts', JSON.stringify(listOfPosts));

                        if (listOfPosts.length == this.state.numberOfPosts - 1) {
                            AxiosBaseFile.post("/api/db_create_post", form_data)
                                .then(response => {
                                    this.setState({ redirectPostId: response.data._id.$oid })
                                    form_data_list_of_posts.append('currentPostId', response.data._id.$oid)
                                    form_data_list_of_posts.append('previousBackground', response.data.background)

                                    AxiosBaseFile.post('/api/db_add_next_post', form_data_list_of_posts)
                                        .then(res => {
                                            this.setState({ setOpen: false, snackbarShow: true, loading: false })
                                        })
                                        .catch(err => {
                                            this.setState({ loading: false })
                                            document.getElementById('fillTheFormCompleteMessage').innerHTML = "Could not process this task.";
                                            console.log(err)
                                        })
                                })
                                .catch((error) => {
                                    console.log(error);
                                    this.setState({ loading: false })
                                    alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
                                });

                        } else {
                            this.setState({ loading: false })
                            document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please fill all the mandatory fields and Background Image to create a post.";
                        }
                    }
                    else {
                        AxiosBaseFile.post("/api/db_create_post", form_data)
                            .then(response => {
                                this.setState({ setOpen: false, snackbarShow: true, redirectPostId: response.data._id.$oid, loading: false })
                            })
                            .catch((error) => {
                                console.log(error);
                                this.setState({ loading: false })
                                alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
                            });
                    }
                }
                else {
                    this.setState({ loading: false })
                    document.getElementById('fillTheFormCompleteMessage').innerHTML = "Subject, Topic & Subtopic should not be same.";
                }
            }

            else {
                {/*For Adding Next Posts*/ }

                var backgroundImage = document.querySelector('#uploadMedia > input[type="file"]').files[0];

                if (!this.state.listOfSubjects.includes(this.state.subject) && this.state.subject != localStorage.getItem('subject')) {
                    this.setState({ loading: false })
                    document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please Enter a Valid Subject.";
                }
                else if (!this.state.listOfTopics.includes(this.state.topic) && this.state.topic != localStorage.getItem('topic')) {
                    this.setState({ loading: false })
                    document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please Enter a Valid Topic.";
                }
                else if (this.state.subject != this.state.topic != this.state.subtopic) {

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

                    for (let x = 1; x <= this.state.numberOfPosts; x++) {
                        if (this.state['fact' + x] && this.state['mcq' + x] && this.state['mcq' + x + 'opt1'] && this.state['mcq' + x + 'opt2']) {
                            const post = {}
                            post.fact = this.state['fact' + x];
                            post.mcq = this.state['mcq' + x];
                            const mcq1Opts = Array();

                            for (let i = 1; i <= 4; i++) {
                                if (this.state['mcq' + x + 'opt' + i]) {
                                    mcq1Opts.push(this.state['mcq' + x + 'opt' + i])
                                }
                            }

                            post.mcq1Opts = mcq1Opts;
                            listOfPosts.push(post);
                        }
                    }
                    form_data_list_of_posts.append('listOfPosts', JSON.stringify(listOfPosts));

                    if (listOfPosts.length == this.state.numberOfPosts) {
                        AxiosBaseFile.post('/api/db_add_next_post', form_data_list_of_posts)
                            .then(res => {
                                localStorage.removeItem('id');
                                this.setState({ setOpen: false, snackbarShow: true, redirectPostId: res.data, loading: false })
                            })
                            .catch((error) => {
                                console.log(error);
                                this.setState({ loading: false })
                                document.getElementById('fillTheFormCompleteMessage').innerHTML = "Could not process this task.";
                                alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice should not be same.\n4. The Fact should be Unique.");
                            });
                    } else {
                        this.setState({ loading: false })
                        document.getElementById('fillTheFormCompleteMessage').innerHTML = "Please fill all the mandatory fields and Background Image to create a post.";
                    }


                }
                else {
                    this.setState({ loading: false })
                    document.getElementById('fillTheFormCompleteMessage').innerHTML = "Subject, Topic & Subtopic should not be same.";
                }
            }

        }
    }


}

export default function ContentAuthoringToolWindow() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return <ContentAuthoringTool fullScreen={fullScreen} createpost={true} />;
}
