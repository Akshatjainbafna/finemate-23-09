import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoDesktop from '../../assets/finemateLatestin Angelina fontLogo.png';
import LogoTablet from "../../assets/finemateLatestin Angelina fontLogo for Tablet Screens.png";
import style from './sidebar.module.css';


const NavItem = ({link, imgSrc, title}) => {

    function HeaderView() {
        const location = useLocation();
        return location.pathname
    }

    //returning the active list item or say current selected sidebar menu
    if (HeaderView()==link) {
        return (
            <Link to={link} title={title}>
                <li className={style.active}>
                    <img
                        src={imgSrc}
                        alt={title}
                    />
                    <span className={style.sideBarMenuTitle}>{title}</span>
                </li>
            </Link>
        )
    }

    //else the arrow function will return normal list item without a classname .active
    return (
        <Link to={link} title={title} >
            <li>
                <img
                    src={imgSrc}
                    alt={title}
                />
                <span className={style.sideBarMenuTitle}>{title}</span>
            </li>
        </Link>
    )
}


class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
		}
    }
    render() {
        const { books } = this.props;

        return (
            <nav className={style.sideBar}>
                <span className={style.logoContainer}>
                    <Link to="/dashboard" title="Home">
                    <picture> 
                        <source media='(min-width: 992px)' className={style.menuIcon} srcSet={LogoDesktop} />
                        <source media='(min-width: 601px)' className={style.menuIcon}  srcSet={LogoTablet} />
                        <img className={style.menuIcon} src={LogoTablet} />
                    </picture>
                    </Link>
                </span>

                <ul>
                    {books.map(
                        (book) => 
                            <NavItem 
                                key={book.id}
                                link={book.link} 
                                imgSrc={book.imgSrc} 
                                title={book.title}
                            />
                    )}
                </ul>

            </nav>
        );
    }
}

export default Sidebar
