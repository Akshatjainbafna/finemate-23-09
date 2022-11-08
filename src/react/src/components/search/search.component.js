import { Avatar, Button, Dialog, DialogContent, DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";
import style from './search.module.css';

export default function SearchComponent(props){
    const [todoState, setTodoState] = useState(props.search);
    const [searchData, setSearchData] = useState([]);
    const [category, setCategory] = useState('People');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const redirectToProfile = useHistory();

    function search(event){
        if (category == 'People'){
            AxiosBaseFile.post('/api/db_search_user_profile', {'username': event.target.value, 'whoSearched' : localStorage.getItem('username')})
            .then(response => {
                if (response.data){
                    setSearchData(response.data);
                }
            })
            .catch(err => {
                console.log(err);
                setSearchData([]);
            })
        }
        if (category == 'Community'){
            AxiosBaseFile.post('/api/db_search_thread', {'title': event.target.value})
            .then(response => {
                if (response.data){
                    setSearchData(response.data)
                }
            })
            .catch(err => {
                console.log(err);
                setSearchData([]);
            })
        }
        if (category == 'Topic'){
            AxiosBaseFile.post('/api/db_search_posts_of_topic', {'topic': event.target.value})
            .then(response => {
                if (response.data){
                    console.log(response.data)
                    setSearchData(response.data)
                }
            })
            .catch(err => {
                console.log(err);
                setSearchData([]);
            })
        }
        if (category == 'Course'){
            AxiosBaseFile.post('/api/db_search_user_profile', {'username': event.target.value, 'whoSearched' : localStorage.getItem('username')})
            .then(response => {
                if (response.data){
                    setSearchData(response.data)
                }
            })
            .catch(err => {
                console.log(err);
                setSearchData([]);
            })
        }
    }

    return (
        <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={todoState}
        onClose={() => setTodoState(false)}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle color="primary"><b>Search</b></DialogTitle>
        <DialogContent>

            <OutlinedInput autoComplete="off" autoFocus fullWidth id="searchbar" type="text" name='search' placeholder="search" inputProps={{maxLength: "80"}} onChange={(event) => search(event)}/>
            <Divider />
            <div className="d-flex justify-content-around mt-2">
                            <span>
                                <input name="tabSearch" type="radio" id="tabSearch-1" className={style.input} onChange={() => setCategory("People")} />
                                <label for="tabSearch-1" className={style.label}>People</label>
                            </span>
                            <span>
                                <input name="tabSearch" type="radio" id="tabSearch-2" className={style.input} onChange={() => setCategory("Community")}/>
                                <label for="tabSearch-2" className={style.label}>Community</label>
                            </span>
                            <span>
                                <input name="tabSearch" type="radio" id="tabSearch-3" className={style.input} onChange={() => setCategory("Topic")}/>
                                <label for="tabSearch-3" className={style.label}>Topic</label>
                            </span>
                            <span>
                                <input name="tabSearch" disabled type="radio" id="tabSearch-4" className={style.input} onChange={() => setCategory("Course")}/>
                                <label for="tabSearch-4" className={style.label}>Course</label>
                            </span>
                        </div>
                        <Divider />
                        <p></p>
             {(() =>{

                if (category == 'People'){
                    return <div className={style.searchedResults}>
                        {searchData.map((user,index) =>
                            <div key={index}>
                            <List>
                                <Button onClick={() => redirectToProfile.push("/profile/".concat(user.username))}>
                                <ListItem>
                                    {user.profilePicture ?
                                    <ListItemAvatar>
                                        <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/profilePictures/'+ user.profilePicture} className={style.profilePictureThumbnail}/>
                                    </ListItemAvatar>
                                    :
                                    <ListItemAvatar>
                                        <Avatar> {user.username[0]} </Avatar>
                                    </ListItemAvatar>
                                    }
                                    
                                    <ListItemText>
                                        {user.username}
                                    </ListItemText>
                                </ListItem>
                                </Button>
                            </List>
                        </div>
                            )}
                    </div>
                }

                if (category == 'Community'){
                    return <div className = 'discussion-list-list'>
                    {searchData.map(
                        (thread) => 
                            <div key = {thread.id} className="divStyleForSearchBar">
                                <Link to = {'/discussionDetail/'.concat(thread._id.$oid)} style = {{color: '#403e42', textDecoration: "none"}}>
                                    <div className='d-flex justify-content-between' style={{ textOverflow: "ellipsis" }}>
                                        <span style={{ textOverflow: "ellipsis", width: "calc(100% - 20px)"}}>{thread.title}</span>
                                        <span className='repliesBlock'>{thread.bodies.length-1}</span>
                                    </div>
                                    <div style={{fontSize: "small", color: "#9d98a1"}}>
                                        {thread.timestamps[0]}
                                    </div>
                                </Link>
                            </div>
                    )}
                    </div>
                }

                if (category == 'Topic'){
                    return <div className="d-flex justify-content-around flex-wrap">
                    {searchData.map((post, index) => 
                    <Link to={'/post/'.concat(post._id.$oid)} title='Post' key={index}>
                      <div className="postThumbnail">
                        <div className="factThumbnail" name="factName">
                          <p className="subTopicThumbnail">{post.subtopic}</p>
                          <p className="fact"> {post.fact}</p>
                        </div>
                        <img src={'https://s3.ap-south-1.amazonaws.com/finemate.media/postBackgroundImages/'+ post.background} />
                      </div>
                    </Link>
                    )}
                    </div>
                }

             })()}
        </DialogContent>
    </Dialog>
    )
}
