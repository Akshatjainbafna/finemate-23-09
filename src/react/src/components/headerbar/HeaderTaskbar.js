import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './HeaderTaskbar.css'
import search from '../../assets/search.png'
import profile from '../../assets/profile.png';
import notifications from '../../assets/notifications.png';
import messaging from '../../assets/messaging.png';
import logout from '../../assets/logout.png';
import { Redirect } from 'react-router-dom';
import {BsBellFill, BsBell, BsChatDots, BsChatDotsFill, BsGear, BsEmojiSunglasses, BsEmojiSunglassesFill, BsPower, BsSearch} from 'react-icons/bs'
import { IconContext } from 'react-icons/lib';
import Axios from 'axios';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import SearchComponent from '../search/search.component';
import AxiosBaseFile from '../AxiosBaseFile';

let headerIcons = [
    {id: 1, link:'/profile', inactiveIcon: <BsEmojiSunglasses />, activeIcon: <BsEmojiSunglassesFill /> , title:"Profile"},
    {id: 2, link:'/messageuser', inactiveIcon: <BsChatDots />, activeIcon: <BsChatDotsFill /> , title:"Messages"},
    {id: 3, link:'/allnotifications', inactiveIcon: <BsBell /> , activeIcon: <BsBellFill />, title:"Notifications"},
    {id: 4, link:'/settings', inactiveIcon: <BsGear /> , activeIcon: <BsGear />, title:"Settings"}
]

function HeaderIcon(props) {
    function HeaderView() {
        const location = useLocation()
        return location.pathname
    }

    //returning the active list item or say current selected sidebar menu
    if (HeaderView()==props.link) {
        return (
            <div className=''>
        <Link to={props.link} title={props.title}>
            <button className='headerIcons'>
                {props.unseenUser && props.title == 'Messages' ? <div className='notificationCount' >{props.unseenUser}</div> : null}
                {props.unseenNotifications && props.title == 'Notifications' ? <div className='notificationCount' >{props.unseenNotifications}</div> : null}
            
                <IconContext.Provider value={{ color: '#834bc4', size: '26px' }} >
                    <div> {props.activeIcon} </div>
                </IconContext.Provider>
            </button>
        </Link>
        </div>
        )
    }

    //else the arrow function will return normal list item without a classname .active
    return (
        <div className=''>
        <Link to={props.link} title={props.title}>
            <button className='headerIcons'>
                {props.unseenUser && props.title == 'Messages' ? <div className='notificationCount' >{props.unseenUser}</div> : null}
                {props.unseenNotifications && props.title == 'Notifications' ? <div className='notificationCount' >{props.unseenNotifications}</div> : null}

                <IconContext.Provider value={{ color: '#834bc4', size: '26px' }} >
                    <div> {props.inactiveIcon} </div>
                </IconContext.Provider>
                </button>
        </Link>
        </div>
    );
}


function Header(props) {
    return (
    <p className='header'>{props.title}</p>
    )
}
class HeaderTaskbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            //redirect: false,
            openDialog: false,
            totalUnseenUser: 0,
            totalUnseenNotifications: 0
        }

        //this.submit=this.submit.bind(this);
        //this.setRedirect = this.setRedirect.bind(this);
        //this.renderRedirect=this.renderRedirect.bind(this);
    }
    /*
    setRedirect = () => {
        this.setState({
          redirect: true,
        })
      }
    renderRedirect = () => {
        if (this.state.redirect)  {
                return <Redirect to='/logout' />
            }
        }*/
    componentDidMount(){
        AxiosBaseFile.post('/api/db_get_unseen_messages', {username: localStorage.getItem('username')})
        .then(res => this.setState({totalUnseenUser: res.data}))
        .catch(err => console.log(err))
        AxiosBaseFile.post('/api/db_get_number_of_unseen_notification', {username: localStorage.getItem('username')})
        .then(res => this.setState({totalUnseenNotifications : res.data}))
        .catch(err => console.log(err))
    }
    render () {
        const { icons } = this.props
        return (
            <div className='Navbar'>
            <nav className='navbar sticky-top headerTask align-content-center'>
                <Header
                        title={icons.title}
                    />
                <div className='icons d-flex flex-row align-items-center'>
                    <div>
                        <form className='form-inline'>
                            <Button className='form-control' style={{color: "#d1c6dd", fontSize: "0.8em", border: '1px solid #d1c6dd'}} onClick={() => this.setState({openDialog: !this.state.openDialog})}> <div className='d-flex justify-content-around'> <div>Search</div> <IconContext.Provider value={{color: "#bdc4cce8", size: "16px"}}><BsSearch className='searchIcon' /></IconContext.Provider></div> </Button>
                        </form>
                        {this.state.openDialog? <SearchComponent search={true} /> : null }
                    </div>
                    {headerIcons.map(
                        (icon) =>
                        <HeaderIcon
                        key={icon.id}
                        link={icon.link}
                        inactiveIcon={icon.inactiveIcon}
                        activeIcon={icon.activeIcon}
                        title={icon.title}
                        unseenUser={this.state.totalUnseenUser}
                        unseenNotifications={this.state.totalUnseenNotifications}
                        />
                    )}
{/*
                    {this.renderRedirect()}
                    <form class="logout" onClick={this.setRedirect}>

                        <button className='headerIcons'>
                        <IconContext.Provider value={{ color: '#834bc4', size: '28px' }} >
                            <div><BsPower /></div>
                            </IconContext.Provider>
                        </button>
					</form>
*/}                
                </div>
            </nav>
            </div>

        )
    }
    /*submit() {
        localStorage.clear();
    }*/
}

export default HeaderTaskbar