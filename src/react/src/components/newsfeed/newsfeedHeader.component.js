import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import style from './newsfeedHeader.module.css';
import addPost from "../../assets/addPost.png";
import axios from "axios";
import { BsBorderMiddle, BsCaretLeftFill, BsCaretRightFill, BsChevronLeft, BsDot, BsSlash, BsTypeItalic, BsXCircleFill, BsXLg } from "react-icons/bs";
import { Tooltip } from "@material-ui/core";

import Badminton from "../../assets/sampleImages/badminton.jpeg";
import Coders from "../../assets/sampleImages/coders.jpeg";
import Coaching from "../../assets/sampleImages/coaching.jpeg";
import Shadi from "../../assets/sampleImages/shadi.jpeg";
import Cousins from "../../assets/sampleImages/cousins.jpeg";
import Project from "../../assets/sampleImages/project.jpeg";
import School from "../../assets/sampleImages/school.jpeg";
import College from "../../assets/sampleImages/coll.jpeg";
import Multi from "../../assets/sampleImages/coll.jpeg";
import Indore from "../../assets/sampleImages/indore.jpeg";




function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
class NewsfeedHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            addPostButton:false,
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
        };
        this.submit=this.submit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    abc(){
        document.getElementById('addPostForm').style.display="block";
        document.getElementById('page1').style.display="block";
        document.getElementById('page2').style.display="none";
        document.getElementById('page3').style.display="none";
        document.getElementById('page4').style.display="none";
    }
    xyz(){
        document.getElementById('addPostForm').style.display = 'none';
    }
    pageVisible1(){
        document.getElementById('page1').style.display="block";
        document.getElementById('page2').style.display="none";
        document.getElementById('page3').style.display="none";
        document.getElementById('page4').style.display="none";
    }
    pageVisible2(){
        document.getElementById('page2').style.display="block";
        document.getElementById('page1').style.display="none";
        document.getElementById('page3').style.display="none";
        document.getElementById('page4').style.display="none";
    }
    pageVisible3(){
        document.getElementById('page3').style.display="block";
        document.getElementById('page1').style.display="none";
        document.getElementById('page2').style.display="none";
        document.getElementById('page4').style.display="none";
        document.getElementById('uploadMedia').style.display="none";
    }
    pageVisible4(){
        document.getElementById('page4').style.display="block";
        document.getElementById('page1').style.display="none";
        document.getElementById('page2').style.display="none";
        document.getElementById('page3').style.display="none";
    }
    mediaUploadTypeSelectMedia(){
        document.getElementById('selectMedia').style.display="block";
        document.getElementById('uploadMedia').style.display="none";
    }
    mediaUploadTypeUploadMedia(){
        document.getElementById('uploadMedia').style.display="block";
        document.getElementById('selectMedia').style.display="none";
    }
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value)
        let data = {};
        data[name] = value;

        this.setState(data);


	}
    

    render(){
        if(this.state.postCreated){
			return <Redirect to='/dashboard' />
		  }
        return(
            <>
            <div className={style.newsfeedFeatures}>

               <Tooltip title="Add Post"><section className={style.addPostIcon} onClick={this.abc}><img src={addPost}></img></section></Tooltip>

               <Tooltip title="Scroll horizontally"><section className={style.story}><ul className={style.list}>
                
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Badminton}/> </div>   <div className={style.circleName}>Badmint</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Shadi}/> </div>   <div className={style.circleName}>Shadi</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={College}/> </div>   <div className={style.circleName}> College </div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={School}/> </div>   <div className={style.circleName}> School </div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Indore}/> </div>   <div className={style.circleName}>Indore</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Coaching}/> </div>   <div className={style.circleName}>Coaching</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Project}/> </div>   <div className={style.circleName}>Project</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Multi}/> </div>   <div className={style.circleName}>Project</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Cousins}/> </div>   <div className={style.circleName}>Cousins</div> </div> </li>
               <li className={style.item}> <div className={style.userStoryThumbnail}> <div className={style.imgThumbnail}> <img src={Coders}/> </div>   <div className={style.circleName}>Coders</div> </div> </li>

                 </ul> </section></Tooltip>


