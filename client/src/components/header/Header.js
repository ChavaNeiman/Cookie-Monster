import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'
import './Header.css'
import CookieMonster from '../../assets/images/misterCookie.png'
import {useHistory} from 'react-router-dom'

export default function Header(props) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const [show, setShow] = useState({ user: false, shop: false });
    let amount = Object.values(props.currentUser.cart).reduce((prev, cur) => +prev + +cur, 0);
    const [amountOfItems, setAmountOfItems] = useState(amount);
    const history = useHistory();
    useEffect(() => {
        let amount = Object.values(props.currentUser.cart).reduce((prev, cur) => +prev + +cur, 0);
        setAmountOfItems(amount);
    }, [props.currentUser.cart])

    const goToOrders=()=>{
        history.push("/previousOrders");
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarOpen" aria-controls="navbarOpen" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">

                    <div className={isNavCollapsed ? 'collapse navbar-collapse' : 'navbar-collapse'} id="navbarOpen">
                        <Link className="logo navbar-brand" to="/" >
                            <div className="col-xl-12 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                                <span><img src={CookieMonster} width="35px" alt="logo" /></span>
                                <div className="text-muted mb-md-0 mb-5 bold-text mr">Cookie Monster</div>
                            </div>
                        </Link>
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item ">
                                <NavLink exact className="nav-link" to="/" onClick={handleNavCollapse}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavDropdown title="Shop"

                                    show={show.shop}
                                    onMouseEnter={() => setShow({ ...show, shop: !show.shop })}
                                    onMouseLeave={() => setShow({ ...show, shop: false })}>
                                    <NavLink exact className="nav-link" to="/AllItems" onClick={handleNavCollapse}>
                                        All items
                                </NavLink>
                                    <NavLink className="nav-link" to={{ pathname: '/AllItems/Birthdays', category: "Birthdays" }} onClick={handleNavCollapse}>
                                        Birthdays
                                </NavLink>
                                    <NavLink className="nav-link" to={{ pathname: '/AllItems/Others', category: "Others" }} onClick={handleNavCollapse}>
                                        Others
                                </NavLink>
                                    <NavLink className="nav-link" to={{ pathname: '/AllItems/Babies', category: "Babies" }} onClick={handleNavCollapse}>
                                        Babies
                                </NavLink>
                                    <NavLink className="nav-link" to={{ pathname: '/AllItems/Presents', category: "Presents" }} onClick={handleNavCollapse}>
                                        Presents
                                </NavLink>
                                </NavDropdown>
                            </li>

                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/allVideos" onClick={handleNavCollapse}>
                                    Videos
                                </NavLink>
                            </li><li className="nav-item ">
                                <NavLink className="nav-link" to="/about" onClick={handleNavCollapse}>
                                    About Us
                                </NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/faq" onClick={handleNavCollapse}>
                                    Faq
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item" data-toggle="modal" >
                                <NavDropdown
                                    title={<div className="container">

                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        </svg>
                                        {props.currentUser.name !== "uknown" &&
                                            <div className="nav-link userName">Hello, {props.currentUser.name}</div>}
                                    </div>}
                                    show={show.user}
                                    onMouseEnter={() => setShow({ ...show, user: !show.user })}
                                    onMouseLeave={() => setShow({ ...show, user: false })}
                                    id="navbarDropdown" className="dropDown">
                                    {props.currentUser.name !== "uknown" &&
                                        <div><button className="nav-link signIn" onClick={props.signout}>Signout <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                        </svg></button>
                                        <button className="nav-link signIn" onClick={goToOrders}>My orders</button>
                                        </div>
                                    }
                                    {props.currentUser.name === "uknown" &&
                                        <div>
                                            <button className="nav-link signIn" onClick={() => { props.onOpenShowSignIn(); handleNavCollapse() }}>
                                                Login
                                    </button>
                                            <button className="nav-link signIn" onClick={() => { props.onOpenShowRegister(); handleNavCollapse() }}>
                                                Sign Up
                                    </button>
                                        </div>}
                                </NavDropdown>

                            </li>

                            <li className="nav-item ">
                                <NavLink exact className="nav-link" to="/ShoppingCart" onClick={handleNavCollapse}>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                    </svg><span className="numOfItemsInCart">{amountOfItems}</span></span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}