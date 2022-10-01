import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/finemateLatestin Angelina fontLogo.png';
import style from './sidebar.module.css';

const NavItem = ({link, imgSrc, title}) => {

    function HeaderView() {
        const location = useLocation();
        return location.pathname
    }
    if (HeaderView()==link) {
        return (
            <Link to={link} title={title}>
                <li className={style.active}>
                    <img
                        src={imgSrc}
                        alt={title}
                    />
                    <span>{title}</span>
                </li>
            </Link>
        )
    }
  return (
    <Link to={link} title={title} >
        <li>
            <img
                src={imgSrc}
                alt={title}
            />
            <span>{title}</span>
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
        const { books } = this.props
        return (
            <nav className={style.sideBar}>
                <span className={style.logoContainer}><img
                    className={style.menuIcon}
                    src={Logo}
                    /></span>
                <ul>
                    {books.map(
                        (book) => 
                            <NavItem 
                                key={book.id}
                                link={book.link} 
                                imgSrc={book.imgSrc} 
                                title={book.title}
                                active={book.active}/>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Sidebar
