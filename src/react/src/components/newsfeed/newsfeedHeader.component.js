import React,{ Component } from "react";
import { Link, Redirect } from "react-router-dom";
import style from './newsfeedHeader.module.css';
import addPost from "../../assets/addPost.png";
import axios from "axios";
import { BsBorderMiddle, BsCaretLeftFill, BsCaretRightFill, BsChevronLeft, BsDot, BsSlash, BsTypeItalic, BsXCircleFill, BsXLg } from "react-icons/bs";
import { Button, Dialog, Tooltip } from "@material-ui/core";
import ContentAuthoringTool from './contentAuthoringTool.component';

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
import ContentAuthoringToolWindow from "./contentAuthoringTool.component";




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
            setOpen: false
        }
    }
    render(){
        return(
            <>
            <div className={style.newsfeedFeatures}>
            
            <Tooltip title="Add Post"><Button style={{padding: "0"}} className={style.addPostIcon} onClick={() => this.setState({setOpen: !this.state.setOpen})}><img style={{width:"5.5vw", height: "5.5vw"}} src={addPost}></img></Button></Tooltip>
            
            {this.state.setOpen ? <ContentAuthoringToolWindow /> : null }

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
            </>
        );
    }
}
export default NewsfeedHeader