{/*  Toggle Buttons for Post Categories and MCQ-Post toggling
                <section className={style.newsfeedSettings}>
                    <div className={style.button} id={style.button4}>
                        <input type="checkbox" className={style.checkbox} />
                        <div className={style.knobs}></div>
                        <div className={style.layer}></div>
                    </div>

                    <div className={style.button} id={style.button3}>
                        <input type="checkbox" className={style.checkbox} />
                        <div className={style.knobs}></div>
                        <div className={style.layer}></div>
                    </div>
                </section>
*/}

            </div>



        <div className={style.addPostForm} id="addPostForm">
        <button type="button" className={style.closeButton} onClick={this.xyz}> <BsXLg/> </button>
            <div>

            <form autoComplete="on" className={style.formPost} method="post" id="formPost" encType="multipart/form-data" onSubmit={this.submit}>
            <div id='page1'>
            <div className={style.formNavigation}><a href="#page1" className={style.linkNext}><BsCaretLeftFill/></a> <a href="#page2" className={style.linkNext} onClick={this.pageVisible2}><BsCaretRightFill/></a></div>
            <span className={style.addPostFormHeading} >Select Category</span>
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
                 </div>

                 <div id="page2">
                 <div className={style.formNavigation}><a href="#page1" className={style.linkNext} onClick={this.pageVisible1}><BsCaretLeftFill/></a> <a href="#page3" className={style.linkNext} onClick={this.pageVisible3}><BsCaretRightFill/></a></div>
                    <span className={style.addPostFormHeading}>Create Post</span>
                    <input type="text" form="formPost" name="question" placeholder="Question (optional)" size="40" maxLength="40" value={this.state.question} onChange={this.handleChange}/>
                    <textarea type="text" form="formPost" name="fact" placeholder="Fact (required)" maxLength="365" cols="40" rows="5" value={this.state.fact} onChange={this.handleChange} required/>
                 </div>
                 <div id="page3">
                 <div className={style.formNavigation}><a href="#page2" className={style.linkNext} onClick={this.pageVisible2}><BsCaretLeftFill/></a> <a href="#page4" className={style.linkNext} onClick={this.pageVisible4}><BsCaretRightFill/></a></div>
                 <span className={style.addPostFormHeading}>Select Background</span>
                    <span className={style.mediaUploadOptions}>
                        <a href="#selectMedia" onClick={this.mediaUploadTypeSelectMedia}>Select Media</a>
                        |
                        <a href="#uploadMedia" onClick={this.mediaUploadTypeUploadMedia}>Upload Media</a>
                    </span>
                    <div className={style.selectMedia} id="selectMedia">
                        <form action="" id="searchBackground">
                        <input name="search" type="search" placeholder="Enter Background" form="searchBackground" />
                        <input type="submit" value="Search"/>
                        </form>
                    </div>
                    <div className={style.uploadMedia} id="uploadMedia">
                    <input type="file" class="custom-file-input" name="background" value={this.state.background} onChange={this.handleChange} form="formPost" accept="image/*" required/>
                    </div>
                 </div>
                 <div id="page4">
                 <div className={style.formNavigation}><a href="#page3" className={style.linkNext} onClick={this.pageVisible3}><BsCaretLeftFill/></a> <a href="#page4" className={style.linkNext} onClick={this.pageVisible4}><BsCaretRightFill/></a></div>
                 <input type="hidden" name="custId" value=""/>
                    <input type="text" name="mcq1" placeholder="Ask a Question" form="formPost" size="40" maxLength="60" value={this.state.mcq1} onChange={this.handleChange} required/>
                    <input name="mcq1opt1" type="text" placeholder="Enter correct answer here" form="formPost" size="25" maxLength="40" value={this.state.mcq1opt1} onChange={this.handleChange} required/>
                    <input name="mcq1opt2" type="text" placeholder="Option 2" form="formPost" size="25" maxLength="40" value={this.state.mcq1opt2} onChange={this.handleChange}required/>
                    <input name="mcq1opt3" type="text" placeholder="Option 3" form="formPost" size="25" maxLength="40" value={this.state.mcq1opt3} onChange={this.handleChange}/>
                    <input name="mcq1opt4" type="text" placeholder="Option 4" form="formPost" size="25" maxLength="40" value={this.state.mcq1opt4} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                 </div>
            </form>
        </div>
        </div>
            </>
        );
    }
    submit(e){
        e.preventDefault();
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
        axios({method: "post", url: "http://localhost:8103/api/db_create_post", data: form_data, headers: { "Content-Type": "multipart/form-data" }})
        .then(response => {
            console.log(response.data);
            this.setState({postCreated : true});
            })
        .catch((error) => {
        console.log(error);
        alert("We don't support Data Duplicasy!\nTo create a Post:\n1. Subject, Topic, Subtopic should be different.\n2. The type should be either News, Information or News& Information\n3. Options in multiple choice shouldnot be same.\n4. The Fact should be Unique.");
    });
    }
}
export default NewsfeedHeader