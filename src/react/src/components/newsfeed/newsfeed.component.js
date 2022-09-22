import React, { Component } from "react";
import update from 'react-addons-update';
import style from './newsfeed.module.css';
import {BsArrowLeft, BsArrowLeftRight, BsArrowRight, BsArrowRightShort, BsBookmarkHeart, BsBookmarkHeartFill, BsHeart, BsHeartFill, BsLightbulb, BsLightbulbFill, BsThreeDotsVertical} from 'react-icons/bs'
import infographic from '../../../../react/src/assets/Screenshot_20180316-1849.png';
import infographic2 from '../../../../react/src/assets/wp_ss_20170222_0003.png';
import correct from '../../../../react/src/assets/correctIcon.png';
import semicorrect from '../../../../react/src/assets/semicorrectIcon.png';
import incorrect from '../../../../react/src/assets/incorrectIcon.png';
import { render } from "react-dom";
import axios from "axios";
import { btoa } from "buffer";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Favorite, Bookmark, FavoriteBorder, BookmarkBorder, SwapHorizOutlined, EmojiObjectsOutlined, EmojiObjects} from '@material-ui/icons';
import { FormControl, RadioGroup, Radio } from "@material-ui/core";


function abc(key){
    var clickedID = "idMenuListVisible"+String(key);
    document.getElementById(clickedID).style.display="block";
}
function xyz(key){
    var clickedID = "idMenuListVisible"+String(key);
    document.getElementById(clickedID).style.display="none";
   
}
function viewPreviousNextPost(key){
    var clickedID = "idPreviousNextWindow"+String(key);
    document.getElementById(clickedID).style.display="block";
}
function viewPreviousNextPostOff(key){
    var clickedID = "idPreviousNextWindow"+String(key);
    document.getElementById(clickedID).style.display ="none";
}
class NewsFeed extends Component{
    constructor(props){
        super(props);
        this.state={isLiked:false, isSaved: false, isLighten: false, responseData: [], selectedOptions: [], correctMCQs:[], inCorrectMCQs: [], correctOptions: [], likeState: [], lightState: [], saveState:[], listOfLikedPosts:[], listOfLightenPosts:[], listOfSavedPosts:[]};
        this.clickedLike=this.clickedLike.bind(this);
        this.clickedSave=this.clickedSave.bind(this);
        this.clickedLighten=this.clickedLighten.bind(this);
        this.slider=this.silder.bind(this);
        this.handleRadioClick=this.handleRadioClick.bind(this);
    }
    silder(e){
        this.setState({
            silderValue: e.target.value
        }, () => console.log(this.state.silderValue))
    }

/* Like, Lighten, Saved Posts Handler but likes all the posts on clicking one/ update the states of all the posts instead of just the post liked, so not currently in use */
    clickedLike(){
        this.setState({isLiked: ! this.state.isLiked});
    }
    clickedSave(){
        this.setState({isSaved: ! this.state.isSaved});
    }
    clickedLighten(){
        this.setState({isLighten: ! this.state.isLighten});
    }
    handleRadioClick(index, e){

        let indexOfPost= new String(index);
        
        //updating the state array selectedOptions onChange event on radioButton
        const { selectedOptions } = this.state;
        selectedOptions.splice(index, 1, e.target.value);
        this.setState({ selectedOptions: [...selectedOptions] });
        
        //If-Else statement for different behaviour on correct answer and incorrect answer      
        if (e.target.value == this.state.correctOptions[index]){
            this.setState({correctMCQs:[...this.state.correctMCQs, this.state.responseData[index]._id.$oid]}, () => console.log(this.state.correctMCQs));
        }else{

            //putting the _id.$oid of the post inCorrectMCQs state array so as to display the post on incorrect answer
            this.setState({inCorrectMCQs:[...this.state.inCorrectMCQs, this.state.responseData[index]._id.$oid]}, () => {
            

            // array of all the elements by the passed names as now a extra post is created as the user's answer is false this arrays will also be updated from the arrays that were found in componentDidMount() stage
            var allMenuListVisible = document.getElementsByName('menuListName');
            var allPreviousNextWindow = document.getElementsByName('previousNextWindowName');

            console.log(this.state.inCorrectMCQs, allMenuListVisible);

            //setting the image src of the image element to display the post (IF THE USER'S ANSWER IS INCORRECT)
            let img = document.getElementById(indexOfPost);
            let imgName= this.state.responseData[index].background;
            img.src= require('../../assets/postBackgroundImages/'+ imgName);

            //setting the id for the menuList to make it visible and invisible onMouseLeve event on the Post (IF THE USER'S ANSWER IS INCORRECT)
            var menuList= allMenuListVisible[index];
            var idValue="idMenuListVisible"+String(index);
            menuList.id=idValue;
        
            //setting the id for the previousNextWindow to make it visible and invisible onMouseLeve event on the footer of the post (IF THE USER'S ANSWER IS INCORRECT)
            var PN_window_list= allPreviousNextWindow[index];
            var idValueOfWindow="idPreviousNextWindow"+String(index);
            PN_window_list.id=idValueOfWindow;

            /* This code updates 3 states of arrays which contains whether a post is liked, lighten or saved or not, if its lighten it passes a boolean true to mark the icon/checkbox checked*/
            let likeStateList= this.state.likeState;
            if (this.state.responseData[index].liked !== true){
                likeStateList.splice(index, 0, false);
            }else{
                likeStateList.splice(index, 0, true);
            }
            let lightStateList= this.state.lightState;
            if (this.state.responseData[index].lighten !== true){
                lightStateList.splice(index, 0, false);
            }else{
                lightStateList.splice(index, 0, true);
            }
            let saveStateList= this.state.saveState;
            if (this.state.responseData[index].saved !== true){
                saveStateList.splice(index, 0, false);
            }else{
                saveStateList.splice(index, 0, true);
            }

        }
        );
      }
    }

