import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Button } from "@material-ui/core";
import { ExtensionRounded, Inbox, Mail } from "@material-ui/icons";
import React, { Component } from "react";
import { BsBell, BsEmojiSunglasses } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { Link} from "react-router-dom";
import style from './HeaderTaskbarForMobile.module.css';
import Createpost from '../../assets/addPostForMobile.png';
import Notice from '../../assets/noticeformobile.png';
import Todo from '../../assets/todoForMobile.png';
import Leaderboard from '../../assets/leaderboardForMobile.png';
import Setting from '../../assets/settings.png';
import logo from '../../assets/finemateLatestin Angelina fontLogoForMobile.png';
import profile from "../../assets/tinyprofile.png";


function CustomListItems({id, link, imgSrc, title}) {
    return (
      <Link to={link} title={title} className={style.sidebarListLink} key={id}>
        <ListItem className={style.sidebarListItem}>
          <ListItemIcon className={style.sidebarListIcon}>
            <img src={imgSrc} alt={title} />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
    </Link>
)
}

function PermanentListItems({id, link, imgSrc, title}){
    
    return(
        <>
            <Link to={link} title={title} className={style.sidebarListLink} key={id}>
        <ListItem className={style.sidebarListItem}>
          <ListItemIcon className={style.sidebarListIcon}>
            <img src={imgSrc} alt={title} />
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
            sidebarOpened: false
        }
        this.toggleDrawer=this.toggleDrawer.bind(this);
 
    }
    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ sidebarOpened: open });
      };
    
      
       
      
    render(){
      const { books } = this.props;
      const permanentListItems=[
        { id: 1, link: "/createpost", imgSrc: Createpost, title: "Create Post" },
        { id: 2, link: "/notice", imgSrc: Notice, title: "Notice" },
        { id: 3, link: "/todolist", imgSrc: Todo, title: "ToDo"},
        { id: 4, link: "/leaderboard", imgSrc: Leaderboard, title: "Leaderboard"},
        { id: 5, link: "/settings", imgSrc: Setting, title: "Settings" },
      ];
        return(
                    <React.Fragment>
                          <div className={style.HeaderBarForMobile}>
                        <Button onClick={this.toggleDrawer(true)}>
                            <IconContext.Provider value={{ color: '#834bc4', size: '25px' }} >
                                <div> <BsEmojiSunglasses /> </div>
                            </IconContext.Provider>
                        </Button>
                        <Button>
                            <Link to="/allnotifications" title="Notifications">
                            <IconContext.Provider value={{ color: '#834bc4', size: '20px' }} >
                                <div> <BsBell /> </div>
                            </IconContext.Provider>
                            </Link>
                        </Button>
                        </div>

                      <Drawer
                        anchor="left"
                        open={this.state.sidebarOpened}
                        onClose={this.toggleDrawer(false)}
                      >
                        <div style={{width:"65vw"}}>
                          <div className="d-flex justify-content-center"><img src={logo} alt="logo" /></div>
                          <Link to="/profile" title="Profile Page" style={{color: "rgba(0, 0, 0, 0.8)", textDecoration: "none"}}>
                            <div className="d-flex align-items-center"><span className="ml-3"><img style={{width: "35px", height: "35px"}} src={profile} alt="profilePic"/> </span><span  className="ml-3"><b>{localStorage.getItem('username')}</b></span></div>
                          </Link>
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
                            <Divider />
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