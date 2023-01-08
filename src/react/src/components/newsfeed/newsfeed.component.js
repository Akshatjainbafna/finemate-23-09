import React, { Component } from "react";
import update from 'react-addons-update';
import style from './newsfeed.module.css';
import {BsArrowLeft, BsArrowLeftRight, BsArrowRight, BsArrowRightShort, BsBookmarkHeart, BsBookmarkHeartFill, BsHeart, BsHeartFill, BsLightbulb, BsLightbulbFill, BsThreeDotsVertical} from 'react-icons/bs'
//import infographic from '../../../../react/src/assets/Screenshot_20180316-1849.png';
//import infographic2 from '../../../../react/src/assets/wp_ss_20170222_0003.png';
import correct from './correctBGicon.png';
import semicorrect from './semicorrectBGicon.png';
import incorrect from './incorrectBGicon.png';

//All the material UI imports
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Favorite, Bookmark, FavoriteBorder, BookmarkBorder, SwapHorizOutlined, EmojiObjectsOutlined, EmojiObjects, FilterCenterFocusRounded} from '@material-ui/icons';
import { FormControl, RadioGroup, Radio, Tooltip, Button, MenuItem, Menu, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";

function MenuList(props){
    const [anchorMenuList, setAnchorMenuList] = React.useState(null);
    const openMenuList = Boolean(anchorMenuList);
    
    function deletePost(){
        AxiosBaseFile.delete('/api/db_authorization_check', {headers: { "Authorization": localStorage.getItem('token')}})
        .then(res => {
            if (res.data==true){
                AxiosBaseFile.post('/api/db_delete_post', { 'username' : localStorage.getItem('username'), id: props.id})
                .then(() => {
                    window.location.reload(true);
                })
                .catch((error) => console.log(error))
            }
        })
        .catch(err => console.log(err))
    }
    function notInterested(){
        AxiosBaseFile.post('/api/add_not_interested_topic', { 'username' : localStorage.getItem('username'), 'topic': props.topic})
        .then(() => {
            const uninterestedAcknowledgeMessage = props.topic + ' is marked as uninterested topic!'
            alert(uninterestedAcknowledgeMessage)})
        .catch(err => console.log(err))
    }
    function showOften(){
        AxiosBaseFile.post('/api/show_often', { 'username' : localStorage.getItem('username'), 'id': props.id})
        .catch(err => console.log(err))
    }

    return(
        <>
        <IconButton
            aria-label='menu-list'
            id='userMenuList'
            aria-controls='long-menuList'
            aria-expanded={openMenuList ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(event) => setAnchorMenuList(event.currentTarget)}
        >
            <BsThreeDotsVertical size={20} cursor={"pointer"}/>
        </IconButton>

        <Menu
            id="long-menuList"
            MenuListProps={{
                'aria-labelledby': 'menu-list',
            }}
            anchorEl={anchorMenuList}
            open={openMenuList}
            onClose={() => setAnchorMenuList(null)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{
                style: {
                    width: '200px',
                    height: 'fit-content',
                    borderRadius: '10px',
                    backgroundColor: '#A78EC3',
                    boxShadow: '0px 2px 4px 2px rgba(0,0,0,0.2)',
                    padding: '0 10px',
                    color: 'whitesmoke',
                },
            }}
        >
        
            <MenuItem onClick={() => {setAnchorMenuList(null); notInterested()}}> Not Interested </MenuItem>
            <MenuItem onClick={() => {setAnchorMenuList(null); showOften()}}> Show Often </MenuItem>
            <MenuItem onClick={() => setAnchorMenuList(null)}> Prerequisite </MenuItem>
            <MenuItem onClick={() => setAnchorMenuList(null)}> Read More </MenuItem>
            {props.username == localStorage.getItem('username') ? <MenuItem  onClick={() => {setAnchorMenuList(null); deletePost()}}> Delete Post </MenuItem> : null }
                                
        </Menu>
        </>                     
    )
}

function PreviousNextWindow(props){
    const [anchorPrevNext, setAnchorPrevNext] = React.useState(null);
    const openPrevNext = Boolean(anchorPrevNext);

    function fetchPreviousPost(){
        setAnchorPrevNext(null);
        try{
            AxiosBaseFile.post('/api/db_get_particular_post', {username: localStorage.getItem('username'), id: props.previousId})
        .then((res) => {
            props.onUpdate(res.data);
        })
        .catch(err => console.log(err))
        }catch{
            console.log('No Previous Post.')
        }
    }
    function fetchNextPost(){
        setAnchorPrevNext(null);
        try{
            AxiosBaseFile.post('/api/db_get_particular_post', {username: localStorage.getItem('username'), id: props.nextId})
        .then((res) => {
            props.onUpdate(res.data);
        })
        .catch(err => console.log(err))
        }catch{
            console.log('No Next Post.')
        }
    }
    return (
        <>
        <IconButton
            aria-label="prevNext"
            id='previousNextPostIcon'
            aria-controls='prevNextWindow'
            aria-expanded={openPrevNext ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(event) => setAnchorPrevNext(event.currentTarget)}
            style={{
                marginTop: '-8px', marginRight: '-0.5em'
            }}
        >
            <SwapHorizOutlined style={{ fontSize: 30, color: '#746F70' }}/>
        </IconButton>
        <Menu
            id="prevNextWindow"
            MenuListProps={{
                'aria-labelledby': 'previousNextPostIcon',
            }}
            anchorEl={anchorPrevNext}
            open={openPrevNext}
            onClose={() => setAnchorPrevNext(null)}
            getContentAnchorEl={null || undefined}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
            PaperProps={{
                style: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    color: 'white',
                    backgroundColor: '#A78EC3',
                    borderRadius: '100px',
                    boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.2)',
                    padding: '0',
                    width: '75px'
                },
            }}
        >               
            <BsArrowLeft size={22} cursor='pointer' onClick={() => fetchPreviousPost()} />
            <BsArrowRight size={22} cursor='pointer' onClick={() => fetchNextPost()} />
        </Menu>

        </>
    )
}


