import React, { Component, useEffect, useRef } from "react";
import style from './newsfeed.module.css';

//icons & mui components
import {BsArrowLeft,BsArrowRight, BsArrowRightShort, BsPlus, BsThreeDotsVertical} from 'react-icons/bs'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Favorite, Bookmark, FavoriteBorder, BookmarkBorder, SwapHorizOutlined, EmojiObjectsOutlined, EmojiObjects, FilterCenterFocusRounded, PlusOne, Add, ArrowDropDown, ArrowDropDownCircle, ArrowDropDownCircleOutlined, ArrowDropUp} from '@material-ui/icons';
import {Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip} from "@material-ui/core";

//images
import correct from './correctBGicon.png';
import semicorrect from './semicorrectBGicon.png';
import incorrect from './incorrectBGicon.png';
import postNotFound from '../../../../react/src/assets/postNotFoundScreen.png';
import { Link, Redirect } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";
import ReactQuill from "react-quill";


function Fact(props){
    let quillRef = useRef();
    let modules = {
        syntax: true,
        toolbar: false
    }

    useEffect(() => {
        let data = JSON.parse(props.fact);
        console.log(data)
        quillRef.current.getEditor().setContents(data)
    }, [props.fact]);
    
    return(
        <ReactQuill ref={quillRef} theme='bubble' modules={modules} readOnly/>
    )

}


