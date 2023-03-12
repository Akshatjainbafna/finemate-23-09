import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosBaseFile from "../AxiosBaseFile";
import style from './search.module.css';
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

export default function SearchPageForTopicComponent(props) {
    const [searchData, setSearchData] = useState([]);
    const [category, setCategory] = useState('Topic');
    const [count, setCount] = useState(0);

    useEffect(() => {
        AxiosBaseFile.post('/api/db_search_posts_of_topic', { 'topic': props.topic })
            .then(response => {
                if (response.data) {
                    setSearchData(response.data)
                }
            })
            .catch(err => {
                console.log(err);
                setSearchData([]);
            })
        setCount((count) => count + 1);
    }, [])

    function search(event) {
        if (event.target.value.length > 4) {
            if (category === 'People') {
                AxiosBaseFile.post('/api/db_search_user_profile', { 'username': event.target.value, 'whoSearched': localStorage.getItem('username') })
                    .then(response => {
                        if (response.data) {
                            setSearchData(response.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setSearchData([]);
                    })
            }
            if (category === 'Community') {
                AxiosBaseFile.post('/api/db_search_thread', { 'title': event.target.value })
                    .then(response => {
                        if (response.data) {
                            setSearchData(response.data)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setSearchData([]);
                    })
            }
            if (category === 'Topic') {
                AxiosBaseFile.post('/api/db_search_posts_of_topic', { 'topic': event.target.value })
                    .then(response => {
                        if (response.data) {
                            setSearchData(response.data)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setSearchData([]);
                    })
            }
            if (category === 'Course') {
                AxiosBaseFile.post('/api/db_search_user_profile', { 'username': event.target.value, 'whoSearched': localStorage.getItem('username') })
                    .then(response => {
                        if (response.data) {
                            setSearchData(response.data)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        setSearchData([]);
                    })
            }
        }
    }

    return (
        <div className={style.searchBar}>


            <OutlinedInput fullWidth autoComplete="off" id="searchbar" type="text" name='search' placeholder="search" inputProps={{ maxLength: "80" }} onChange={(event) => search(event)} />

            <div className="d-flex justify-content-around mt-2">

                <input name="tabNews" type="radio" id="tabNews-1" className={style.inputSearchOption} onChange={() => { setCategory("People"); setSearchData([]); }} />
                <label for="tabNews-1" className={style.labelSearchOption}>People</label>


                <input name="tabNews" type="radio" id="tabNews-2" className={style.inputSearchOption} onChange={() => { setCategory("Community"); setSearchData([]); }} />
                <label for="tabNews-2" className={style.labelSearchOption}>Community</label>


                <input name="tabNews" type="radio" id="tabNews-3" className={style.inputSearchOption} onChange={() => { setCategory("Topic"); setSearchData([]); }} />
                <label for="tabNews-3" className={style.labelSearchOption}>Topic</label>


                <input name="tabNews" disabled type="radio" id="tabNews-4" className={style.inputSearchOption} onChange={() => { setCategory("Course"); setSearchData([]); }} />
                <label for="tabNews-4" className={style.labelSearchOption}>Course</label>

            </div>
            <Divider />
            {(() => {

                if (category === 'People') {
                    return <div className={style.searchedResults}>
                        {searchData.map((user, index) =>
                            <div key={index}>
                                <List>
                                    <Link style={{ textDecoration: "none", color: "grey" }} to={"/profile/".concat(user.username)}>
                                        <ListItem>
                                            {user.profilePicture != 'null' ?
                                                <ListItemAvatar>
                                                    <img src={require('../../assets/profilePictures/' + user.profilePicture)} alt="profilePicture" className={style.profilePictureThumbnail} />
                                                </ListItemAvatar>
                                                :
                                                <ListItemAvatar>
                                                    <img src={generator.generateRandomAvatar(user.name)} className={style.profilePictureThumbnail} />
                                                </ListItemAvatar>
                                            }

                                            <ListItemText>
                                                <div>
                                                    {user.name}
                                                </div>
                                                <div>
                                                    <small>
                                                        {user.username}
                                                    </small>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                    </Link>
                                </List>
                            </div>
                        )}
                    </div>
                }

                if (category === 'Community') {
                    return <div className='discussion-list-list'>
                        {searchData.map(
                            (thread) =>
                                <div key={thread.id} className="divStyle">
                                    <Link to={'/discussionDetail/'.concat(thread._id.$oid)} style={{ color: '#403e42', textDecoration: "none" }}>
                                        <div className='d-flex justify-content-between' style={{ textOverflow: "ellipsis" }}>
                                            <span style={{ textOverflow: "ellipsis", width: "calc(100% - 20px)" }}>{thread.title}</span>
                                            <span className='repliesBlock'>{thread.bodies.length - 1}</span>
                                        </div>
                                        <div style={{ fontSize: "small", color: "#9d98a1" }}>
                                            {thread.timestamps[0]}
                                        </div>
                                    </Link>
                                </div>
                        )}
                    </div>
                }

                if (category === 'Topic') {
                    return <div className="d-flex justify-content-around flex-wrap">
                        {searchData.map((post, index) =>
                            <Link to={'/post/'.concat(post._id.$oid)} title='Post' key={index}>
                                <div className="postThumbnail">
                                    <div className="factThumbnail" name="factName">
                                        <p className="subTopicThumbnail">{post.subtopic}</p>
                                        <p className="fact"> {post.fact}</p>
                                    </div>
                                    <img src={require('../../assets/postBackgroundImages/' + post.background)} alt="Post Background" />
                                </div>
                            </Link>
                        )}
                    </div>
                }

            })()}
        </div>
    )
}
