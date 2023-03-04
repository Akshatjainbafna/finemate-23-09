import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Button, ListItemAvatar, Avatar } from "@material-ui/core";
import { ExtensionRounded, Inbox, Mail } from "@material-ui/icons";
import React, { Component } from "react";
import { BsBell, BsBook, BsEmojiSunglasses } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import style from './HeaderTaskbarForMobile.module.css';
import logo from '../../assets/Finemate Logo in Black Font #9D8FFF.png';
import profile from "../../assets/tinyprofile.png";
import AxiosBaseFile from "../AxiosBaseFile";
import {HiOutlineSpeakerphone} from 'react-icons/hi';
import {BsUiChecks} from 'react-icons/bs';
import {RiSettings2Line} from 'react-icons/ri';
import {MdOutlineLeaderboard} from 'react-icons/md'


function CustomListItems({id, link, imgSrc, title}) {
  function HeaderView() {
    const location = useLocation();
    return location.pathname
}

//returning the active list item or say current selected sidebar menu
if (HeaderView()===link) {
    return (
      <Link to={link} title={title} className={style.sidebarListLink} key={id}>
      <ListItem className={style.sidebarListItemActive}>
        <ListItemIcon className={style.sidebarListIcon}>
        <IconContext.Provider value={{ size: '26px', color: "var(--purpleDark)" }}>
            {imgSrc}
          </IconContext.Provider>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
  </Link>
    )
}
    return (
      <Link to={link} title={title} className={style.sidebarListLink} key={id}>
        <ListItem className={style.sidebarListItem}>
          <ListItemIcon className={style.sidebarListIcon}>
          <IconContext.Provider value={{ size: '26px' }}>
              {imgSrc}
            </IconContext.Provider>
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
    </Link>
)
}

function PermanentListItems({id, link, imgSrc, title}){
  function HeaderView() {
    const location = useLocation();
    return location.pathname
}

//returning the active list item or say current selected sidebar menu
if (HeaderView()===link) {
    return (
      <Link to={link} title={title} className={style.sidebarListLink} key={id}>
      <ListItem className={style.sidebarListItemActive}>
        <ListItemIcon className={style.sidebarListIcon}>
        <IconContext.Provider value={{ size: '26px', color: "var(--purpleDark)" }}>
            {imgSrc}
          </IconContext.Provider>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
  </Link>
    )
}
    return(
        <>
            <Link to={link} title={title} className={style.sidebarListLink} key={id}>
        <ListItem className={style.sidebarListItem}>
          <ListItemIcon className={style.sidebarListIcon}>
            <IconContext.Provider value={{ size: '26px' }}>
              {imgSrc}
            </IconContext.Provider>
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
    </Link>
      </>
    );
  }

class HeaderBarForMobile extends Component{
    constructor(props){
        super(props);
        this.state = {
            sidebarOpened: false,
            profilePicture: '',
            totalUnseenNotifications: 0
        }
        this.toggleDrawer=this.toggleDrawer.bind(this);
 
    }
    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ sidebarOpened: open });
      };
    
      componentDidMount(){
        AxiosBaseFile.post('/api/db_get_profile_picture', {'username': localStorage.getItem('username')})
        .then(response => {
          this.setState({profilePicture: response.data.profilePicture});
        })
        .catch(err => console.log(err))
        AxiosBaseFile.post('/api/db_get_number_of_unseen_notification', {username: localStorage.getItem('username')})
        .then(res => this.setState({totalUnseenNotifications : res.data}))
        .catch(err => console.log(err))
      }
       
      
    render(){
      const { books } = this.props;
      const permanentListItems=[
        { id: 1, link: "/allcoursesuser", imgSrc: <BsBook /> , title: "Courses" },
        { id: 2, link: "/notice", imgSrc: <HiOutlineSpeakerphone />, title: "Notice" },
        { id: 3, link: "/todolist", imgSrc: <BsUiChecks />, title: "ToDo"},
        { id: 4, link: "/leaderboard", imgSrc: <MdOutlineLeaderboard />, title: "Leaderboard"},
        { id: 5, link: "/settings", imgSrc: <RiSettings2Line />, title: "Settings" },
      ];
        return(
                    <React.Fragment>
                          <div className={style.HeaderBarForMobile}>
                        <Button onClick={this.toggleDrawer(true)}>
                            <IconContext.Provider value={{ color: 'var(--lightThemeFontSecondary)', size: '25px' }} >
                                <div> <BsEmojiSunglasses /> </div>
                            </IconContext.Provider>
                        </Button>
                        <Button>
                            <Link to="/allnotifications" title="Notifications">
                              <button className='headerIcons'>
                                {this.state.totalUnseenNotifications ? <div className='notificationCount'>{this.state.totalUnseenNotifications}</div> : null}
                                  <IconContext.Provider value={{ color: 'var(--lightThemeFontSecondary)', size: '20px' }} >
                                    <div> <BsBell /> </div>
                                  </IconContext.Provider>
                              </button>
                            </Link>
                        </Button>
                        </div>

                      <Drawer
                        anchor="left"
                        open={this.state.sidebarOpened}
                        onClose={this.toggleDrawer(false)}
                      >
                        <div style={{width:"75vw"}}>
                          <div className="d-flex justify-content-center m-2">
                            <img src={logo} alt="Finemate Logo" style={{width: '130px'}} />
                          </div>
                          <Link to="/profile" title="Profile Page" style={{color: "var(--lightThemeFontSecondary)", textDecoration: "none"}}>
                            <div className="d-flex align-items-center">
                              <span className={style.mobileSideBarProfilePic}>
                              {this.state.profilePicture ?
                                    <ListItemAvatar>
                                        <img src={require('../../assets/profilePictures/'+ this.state.profilePicture)} className={style.profilePictureSidebarThumbnail}/>
                                    </ListItemAvatar>
                                    :
                                    <ListItemAvatar>
                                        <Avatar> {localStorage.getItem('username')[0]} </Avatar>
                                    </ListItemAvatar>
                                    }
                              </span>
                              <span><b>{localStorage.getItem('username')}</b></span></div>
                          </Link>
                          <p> </p>
                          <Divider />
                            <List>
                              {books.map((book)=>
                              <CustomListItems 
                              key={book.id}
                              id={book.id}
                              link={book.link}
                              imgSrc={book.imgSrc}
                              title={book.title}
                              />
                              )}
                            
                            {permanentListItems.map((book)=>
                            <PermanentListItems
                            key={book.id}
                            id={book.id}
                            link={book.link}
                            imgSrc={book.imgSrc}
                            title={book.title}
                            />
                            )}
                            </List>
                        </div>
                      </Drawer>
                    </React.Fragment>

        );
    }
}
export default HeaderBarForMobile