    viewPost(e, index, oid){
        this.setState({correctMCQs: this.state.listOfLikedPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, () => {
            
            //putting the _id.$oid of the post inCorrectMCQs state array so as to display the post on incorrect answer
            this.setState({inCorrectMCQs:[...this.state.inCorrectMCQs, this.state.responseData[index]._id.$oid]}, () => {
                let indexOfPost= new String(index);
            
                
                // array of all the elements by the passed names as now a extra post is created as the user's answer is false this arrays will also be updated from the arrays that were found in componentDidMount() stage
                var allMenuListVisible = document.getElementsByName('menuListName');
                var allPreviousNextWindow = document.getElementsByName('previousNextWindowName');

                console.log(this.state.inCorrectMCQs, allMenuListVisible);


                //setting the image src of the image element to display the post (IF THE USER'S ANSWER IS INCORRECT)
                let img = document.getElementById(indexOfPost);
                let imgName= this.state.responseData[index].background;
                img.src= require('../../assets/postBackgroundImages/'+ imgName);
                
                
                //setting the id for the menuList to make it visible and invisible onMouseLeve event on the Post (IF THE USER'S ANSWER IS INCORRECT)
                var menuList= allMenuListVisible[index];
                var idValue="idMenuListVisible"+String(index);
                menuList.id=idValue;
            
                //setting the id for the previousNextWindow to make it visible and invisible onMouseLeve event on the footer of the post (IF THE USER'S ANSWER IS INCORRECT)
                var PN_window_list= allPreviousNextWindow[index];
                var idValueOfWindow="idPreviousNextWindow"+String(index);
                PN_window_list.id=idValueOfWindow;
    
                /* This code updates 3 states of arrays which contains whether a post is liked, lighten or saved or not, if its lighten it passes a boolean true to mark the icon/checkbox checked*/
                let likeStateList= this.state.likeState;
                if (this.state.responseData[index].liked !== true){
                    likeStateList.splice(index, 0, false);
                }else{
                    likeStateList.splice(index, 0, true);
                }
                let lightStateList= this.state.lightState;
                if (this.state.responseData[index].lighten !== true){
                    lightStateList.splice(index, 0, false);
                }else{
                    lightStateList.splice(index, 0, true);
                }
                let saveStateList= this.state.saveState;
                if (this.state.responseData[index].saved !== true){
                    saveStateList.splice(index, 0, false);
                }else{
                    saveStateList.splice(index, 0, true);
                }

            });
        });
    }

    componentDidMount() {
        const headers = { "Content-Type": "application/json" };
        axios.post('http://127.0.0.1:8103/api/display_posts', { 'username' : localStorage.getItem('username')}, {headers})
            .then(res => {      
                
                const responseData= res.data;
                console.log("res",res);
                console.log("responseData",responseData);

                this.setState({responseData}, ()=>{
                    let lengthOfResponseData= this.state.responseData.length;
                    let arrayForSelectedOptions= new Array(lengthOfResponseData).fill('');
                    this.setState({selectedOptions: arrayForSelectedOptions})
                })
                
               
                var allMenuListVisible = document.getElementsByName('menuListName');
                var allPreviousNextWindow = document.getElementsByName('previousNextWindowName');

                
                
                
                
                
                for (let i = 0; i < this.state.responseData.length; i++) {
                var indexOfPost=new String(i);

                //making a array state of all the correct answers for all the posts to match with the selected radio option to decide whether it is correct or not
                this.setState({correctOptions: [...this.state.correctOptions, this.state.responseData[i].mcq1Options[0]]});


                //shuffling all the options for a mcq in mcq1Options array
                var array = this.state.responseData[i].mcq1Options;
                var m = array.length, yo, t;

                // While there remain elements to shuffle…
                while (m) {
                    // Pick a remaining element…
                    yo = Math.floor(Math.random() * m--);
                
                    // And swap it with the current element.
                    t = array[m];
                    array[m] = array[yo];
                    array[yo] = t;
                  }
                //changing and recreating the responseData state array after shuffling the mcq1Options array
                let items=[...this.state.responseData];
                let item={...items[i]};
                item.mcq1Options=array;
                items[i]=item
                this.setState({responseData : items});


                //code for the posts only if it has a score of greater than or equal to 7
                if (this.state.responseData[i].points>=7 ){

                //setting the image src of the image element to display the post
                let img = document.getElementById(indexOfPost);
                let imgName= this.state.responseData[i].background;
                img.src= require('../../assets/postBackgroundImages/'+ imgName);

                
                //setting the id for the menuList to make it visible and invisible onMouseLeve event on the Post
                let menuList= allMenuListVisible[i];
                let idValue="idMenuListVisible"+String(i);
                menuList.id=idValue;
                
                //setting the id for the previousNextWindow to make it visible and invisible onMouseLeve event on the footer of the post
                let PN_window_list= allPreviousNextWindow[i];
                let idValueOfWindow="idPreviousNextWindow"+String(i);
                PN_window_list.id=idValueOfWindow;

                
                
                /* This code creates 3 states of lists which contains whether a post is liked, lighten or saved or not, if its lighten it passes a boolean true to mark the icon/checkbox checked*/
                let likeStateList= this.state.likeState;
                if (this.state.responseData[i].liked !== true){
                    likeStateList.push(false);
                }else{
                    likeStateList.push(true);
                }
                let lightStateList= this.state.lightState;
                if (this.state.responseData[i].lighten !== true){
                    lightStateList.push(false);
                }else{
                    lightStateList.push(true);
                }
                let saveStateList= this.state.saveState;
                if (this.state.responseData[i].saved !== true){
                    saveStateList.push(false);
                }else{
                    saveStateList.push(true);
                }
                }
            }
                
            })
            .catch(
                (error) => console.log(error)
            )

            /*sending a list of likes, lightens, and saved posts oid every 15 sec*/
            setInterval(()=> {
                axios.post('http://127.0.0.1:8103/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : this.state.listOfLikedPosts, 'lighten' : this.state.listOfLightenPosts, 'savedPosts' : this.state.listOfSavedPosts })
                .catch(
                    (error) => console.log(error)
                )
            }, 15000);
    }

   /* const img = document.createElement("img");
    var imgName= this.state.responseData[i].background;
    img.src= require('../../assets/postBackgroundImages/'+ imgName);
    document.getElementById('imageLocation').append(img);*/
render(){

        return(
            <>
        {this.state.responseData.map((responseData, index) =>
        <div className={style.postTypeDecider} key={index}> 
        {(() =>{ if (responseData.points >=7 || this.state.inCorrectMCQs.includes(responseData._id.$oid)) {
                               
                return <div className={style.postCardContainer} key={index}  onMouseLeave={() => xyz(index)}>
                {/* If the points for a particular post is equal to or greater than 7 then the post will be of PostCard type */}
                    
                    <form id="postInteraction">
                        <div className={style.postHeader} id="postHeader">
                            <div className={style.postMetaData}>
                               <p className={style.subject} >{responseData.subject}</p>
                               <span className={style.topic}  ><a href=""> {responseData.topic} </a></span><BsArrowRightShort/>
                               <span className={style.subTopic} ><a href=""> {responseData.subtopic}</a></span>
                            </div>
                            <div className={style.integritySlider}><input type="range" value={this.state.silderValue} min="0" step="1" max="2" onChange={this.slider}/></div>
                            <div>{(() => {
                                if (responseData.accuracy>= 0.75) {
                                    return (
                                    <img className={style.accuracyIcon} src={correct}/>
                                    )
                                    } else if (responseData.accuracy< 0.75 && responseData.accuracy> 0.25) {
                                    return (
                                    <img className={style.accuracyIcon} src={semicorrect}/>
                                    )
                                    } else {
                                    return (
                                    <img className={style.accuracyIcon} src={incorrect}/>
                                    )
                                    }
                                    })()}</div>
                                
                                <div className={style.menuIcon}>
                                    <div className={style.menuList}  onClick={() => abc(index)}><BsThreeDotsVertical size={20} cursor={"pointer"}/></div>
                            </div>
                        </div>

                        <div className={style.postImg} onDoubleClick={this.clickedLike}  id="imageLocation">
                            <div name="menuListName" className={style.menuListVisible} >
                                <div>Not Interested</div>
                                <div>Show Often</div>
                                <div>Prerequisite</div>
                                <div>Tags</div>
                                <div>Glossaries</div>
                            </div>

                            
                            <span className={style.quesFactBlock}>{responseData.question ? <p className={style.question}>{responseData.question}</p> : ""} <p className={style.fact}>{responseData.fact}</p></span>


                            <img id={index}  className={style.backgroundImage} />  

                            <span name="previousNextWindowName" className={style.previousNextWindow} onMouseOver={() => viewPreviousNextPost(index)}><BsArrowLeft size={22} cursor={"pointer"}/>  <BsArrowRight size={22} cursor={"pointer"}/></span>     
                        </div>

                        <div className={style.postFooter} onMouseLeave={() => viewPreviousNextPostOff(index)}>
                            <span > <FormControlLabel
                            control={

                              <Checkbox 
                                checked={responseData.liked ? responseData.liked : this.state.likeState[index]}
                                icon={ <FavoriteBorder style={{ fontSize: 26 }} /> } 
                                checkedIcon={ <Favorite style={{ fontSize: 26 }}/> }
                                name="likedPost" 
                                onChange={() => {this.setState(update(this.state, {
                                    likeState:{
                                        [index]: {
                                            $set: !this.state.likeState[index]
                                        }
                                    }
                                }
                                ), ()=> {
                                    if (this.state.likeState[index] === true){
                                        this.setState({listOfLikedPosts:[...this.state.listOfLikedPosts, this.state.responseData[index]._id.$oid]}, ()=>
                                    console.log("liked successfully", this.state.listOfLikedPosts, this.state.responseData[index]._id.$oid))
                                    } else{
                                        this.setState({listOfLikedPosts: this.state.listOfLikedPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, ()=>
                                        console.log("unliked successfully", this.state.listOfLikedPosts, this.state.responseData[index]._id.$oid))
                                    }
                                }
                                );
                                
                            
                            }}
                              />
                                    }

                            /></span>

                            <span> 
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                    checked={responseData.lighten ? responseData.lighten : this.state.lightState[index]}
                                    icon={ <EmojiObjectsOutlined style={{ fontSize: 26 }}/> } 
                                    checkedIcon={ <EmojiObjects style={{ fontSize: 26, color: 'yellow' }} />}
                                    name="lightPost"
                                    onChange={() => {this.setState(update(this.state, {
                                        lightState:{
                                            [index]: {
                                                $set: !this.state.lightState[index]
                                            }
                                        }
                                    }
                                    ), ()=> {
                                        if (this.state.lightState[index] === true){
                                            this.setState({listOfLightenPosts:[...this.state.listOfLightenPosts, this.state.responseData[index]._id.$oid]}, ()=>
                                        console.log("interesting", this.state.listOfLightenPosts, this.state.responseData[index]._id.$oid))
                                        } else{
                                            this.setState({listOfLightenPosts: this.state.listOfLightenPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, ()=>
                                            console.log("not interesting", this.state.listOfLightenPosts, this.state.responseData[index]._id.$oid))
                                        }
                                    });
                                    }}
                                   
                                    />
                                    }
                                />
                            </span>

                            <button className={style.readMoreBtn} >Read More</button>
                            
                            <span> <FormControlLabel 
                            checked={responseData.saved ? responseData.saved : this.state.saveState[index]}
                            control={<Checkbox 
                                icon={<BookmarkBorder 
                                    style={{ fontSize: 26 }}/>} 
                            checkedIcon={<Bookmark style={{ fontSize: 26, color: 'black'}}/>}
                            name="savedPost"
                            onChange={() => {this.setState(update(this.state, {
                                saveState:{
                                    [index]: {
                                        $set: !this.state.saveState[index]
                                    }
                                }
                            }
                            ), ()=>{
                                if (this.state.saveState[index] === true){
                                    this.setState({listOfSavedPosts:[...this.state.listOfSavedPosts, this.state.responseData[index]._id.$oid]}, ()=>
                                console.log("saved successfully", this.state.listOfSavedPosts, this.state.responseData[index]._id.$oid))
                                } else{
                                    this.setState({listOfSavedPosts: this.state.listOfSavedPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, ()=>
                                    console.log("unsaved successfully", this.state.listOfSavedPosts, this.state.responseData[index]._id.$oid))
                                }
                            });
                        }}
                           
                            />
                        }
                            /> </span>

                            <span className={style.viewPreviousNextPost} onMouseOver={() => viewPreviousNextPost(index)} ><SwapHorizOutlined style={{ fontSize: 30 }}/></span>
                            
                        </div>
                        
                    </form>
                    </div>

        }else if (this.state.correctMCQs.includes(responseData._id.$oid)){
            return <div className={style.correctGesture}>
                <p>You're absolutely Correct</p>
            <button className={style.readMoreBtn} onClick={(e) => {this.viewPost(e, index, responseData._id.$oid)}} >View Post</button>
            </div>
        }else{
                    
                   return <div className={style.postMCQ}>
                    {/* If the points for a particular post is equal to or lower than 6 then the post will be of MCQ type */}
                        
                        <FormControl>
                        <div className={style.mcqQuestion}>{responseData.mcq1}</div>
                        
                        <div className={style.mcqOptions}>

                        <RadioGroup
                        key={index}
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={this.state.selectedOptions[index]}
                            onChange={(e) => { this.handleRadioClick(index, e) }}
                            name={responseData.question}
                            >

                            {responseData.mcq1Options[0] ? <FormControlLabel value={responseData.mcq1Options[0]} control={<Radio />} label={responseData.mcq1Options[0]} /> : ""}
                            {responseData.mcq1Options[1] ? <FormControlLabel value={responseData.mcq1Options[1]} control={<Radio />} label={responseData.mcq1Options[1]} /> : ""}
                            {responseData.mcq1Options[2] ? <FormControlLabel value={responseData.mcq1Options[2]} control={<Radio />} label={responseData.mcq1Options[2]} /> : ""}
                            {responseData.mcq1Options[3] ? <FormControlLabel value={responseData.mcq1Options[3]} control={<Radio />} label={responseData.mcq1Options[3]} /> : ""}  

                        </RadioGroup>
                        </div>
                    </FormControl>
                    </div>
                    

        }   
                } )()}
                    </div>
          
          )

        }
        {/*STATIC POSTS OF HOMEPAGE
                    <div className={style.postCardContainer}>
                        <div className={style.postHeader} id="postHeader">
                            <div>
                               <p className={style.subject}>Science</p>
                               <span className={style.topic}><a href=""> Organic Chemistry </a></span><BsArrowRightShort/>
                               <span className={style.subTopic}><a href=""> Alkenes </a></span>
                            </div>
                            <div className={style.menuIcon}>
                               <div className={style.menuList}><BsThreeDotsVertical/></div>
                            </div>
                        </div>
                        <div className={style.postImg} onDoubleClick={this.clickedLike}> 
                            <img src={infographic}/>       
                        </div>

                        <div className={style.postFooter}>
                        <span onClick={this.clickedLike}>{this.state.isLiked ? <BsHeartFill size={20}/> : <BsHeart size={20}/>}</span>
                            <span onClick={this.clickedSave}>{this.state.isSaved?<BsBookmarkHeartFill size={20}/> : <BsBookmarkHeart size={20}/>} </span>
                            <button className={style.readMoreBtn}>Read More</button>
                            <span onClick={this.clickedLighten}>{this.state.isLighten ? <BsLightbulbFill size={20}/> : <BsLightbulb size={20}/>}</span>
                            <BsArrowLeftRight size={20}/>
                        </div>
                    </div>

                    <div className={style.postCardContainer}>
                        <div className={style.postHeader} id="postHeader">
                            <div>
                               <p className={style.subject}>Other</p>
                               <span className={style.topic}><a href=""> Quotes </a></span><BsArrowRightShort/>
                               <span className={style.subTopic}><a href=""> Motivation </a></span>
                            </div>
                            <div className={style.menuIcon}>
                               <div className={style.menuList}><BsThreeDotsVertical/></div>
                            </div>
                        </div>
                        <div className={style.postImg} onDoubleClick={this.clickedLike}> 
                            <img src={infographic2}/>       
                        </div>

                        <div className={style.postFooter}>
                            <span onClick={this.clickedLike}>{this.state.isLiked ? <BsHeartFill/> : <BsHeart/>}</span>
                            <span onClick={this.clickedSave}>{this.state.isSaved?<BsBookmarkHeartFill/> : <BsBookmarkHeart/>} </span>
                            <button className={style.readMoreBtn}>Read More</button>
                            <span onClick={this.clickedLighten}>{this.state.isLighten ? <BsLightbulbFill/> : <BsLightbulb/>}</span>
                            <BsArrowLeftRight />
                        </div>
                    </div>
                */}

            </>
        );
    }
}
export default NewsFeed