class NewsFeed extends Component{
    constructor(props){
        super(props);
        this.state={ responseData: [], correctOptions: [], selectedOptions: [], correctMCQs:[], inCorrectMCQs: [], listOfLikedPosts:[], listOfLightenPosts:[], listOfSavedPosts:[]};
        this.slider=this.silder.bind(this);
        this.loadMorePosts = this.loadMorePosts.bind(this);
    }

    //event handler for slider
    silder(event){
        this.setState({
            silderValue: event.target.value
        })
    }

    showBackgroundImage(index, imgId){
        document.getElementById(index).style.display="none";
        document.getElementById(imgId).style.opacity=1;
        if(this.state.responseData[index].question){
            let allTheQuestion = document.getElementsByName('questionOfPost');
            for (let question = 0; question< allTheQuestion.length; question++){
                allTheQuestion[question].style.display='none';
            }
        }
    }
    hideBackgroundImage(index, imgId){
        document.getElementById(index).style.display="block";
        document.getElementById(imgId).style.opacity=0.12;
        let allTheQuestion = document.getElementsByName('questionOfPost');
            for (let question = 0; question< allTheQuestion.length; question++){
                allTheQuestion[question].style.display='block';
            }
    }

    postLiked(index){
        var currentPost = this.state.responseData[index];
        currentPost.liked = ! currentPost.liked;

        this.setState(update(this.state, {
            responseData:{
                [index]: {
                    $set: currentPost
                        }
                    }
                }
            ), ()=> {
                    if (currentPost.liked === true){
                        this.setState({listOfLikedPosts:[...this.state.listOfLikedPosts, this.state.responseData[index]._id.$oid]}, ()=>
                        console.log("liked successfully", this.state.responseData[index]._id.$oid))
                    } else{
                        this.setState({listOfLikedPosts: this.state.listOfLikedPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, ()=>
                        console.log("unliked successfully", this.state.responseData[index]._id.$oid))
                    }
                }
            );
    }

    postLighten(index){
        var currentPost = this.state.responseData[index];
        currentPost.lighten = ! currentPost.lighten;

        this.setState(update(this.state, {
            responseData:{
                [index]: {
                    $set: currentPost
                        }
                    }
                }
        ), ()=> {
            if (currentPost.lighten === true){
                this.setState({listOfLightenPosts:[...this.state.listOfLightenPosts, this.state.responseData[index]._id.$oid]}, ()=>
                console.log("interesting", this.state.responseData[index]._id.$oid))
            } else{
                this.setState({listOfLightenPosts: this.state.listOfLightenPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, ()=>
                console.log("not interesting", this.state.responseData[index]._id.$oid))
            }
        });
    }

    postSaved(index){
        var currentPost = this.state.responseData[index];
        currentPost.saved = ! currentPost.saved;

        this.setState(update(this.state, {
            responseData:{
                [index]: {
                    $set: currentPost
                }
            }
        }
        ), ()=>{
            if (currentPost.saved === true){
                this.setState({listOfSavedPosts:[...this.state.listOfSavedPosts, this.state.responseData[index]._id.$oid]}, ()=>
                console.log("saved successfully",  this.state.responseData[index]._id.$oid))
            } else{
                this.setState({listOfSavedPosts: this.state.listOfSavedPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, ()=>
                console.log("unsaved successfully",  this.state.responseData[index]._id.$oid))
            }
        });
   }


    //event handler for radio click mcq option onChange event storing the current selected options as well as performing the tasks for incorrect and correct answers
    handleRadioClick(index, e){

        //updating the state array selectedOptions onChange event on radioButton
        const { selectedOptions } = this.state;
        selectedOptions.splice(index, 1, e.target.value);
        this.setState({ selectedOptions: [...selectedOptions] });
        
        //If-Else statement for different behaviour on correct answer and incorrect answer      
        if (e.target.value == this.state.correctOptions[index]){
            this.setState({correctMCQs:[...this.state.correctMCQs, this.state.responseData[index]._id.$oid]}, () => {
                AxiosBaseFile.post('/api/mcq_response', { 'username' : localStorage.getItem('username'), 'idAdd': this.state.responseData[index]._id.$oid})
                .catch(
                    (error) => console.log(error)
                )
            });
        }else{
            //putting the _id.$oid of the post inCorrectMCQs state array so as to display the post on incorrect answer
            this.setState({inCorrectMCQs:[...this.state.inCorrectMCQs, this.state.responseData[index]._id.$oid]},  () => {

            AxiosBaseFile.post('/api/mcq_response', { 'username' : localStorage.getItem('username'), 'idSub': this.state.responseData[index]._id.$oid})
                .catch(
                    (error) => console.log(error)
                )
        }
        );

      }
    }

    //event handler for view post button on click
    viewPost(e, index){
        this.setState({correctMCQs: this.state.listOfLikedPosts.filter(item => item !==  this.state.responseData[index]._id.$oid)}, () => {
            
            //putting the _id.$oid of the post inCorrectMCQs state array so as to display the post on incorrect answer
            this.setState({inCorrectMCQs:[...this.state.inCorrectMCQs, this.state.responseData[index]._id.$oid]});
        });
    }
    onUpdate(data, index){
        if (data){
            let responseData =  this.state.responseData;
            data.points=10;
            responseData.splice(index, 1, data);
            this.setState({responseData: responseData})
        }
    }

    componentDidMount() {
        const headers = { "Content-Type": "application/json" };
        AxiosBaseFile.post('/api/display_posts', { 'username' : localStorage.getItem('username')}, {headers})
            .then(res => {

                const responseData= res.data;
                console.log(responseData)
                let m = responseData.length, yo, t;
                    // While there remain elements to shuffle…
                        while (m) {
                            // Pick a remaining element…
                            yo = Math.floor(Math.random() * m--);
                
                            // And swap it with the current element.
                            t = responseData[m];
                            responseData[m] = responseData[yo];
                            responseData[yo] = t;
                        }
                    //changing and recreating the responseData state array after shuffling the mcq1Options array
                    this.setState({responseData: responseData}, ()=>{
                        let lengthOfResponseData= this.state.responseData.length;
                        let arrayForSelectedOptions= Array(lengthOfResponseData).fill('');
                        this.setState({selectedOptions: arrayForSelectedOptions})
                    });
                
                //for loop to create some elemnts, attributes, updating array states manually
                for (let i = 0; i < this.state.responseData.length; i++) {
                    let indexOfPost = String(i);

                    //making a array state of all the correct answers for all the posts to match with the selected radio option to decide whether it is correct or not
                    let allTheCorrectOptions = this.state.correctOptions;
                    allTheCorrectOptions.push(this.state.responseData[i].mcq1Options[0]);
                    

                    //shuffling all the options for a mcq in mcq1Options array of the state.responseData object of the MCQ's[Posts with points less than 9]
                    if (this.state.responseData[i].points < 9 ){
                    let array = this.state.responseData[i].mcq1Options;
                    let m = array.length, yo, t;
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
                    }

                }

            })
            .catch(
                (error) => console.log(error)
            )

            /*sending a list of likes, lightens, and saved posts oid every 15 sec*/
            this.interactions = setInterval(()=> {
                AxiosBaseFile.post('/api/user_interactions', { 'username' : localStorage.getItem('username'), 'liked' : this.state.listOfLikedPosts, 'lighten' : this.state.listOfLightenPosts, 'savedPosts' : this.state.listOfSavedPosts })
                .then(() =>{
                    this.setState({listOfLikedPosts : []});
                    this.setState({listOfLightenPosts : []});
                    this.setState({listOfSavedPosts : []});
                })
                .catch(
                    (error) => console.log(error)
                )
            }, 15000);
    }
    componentWillUnmount(){
        clearInterval(this.interactions)
    }

   /* making an image element and passing the address+image_name in src attribute deprecated from 1-08-22
    const img = document.createElement("img");
    var imgName= this.state.responseData[i].background;
    img.src= require('../../assets/postBackgroundImages/'+ imgName);
    document.getElementById('imageLocation').append(img);*/


render(){
        return(
            <>
        {this.state.responseData.map((responseData, index) =>
        <div className={style.postTypeDecider} key={index}> 
        {(() =>{ if (responseData.points >= 9 || this.state.inCorrectMCQs.includes(responseData._id.$oid)) {
                               
                return <div className={style.postCardContainer} key={index}>
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

                            <Tooltip title="Intrigrity Slider">
                                <div className={style.integritySlider}> <input type="range" aria-label="Intrigrity Slider" value={this.state.silderValue} min="0" step="1" max="2" onChange={this.slider}/></div>
                            </Tooltip>
                            
                            <div className={style.menuIcon}>
                                <MenuList id={responseData._id.$oid} username={responseData.username} topic={responseData.topic} />
                            </div>

                            <div className={style.intrigrityMarker}>
                            
                                {(() => {
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
                                    })()}

                            </div>

                        </div>

                        <div className={style.postImg} onDoubleClick={() => {this.postLiked(index)}}  id="imageLocation">

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

                            <span className={style.quesFactBlock}>
                                {responseData.question ? <p name="questionOfPost" className={style.question}>{responseData.question}</p> : ""} 
                                <p className={style.fact} id={index}> {responseData.fact.split('\n').map(function(item, indexOfFactSpan) {
                                    return (
                                        <span key={indexOfFactSpan}>
                                            {item}
                                            <br/>
                                        </span>
                                        )
                                    })}
                                </p>
                            </span>

                            <img id={"backgroundImage"+String(index)} src={require('../../assets/postBackgroundImages/'+ responseData.background)} className={style.backgroundImage} alt='post' />
                            
                            <Tooltip title="View Background" > 
                                <FormControlLabel
                                    className={style.viewImageIcon}
                                    control={
                                    <Checkbox 
                                        checked={false}
                                        icon={ <FilterCenterFocusRounded /> } 
                                        checkedIcon={ <FilterCenterFocusRounded /> }
                                        name="viewBackground" 
                                        onClickCapture={() => this.showBackgroundImage(index, "backgroundImage"+String(index))} onMouseLeave={()=> this.hideBackgroundImage(index, "backgroundImage"+String(index))}
                                    />
                                    }
                                /> 
                            </Tooltip>
                        </div>


                        <div className={style.postFooter}>
                            <div className={style.leftSectionFooter}>
                            <span>
                            <Tooltip title="Nice Explaination"> 
                                <FormControlLabel
                                    className={style.likeFormControlLabel}
                                    control={
                                    <Checkbox 
                                        checked={responseData.liked}
                                        icon={ <FavoriteBorder style={{ fontSize: 26 }} /> } 
                                        checkedIcon={ <Favorite style={{ fontSize: 26 }} /> }
                                        name="likedPost"
                                        onChange={() => {this.postLiked(index)}}
                                    />
                                    }
                                /> 
                            </Tooltip>
                            </span>


                            <span>
                            <Tooltip title="Insightful"> 
                                <FormControlLabel
                                    className={style.insightfulFormControlLabel}
                                    control={
                                    <Checkbox
                                    checked={responseData.lighten}
                                    icon={ <EmojiObjectsOutlined style={{ fontSize: 26 }}/> } 
                                    checkedIcon={ <EmojiObjects style={{ fontSize: 26, color: 'yellow' }} />}
                                    name="lightPost"
                                    onChange={() => {this.postLighten(index)}}
                                    />
                                    }
                                />
                            </Tooltip>
                            </span>
                            
                            
                            <span>
                            <Tooltip title="Save">  
                                <FormControlLabel 
                                    className={style.saveFormControlLabel}
                                    control={
                                        <Checkbox 
                                            checked={responseData.saved}
                                            icon={  <BookmarkBorder style={{ fontSize: 26 }}/>  } 
                                            checkedIcon={  <Bookmark style={{ fontSize: 26, color: 'black'}}/>  }
                                            name="savedPost"
                                            onChange={() => {this.postSaved(index)}}
                                        />
                                    }
                                />
                            </Tooltip>
                            </span>
                            </div>

                            <div className={style.rightSectionFooter}>
                                <PreviousNextWindow previousId={responseData.previousPost.$oid} nextId={responseData.nextPost.$oid} onUpdate={(data) => this.onUpdate(data, index)} />
                            </div>
                        </div>
                        
                    </form>
                    </div>

        }else if (this.state.correctMCQs.includes(responseData._id.$oid)){
            return <div className={style.correctGesture}>
                <p>You're absolutely Correct</p>
            <button className={style.viewPostBtn} onClick={(e) => {this.viewPost(e, index)}} >View Post</button>
            </div>
        }else{
                    
                   return <div className={style.postMCQ}>
                    {/* If the points for a particular post is equal to or lower than 6 then the post will be of MCQ type */}
                        
                        <FormControl className={style.formcontrol}>
                        <div className={style.mcqQuestion}>{responseData.mcq1}</div>
                        
                        <div className={style.mcqOptions}>

                        <RadioGroup
                            key={index}
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={this.state.selectedOptions[index] ? this.state.selectedOptions[index] : null }
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
        <br />
        <br />
        <div className="d-flex justify-content-center">
            <Button style={{color: "#684096", border: "1px solid #A78EC3"}} onMouseOver={this.loadMorePosts} onClick={this.loadMorePosts}>Load More</Button>
        </div>
        <br />
        <br />
        <br />

            </>
        );
    }
    loadMorePosts(){
        var allThePosts = this.state.responseData;
        let lengthOfExistingResponseData = allThePosts.length;
        var idOfAllPosts=[];
        allThePosts.forEach((value, index, array) => { idOfAllPosts.push(allThePosts[index]._id.$oid)});

        AxiosBaseFile.post('/api/load_more_posts', { 'username' : localStorage.getItem('username'), 'allTheCurrentPosts' : idOfAllPosts}, { "Content-Type": "application/json" })
        .then(res=>{
            let newResponseData= res.data;

            let m = newResponseData.length, yo, t;
                    // While there remain elements to shuffle…
                        while (m) {
                            // Pick a remaining element…
                            yo = Math.floor(Math.random() * m--);
                
                            // And swap it with the current element.
                            t = newResponseData[m];
                            newResponseData[m] = newResponseData[yo];
                            newResponseData[yo] = t;
                        }

            let responseData = allThePosts.concat(newResponseData);

            //this is a boilerplate code which is also ruining in componentDidMount component lifecycle method so a function can be declared and called here and in componentdidmount method.
            this.setState({responseData: responseData}, ()=>{
                let lengthOfResponseData= this.state.responseData.length;
                let arrayForSelectedOptions= Array(lengthOfResponseData).fill('');
                this.setState({selectedOptions: arrayForSelectedOptions})
            })
            
            //for loop to create some elemnts, attributes, updating array states manually
            for (let i = lengthOfExistingResponseData; i < this.state.responseData.length; i++) {

                //making a array state of all the correct answers for all the posts to match with the selected radio option to decide whether it is correct or not
                let allTheCorrectOptions = this.state.correctOptions;
                allTheCorrectOptions.push(this.state.responseData[i].mcq1Options[0]);


                //shuffling all the options for a mcq in mcq1Options array of the state.responseData object of the MCQ's[Posts with points less than 7]
                if (this.state.responseData[i].points < 9 ){
                let array = this.state.responseData[i].mcq1Options;
                let m = array.length, yo, t;
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
                }

            }

        })
        .catch(
            (error) => console.log(error)
        )
    }
}
export default NewsFeed