class IndividualPost extends Component{
    constructor(props){
        super(props);
        this.state ={
            responseData: [],
            id: this.props.id,
            createNewPost: false,
            dropDown: false
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
        var idOfThePost = this.state.id;
        AxiosBaseFile.post('/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : [idOfThePost], 'lighten': [], savedPosts: []})
        .then(() =>{
            const responseData= this.state.responseData[0];
            if (this.state.responseData[0].liked == true){
                responseData.totalLikes = responseData.totalLikes - 1;
            }
            else{
                responseData.totalLikes = responseData.totalLikes + 1;
            }
            responseData.liked = ! responseData.liked;
            this.setState(responseData);
        })
        .catch(
            (error) => console.log(error)
        )
    }
    postLighten(){
        var idOfThePost = this.state.id;
        AxiosBaseFile.post('/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : [], 'lighten': [idOfThePost], savedPosts: []})
        .then(() =>{
            const responseData= this.state.responseData[0];
            if (this.state.responseData[0].lighten == true){
                responseData.totalLights = responseData.totalLights - 1;
            }
            else{
                responseData.totalLights = responseData.totalLights + 1;
            }
            responseData.lighten = ! responseData.lighten;
            this.setState(responseData);
        })
        .catch(
            (error) => console.log(error)
        )
    }
    postSaved(){
        var idOfThePost = this.state.id;
        AxiosBaseFile.post('/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : [], 'lighten': [], savedPosts: [idOfThePost]})
        .then(() =>{
            const responseData= this.state.responseData[0];
            if (this.state.responseData[0].saved == true){
                responseData.totalSaves = responseData.totalSaves - 1;
            }
            else{
                responseData.totalSaves = responseData.totalSaves + 1;
            }
            responseData.saved = ! responseData.saved;
            this.setState(responseData);
        })
        .catch(
            (error) => console.log(error)
        )
    }
    deletePost(postId){
        AxiosBaseFile.delete('/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data==true){
                AxiosBaseFile.post('/api/db_delete_post', { 'username' : localStorage.getItem('username'), id: postId})
                .then(() => this.setState({responseData: []}))
                .catch((error) => console.log(error))
            }
        })
        .catch(err => console.log(err))
    }
    notInterested(postTopic){
        AxiosBaseFile.post('/api/add_not_interested_topic', { 'username' : localStorage.getItem('username'), 'topic': postTopic})
        .then(() => {
            const uninterestedAcknowledgeMessage = postTopic + ' is marked as uninterested topic!'
            alert(uninterestedAcknowledgeMessage)})
        .catch(err => console.log(err))
    }
    showOften(postId){
        AxiosBaseFile.post('/api/show_often', { 'username' : localStorage.getItem('username'), 'id': postId})
        .catch(err => console.log(err))
    }

    componentDidMount(){
        AxiosBaseFile.get('/api/db_get_particular_post', {params: {
            username: localStorage.getItem('username') , id: this.state.id
        }})
        .then(res => {
            let responseData = Array(res.data);
            this.setState({responseData : responseData});
            localStorage.setItem('id', this.state.id)
        })
        .catch(err => console.log(err))
    }
    fetchPreviousPost(){
        AxiosBaseFile.get('/api/db_get_particular_post', {params: {
            username: localStorage.getItem('username') , id: this.state.responseData[0].previousPost.$oid
        }})
        .then((res) => {
            let responseData = Array(res.data);
            this.setState({responseData : responseData, id : responseData[0]._id.$oid});
            localStorage.setItem('id', res.data._id.$oid);
        })
        .catch(err => console.log(err))
    }
    fetchNextPost(){
        AxiosBaseFile.get('/api/db_get_particular_post', {params: {
            username: localStorage.getItem('username') , id: this.state.responseData[0].nextPost.$oid
        }})
        .then((res) => {
            let responseData = Array(res.data);
            this.setState({responseData : responseData, id : responseData[0]._id.$oid});
            localStorage.setItem('id', res.data._id.$oid);
        })
        .catch(err => console.log(err))
    }
    addNextPost(){
        localStorage.setItem('subject', this.state.responseData[0].subject);
        localStorage.setItem('topic', this.state.responseData[0].topic);
        localStorage.setItem('subtopic', this.state.responseData[0].subtopic);
        localStorage.setItem('type', this.state.responseData[0].type);
        this.setState({createNewPost: true});
    }
    componentWillUnmount(){
        if (! this.state.createNewPost){
            localStorage.removeItem('id')
        }
    }
    render(){
        if (this.state.createNewPost){
            return <Redirect to="/createpost" />
        }
        return(
        <>
        {this.state.responseData.length > 0 ? 

            this.state.responseData.map((responseData, index) =>
             
                <div className={style.postCardContainerIndividual} key={index} onMouseLeave={() => {this.hideMoreOptions(); this.hidePreviousNextPostWindow()}}>
                {/* If the points for a particular post is equal to or greater than 7 then the post will be of PostCard type */}
                    
                    <form id="postInteraction">
                        <div className={style.postHeader} id="postHeader">

                            <div className={style.postMetaData}>
                                <p className={style.subject}>
                                <Link to={'/topic/'.concat(responseData.subject)} title={responseData.subject}>
                                    {(() => {
                                        if (responseData.subject.length >= 30){
                                            var subject = responseData.subject.match(/\b(\w)/g);
                                            var subject = subject.join('');
                                            return subject
                                        }
                                        else if (responseData.subject.length >= 26){
                                            var subject = responseData.subject.slice(0, 26);
                                            var subject = subject + "..";
                                            return subject
                                        }else{
                                            return responseData.subject
                                        }
                                    })()}
                                </Link>
                                </p>

                                <p>
                                    <span className={style.topic} > 
                                        <Link to={'/topic/'.concat(responseData.topic)} title={responseData.topic}>
                                        {(() => {
                                            if (responseData.topic.length >= 26){
                                                var topic = responseData.topic.match(/\b(\w)/g);
                                                var topic = topic.join('');
                                                return topic
                                            }
                                            else if (responseData.topic.length >= 13){
                                                var topic = responseData.topic.slice(0, 13);
                                                var topic = topic + "..";
                                                return topic
                                            }else{
                                                return responseData.topic
                                            }
                                        })()}
                                        </Link>
                                    </span>
                                    <BsArrowRightShort/> 
                                    <span className={style.subTopic}>
                                        <Link to={'/topic/'.concat(responseData.subtopic)} title={responseData.subtopic}>
                                        {(() => {
                                            if (responseData.subject.subtopic >= 26){
                                                var subtopic = responseData.subtopic.match(/\b(\w)/g);
                                                var subtopic = subtopic.join('');
                                                return subtopic
                                            }
                                            else if (responseData.subtopic.length >= 13){
                                                var subtopic = responseData.subtopic.slice(0, 13);
                                                var subtopic = subtopic + "..";
                                                return subtopic
                                            }else{
                                                return responseData.subtopic
                                            }
                                        })()}
                                        </Link>
                                    </span>
                                </p>
                            </div>

                            <Tooltip title="Intrigrity Slider"><div className={style.integritySlider}> <input type="range" aria-label="Intrigrity Slider" value={this.state.silderValue} min="0" step="1" max="2" onChange={(event) => this.slider(event)}/></div></Tooltip>
                            
                            <div className={style.menuIcon}>
                                <div className={style.menuList}  onClick={() => this.viewMoreOptions()}>
                                    <IconButton>
                                        <BsThreeDotsVertical size={20} cursor={"pointer"}/>
                                    </IconButton>
                                </div>
                            </div>

                            <div className={style.intrigrityMarker}>{(() => {
                                if (responseData.accuracy>= 0.75) {
                                    return (
                                    <img className={style.accuracyIcon} src='https://s3.ap-south-1.amazonaws.com/finemate.media/mainImages/correctBGicon.png' />
                                    )
                                    } else if (responseData.accuracy< 0.75 && responseData.accuracy> 0.25) {
                                    return (
                                    <img className={style.accuracyIcon} src='https://s3.ap-south-1.amazonaws.com/finemate.media/mainImages/semicorrectBGicon.png' />
                                    )
                                    } else {
                                    return (
                                    <img className={style.accuracyIcon} src='https://s3.ap-south-1.amazonaws.com/finemate.media/mainImages/incorrectBGicon.png' />
                                    )
                                    }
                                    })()}</div>
                                
                                
                        </div>
    
                        <div className={style.postImg} onDoubleClick={() => this.postLiked()}  id="imageLocation">

                            <div>{
                                (() => {
                                    let postNumber = responseData.listOfAllThePostIds.indexOf(responseData._id.$oid) + 1;
                                    let totalPostsInThread = responseData.listOfAllThePostIds.length;
                                    if (totalPostsInThread > 1){
                                        return(<span className={style.postCount}>
                                            {postNumber}/{totalPostsInThread}
                                        </span>
                                        ) 
                                    }
                                })()
                            }
                            </div>

                            {responseData.username==localStorage.getItem('username') ?
                            
                            <div name="menuListName" id='idMenuListVisible1' className={style.menuListVisible} >
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}} onClick={() => {this.notInterested(responseData.topic); this.hideMoreOptions();}}>Not Interested</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}} onClick={() => {this.showOften(responseData.postId.$oid); this.hideMoreOptions();}}>Show Often</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}}>Prerequisite</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}}>Read More</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}} onClick={(() => this.addNextPost())}>Add Next Post</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}} onClick={() => {this.deletePost(responseData.postId.$oid); this.hideMoreOptions();}}>Delete Post</Button></div>
                            </div>

                            :

                            <div name="menuListName" id='idMenuListVisible1' className={style.menuListVisible} >
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}} onClick={() => {this.notInterested(responseData.topic); this.hideMoreOptions();}}>Not Interested</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}} onClick={() => {this.showOften(responseData.postId.$oid); this.hideMoreOptions();}}>Show Often</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}}>Prerequisite</Button></div>
                                <div><Button style={{fontFamily: 'poppins', color: 'var(--pureWhite)', padding: '0.2em'}}>Read More</Button></div>
                            
                            </div>

                            }

                            <img id={responseData.background} src={'https://s3.ap-south-1.amazonaws.com/finemate.media/postBackgroundImages/'+ responseData.background} className={style.backgroundImage} />
                            <div id='factId1' className={style.quesFactBlock}>
                                <Fact fact={responseData.fact} />
                            </div>

                            <div name="previousNextWindowName" id="idPreviousNextWindow1" className={style.previousNextWindow} onMouseOver={() => this.viewPreviousNextPostWindow()}>
                                <IconButton style={{padding: '0.25em'}} onClick={() => this.fetchPreviousPost()}>
                                    <BsArrowLeft size={22} cursor="pointer"/>
                                </IconButton> 
                                <IconButton style={{padding: '0.25em'}} onClick={() => this.fetchNextPost()}>
                                    <BsArrowRight size={22} cursor="pointer"/>
                                </IconButton>
                            </div> 
                        </div>


                        <div className={style.postFooter}>
                            <div className={style.leftSectionFooter}>
                            <span className={style.engagement}>
                            <span className={style.engagementCount}>{responseData.totalLikes}</span>
                            <Tooltip title="Nice Explaination"> 
                                <FormControlLabel
                                    control={
                                    <Checkbox 
                                        style={{ padding: '0', marginLeft: '1em'}}
                                        checked={responseData.liked}
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
                                    style={{padding: '0', marginLeft: '1em'}}
                                    checked={responseData.lighten}
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
                                    control={
                                        <Checkbox
                                            checked={responseData.saved}
                                            style={{padding: '0', marginLeft: '1em'}}
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
                                <IconButton style={{marginTop: '-8px', marginRight: '-0.5em' }} onClick={() => this.viewPreviousNextPostWindow()} onMouseUpCapture={() => this.hidePreviousNextPostWindow()} onMouseOver={() => this.viewPreviousNextPostWindow()}>
                                    <SwapHorizOutlined style={{ fontSize: 32, color: '#746F70'}}/>
                                </IconButton>
                            </div>
                        </div>
                        <div className={style.postCredits} id='postCredits'>
                            <div>
                            <Link style={{textDecoration: "none", color: "grey"}} to={"/profile/".concat(responseData.username)}>
                                        <ListItem>
                                            {responseData.profilePicture ?
                                            <ListItemAvatar>
                                                <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/'+ responseData.profilePicture} alt="Profile" className={style.profilePictureChatHeader}/>
                                            </ListItemAvatar>
                                            :
                                            <ListItemAvatar>
                                                <Avatar> {responseData.username[0]} </Avatar>
                                            </ListItemAvatar>
                                            }
                                            
                                            <ListItemText style={{color: 'var(--pureWhite)'}}>
                                                {responseData.username}
                                            </ListItemText>
                                        </ListItem>
                                        </Link>
                            </div>
                            <div style={{fontSize: 'small', marginRight: '16px'}}>
                                {(responseData.creation_date_time.split(','))[0]}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {this.state.dropDown ? 
                                <IconButton className={style.dropBtn} style={{marginTop: '-30px'}} onClick={() => {document.getElementById('postCredits').style.display = 'none'; this.setState({dropDown: false})}}>
                                    <ArrowDropUp style={{fontSize: '1.25em', color: 'var(--pureWhite)'}} />
                                </IconButton>
                            :
                                <IconButton className={style.dropBtn} style={{marginTop: '-25px'}} onClick={() => {document.getElementById('postCredits').style.display = 'flex'; this.setState({dropDown: true})}}>
                                    <ArrowDropDown style={{fontSize: '1.25em'}} />
                                </IconButton>
                            }
                        </div>
                    </form>
                </div>
            )
        :
                <div className='d-flex justify-content-center'>
                    <img className={style.postNotFound} src='https://s3.ap-south-1.amazonaws.com/finemate.media/mainImages/postNotFoundScreen.png' alt='post not found' />
                </div>
        }
            </>
        )
    }
}

export default IndividualPost
