import React, { useEffect } from 'react'
import Carousel from '../carousel/Carousel'
import { Link } from 'react-router-dom';
import './Home.css'
import logo1 from '../../assets/images/onesies.jpg';
import logo2 from '../../assets/images/birthday.jpg';
import logo3 from '../../assets/images/thankYou.jpg';
import logo4 from '../../assets/images/usa.jpg';

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Carousel />
            <div className="container homeCards">
                <div className="row">
                    <Link className="col-4" to={{ pathname: '/AllItems/Babies', category: "Babies" }}>
                        <div className="storeContainer">
                            <div className="card">
                                <img className="img" src={logo1} alt={""}></img>
                                <div className="text bottom">{"babies"}</div>
                            </div>
                        </div>
                    </Link>
                    <Link className="col-4" to={{ pathname: '/AllItems/Birthdays', category: "Birthdays" }}>
                        <div className="storeContainer">
                            <div className="card">
                                <img className="img" src={logo2} alt={""}></img>
                                <div className="text bottom">{"birthdays"}</div>
                            </div>
                        </div>
                    </Link>
                    <Link className="col-4" to={{ pathname: '/AllItems/Presents', category: "Presents" }}>
                        <div className="storeContainer">
                            <div className="card">
                                <img className="img" src={logo3} alt={""}></img>
                                <div className="text bottom">{"Presents"}</div>
                            </div>
                        </div>
                    </Link>
                    <Link className="col-4" to={{ pathname: '/AllItems/Others', category: "Others" }}>
                        <div className="storeContainer">
                            <div className="card">
                                <img className="img" src={logo4} alt={""}></img>
                                <div className="text bottom">{"Others"}</div>
                            </div>
                        </div>
                    </Link>
                    <Link className="col-4" to="/allVideos">
                        <div className="storeContainer">
                            <div className="card">
                                <img className="img" src={"https://i.pinimg.com/564x/02/9f/43/029f435db5c58fed35c16617b9f800a5.jpg"} alt={""}></img>
                                <div className="text bottom">{"Videos"}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
