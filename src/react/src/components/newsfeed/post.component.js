import axios from "axios";
import React, { Component } from "react";
import style from './newsfeed.module.css';

//icons & mui components
import {BsArrowLeft,BsArrowRight, BsArrowRightShort, BsPlus, BsThreeDotsVertical} from 'react-icons/bs'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Favorite, Bookmark, FavoriteBorder, BookmarkBorder, SwapHorizOutlined, EmojiObjectsOutlined, EmojiObjects, FilterCenterFocusRounded, PlusOne, Add} from '@material-ui/icons';
import {Button, IconButton, Tooltip} from "@material-ui/core";

//images
import correct from './correctBGicon.png';
import semicorrect from './semicorrectBGicon.png';
import incorrect from './incorrectBGicon.png';
import { Link } from "react-router-dom";

class IndividualPost extends Component{
    constructor(props){
        super(props);
        this.state ={
            responseData: [],
            id: this.props.id,
            lightState : false,
            likeState: false,
            saveState: false
        }
    }

    hideBackgroundImage(imgId){
        document.getElementById('factId1').style.display="block";
        document.getElementById(imgId).style.opacity=0.12;
        if(this.state.responseData[0].question){
            let allTheQuestion = document.getElementsByName('questionOfPost');
            allTheQuestion[0].style.display='block';
        }
    }
    showBackgroundImage(imgId){
        document.getElementById('factId1').style.display="none";
        document.getElementById(imgId).style.opacity=1;
        if(this.state.responseData[0].question){
            let allTheQuestion = document.getElementsByName('questionOfPost');
            allTheQuestion[0].style.display='none';
        }
    }
    hidePreviousNextPostWindow(){
        document.getElementById('idPreviousNextWindow1').style.display="none";
    }
    viewPreviousNextPostWindow(){
        document.getElementById('idPreviousNextWindow1').style.display="block";
    }
    hideMoreOptions(){
        document.getElementById('idMenuListVisible1').style.display="none";
    }
    viewMoreOptions(){
        document.getElementById('idMenuListVisible1').style.display="block";
    }
    slider(event){
        this.setState({silderValue: event.target.value})
    }
    postLiked(){
        this.setState({likeState: !this.state.likeState});
        var idOfThePost = this.state.id;
        axios.post('http://127.0.0.1:8103/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : [idOfThePost], 'lighten': [], savedPosts: []})
        .then(() =>{
            const responseData= this.state.responseData[0];
            if (this.state.likeState == true){
                responseData.totalLikes = responseData.totalLikes + 1;
            }
            else{
                responseData.totalLikes = responseData.totalLikes - 1;
            }
            this.setState(responseData);
        })
        .catch(
            (error) => console.log(error)
        )
    }
    postLighten(){
        this.setState({lightState: !this.state.lightState});
        var idOfThePost = this.state.id;
        axios.post('http://127.0.0.1:8103/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : [], 'lighten': [idOfThePost], savedPosts: []})
        .then(() =>{
            const responseData= this.state.responseData[0];
            if (this.state.lightState == true){
                responseData.totalLights = responseData.totalLights + 1;
            }
            else{
                responseData.totalLights = responseData.totalLights - 1;
            }
            this.setState(responseData);
        })
        .catch(
            (error) => console.log(error)
        )
    }
    postSaved(){
        this.setState({saveState: !this.state.saveState});
        var idOfThePost = this.state.id;
        axios.post('http://127.0.0.1:8103/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : [], 'lighten': [], savedPosts: [idOfThePost]})
        .then(() =>{
            const responseData= this.state.responseData[0];
            if (this.state.saveState == true){
                responseData.totalSaves = responseData.totalSaves + 1;
            }
            else{
                responseData.totalSaves = responseData.totalSaves - 1;
            }
            this.setState(responseData);
        })
        .catch(
            (error) => console.log(error)
        )
    }
    deletePost(postId){
        axios.delete('http://127.0.0.1:8103/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data==true){
                axios.post('http://127.0.0.1:8103/api/db_delete_post', { 'username' : localStorage.getItem('username'), id: postId})
                .then(() => this.setState({responseData: []}))
                .catch((error) => console.log(error))
            }
        })
        .catch(err => console.log(err))
    }
    notInterested(postTopic){
        axios.post('http://127.0.0.1:8103/api/add_not_interested_topic', { 'username' : localStorage.getItem('username'), 'topic': postTopic})
        .then(() => {
            const uninterestedAcknowledgeMessage = postTopic + ' is marked as uninterested topic!'
            alert(uninterestedAcknowledgeMessage)})
        .catch(err => console.log(err))
    }
    showOften(postId){
        axios.post('http://127.0.0.1:8103/api/show_often', { 'username' : localStorage.getItem('username'), 'id': postId})
        .catch(err => console.log(err))
    }

    componentDidMount(){
        axios.post('http://127.0.0.1:8103/api/db_get_particular_post', {username: localStorage.getItem('username') , id: this.state.id})
        .then(res => {
            let responseData = Array(res.data);
            this.setState({responseData : responseData})
        })
        .catch(err => console.log(err))
    }
    fetchPreviousPost(){
        axios.post('http://127.0.0.1:8103/api/db_get_particular_post', {username: localStorage.getItem('username'), id: this.state.responseData[0].previousPost[0].$oid})
        .then((res) => {
            let responseData = Array(res.data);
            this.setState({responseData : responseData})
        })
        .catch(err => console.log(err))
    }
    fetchNextPost(){
        axios.post('http://127.0.0.1:8103/api/db_get_particular_post', {username: localStorage.getItem('username'), id: this.state.responseData[0].nextPost[0].$oid})
        .then((res) => {
            let responseData = Array(res.data);
            this.setState({responseData : responseData})
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <>
            {this.state.responseData.map((responseData, index) =>
             
            <div className={style.postCardContainer} key={index} onMouseLeave={() => {this.hideMoreOptions(); this.hidePreviousNextPostWindow()}}>
                {/* If the points for a particular post is equal to or greater than 7 then the post will be of PostCard type */}
                    
                    <form id="postInteraction">
                        <div className={style.postHeader} id="postHeader">
                            <div className={style.postMetaData}>
                                <p className={style.subject}>
                                    {responseData.subject} 
                                </p>
                                <p>
                                    <span className={style.topic}> <Link to={'/topic/'.concat(responseData.topic)}> {responseData.topic} </Link> </span>
                                    <BsArrowRightShort/> 
                                    <span className={style.subTopic}> <Link to={'/topic/'.concat(responseData.subtopic)}> {responseData.subtopic} </Link> </span>
                                </p> 
                            </div>

                            <Tooltip title="Intrigrity Slider"><div className={style.integritySlider}> <input type="range" aria-label="Intrigrity Slider" value={this.state.silderValue} min="0" step="1" max="2" onChange={(event) => this.slider(event)}/></div></Tooltip>
                            
                            <div className={style.menuIcon}>
                                <div className={style.menuList}  onClick={() => this.viewMoreOptions()}><BsThreeDotsVertical size={20} cursor={"pointer"}/></div>
                            </div>

                            <div className={style.intrigrityMarker}>{(() => {
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
                                
                                
                        </div>
    
                        <div className={style.postImg} onDoubleClick={() => this.postLiked()}  id="imageLocation">
                            {responseData.username==localStorage.getItem('username') ?
                            
                            <div name="menuListName" id='idMenuListVisible1' className={style.menuListVisible} >
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => {this.notInterested(responseData.topic); this.hideMoreOptions();}}>Not Interested</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => {this.showOften(responseData.postId.$oid); this.hideMoreOptions();}}>Show Often</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Prerequisite</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Hashtags</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Glossaries</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Read More</Button></div>
                                <div className="d-flex justify-content-around"><span><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => this.deletePost(responseData.postId.$oid)}><Add style={{fontSize: 'medium'}} /> Previous</Button></span><span><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => this.deletePost(responseData.postId.$oid)}>Next <Add style={{fontSize: 'medium'}} /></Button></span></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => {this.deletePost(responseData.postId.$oid); this.hideMoreOptions();}}>Delete Post</Button></div>
                            </div>

                            :

                            <div name="menuListName" id='idMenuListVisible1' className={style.menuListVisible} >
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => {this.notInterested(responseData.topic); this.hideMoreOptions();}}>Not Interested</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}} onClick={() => {this.showOften(responseData.postId.$oid); this.hideMoreOptions();}}>Show Often</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Prerequisite</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Hashtags</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Glossaries</Button></div>
                                <div><Button className={style.menuListButtons} style={{fontFamily: 'poppins', color: 'white', padding: '0.2em'}}>Read More</Button></div>
                            
                            </div>

                            }

                           
                            <span className={style.quesFactBlock} ref={this.referenceToPostQuestion}>
                                {responseData.question ? <p name="questionOfPost" className={style.question}>{responseData.question}</p> : ""} 
                                <p className={style.fact} id='factId1' name="factName" ref={this.referenceToPostFact}> {responseData.fact.split('\n').map(function(item) {
                                    return (
                                        <span>
                                            {item}
                                            <br/>
                                        </span>
                                        )
                                    })}
                                </p>
                            </span>

                            <img id={responseData.background} src={require('../../assets/postBackgroundImages/'+ responseData.background)} className={style.backgroundImage} />

                            <span name="previousNextWindowName" id="idPreviousNextWindow1" className={style.previousNextWindow} onMouseOver={() => this.viewPreviousNextPostWindow()}>
                                <IconButton onClick={() => this.fetchPreviousPost()}>
                                    <BsArrowLeft size={22} cursor="pointer"/>
                                </IconButton> 
                                <IconButton onClick={() => this.fetchNextPost()}>
                                    <BsArrowRight size={22} cursor="pointer"/>
                                </IconButton>
                            </span> 
                            
                            <Tooltip title="View Background" > 
                                <FormControlLabel
                                    className={style.viewImageIcon}
                                    control={
                                    <Checkbox 
                                        checked={false}
                                        icon={ <FilterCenterFocusRounded /> } 
                                        checkedIcon={ <FilterCenterFocusRounded /> }
                                        name="viewBackground" 
                                        onMouseDownCapture={() => this.showBackgroundImage(responseData.background)} onMouseUpCapture={()=> this.hideBackgroundImage(responseData.background)}
                                    />
                                    }
                                /> 
                            </Tooltip>
                        </div>


                        <div className={style.postFooter}>
                            <div className={style.leftSectionFooter}>
                            <span className={style.engagement}>
                            <span className={style.engagementCount}>{responseData.totalLikes}</span>
                            <Tooltip title="Nice Explaination"> 
                                <FormControlLabel
                                    control={
                                    <Checkbox 
                                        checked={responseData.liked ? responseData.liked : this.state.likeState}
                                        icon={ <FavoriteBorder style={{ fontSize: 26 }} /> } 
                                        checkedIcon={ <Favorite style={{ fontSize: 26 }}/> }
                                        name="likedPost" 
                                        onChange={() => this.postLiked()}
                                    />
                                    }
                                /> 
                            </Tooltip>
                            </span>


                            <span className={style.engagement}>
                            <span className={style.engagementCount}>{responseData.totalLights}</span>
                            <Tooltip title="Insightful"> 
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                    checked={responseData.lighten ? responseData.lighten : this.state.lightState}
                                    icon={ <EmojiObjectsOutlined style={{ fontSize: 26 }}/> } 
                                    checkedIcon={ <EmojiObjects style={{ fontSize: 26, color: 'yellow' }} />}
                                    name="lightPost"
                                    onChange={() => this.postLighten()}
                                    />
                                    }
                                />
                            </Tooltip>
                            </span>
                            
                            
                            <span className={style.engagement}>
                            <span className={style.engagementCount}>{responseData.totalSaves}</span>
                            <Tooltip title="Save">  
                                <FormControlLabel 
                                    checked={responseData.saved ? responseData.saved : this.state.saveState}
                                    control={
                                        <Checkbox 
                                            icon={  <BookmarkBorder 
                                                    style={{ fontSize: 26 }}/>} 
                                            checkedIcon={<Bookmark style={{ fontSize: 26, color: 'black'}}/>}
                                            name="savedPost"
                                            onChange={() => this.postSaved()}
                                        />
                                    }
                                />
                            </Tooltip>
                            </span>
                            </div>

                            <div className={style.rightSectionFooter}>
                            <span className={style.viewPreviousNextPost} onClick={() => this.viewPreviousNextPostWindow()} onMouseUpCapture={() => this.hidePreviousNextPostWindow()} onMouseOver={() => this.viewPreviousNextPostWindow()} ><SwapHorizOutlined style={{ fontSize: 30 }}/></span>
                            </div>
                        </div>
                        
                    </form>
                    </div>
                    )}
            </>
        )
    }
}

export default IndividualPost