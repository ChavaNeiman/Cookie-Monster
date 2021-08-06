import React, { useState, useEffect } from "react";
import { setTimeout } from "timers";
import logo1 from '../../assets/images/onesies.jpg';
import logo2 from '../../assets/images/birthday.jpg';
import logo3 from '../../assets/images/present.jpg';
import logo4 from '../../assets/images/snowman.jpg';
import './Carousel.css';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: logo1, title: 'Babies' },
        { src: logo2, title: 'Birthdays' },
        { src: logo3, title: 'Presents' },
        { src: logo4, title: 'Others' },
    ];

    useEffect(() => {

        let timeout;
        let mounted = true;
        timeout = setTimeout((function () {
            if (mounted)
                setCurrentIndex(((currentIndex + 1) % images.length));
        }), 3000);

        return () => {
            mounted = false;
            clearTimeout(timeout);
        };
    });

    const scrollDown = () => {
        window.scrollTo(700, 700);
    }

    return (
        <div className="container cont">
            <div className="text">{images[currentIndex].title}</div>
            <img className="slide" src={images[currentIndex].src} alt="" />
            <button className="roundButton" onClick={scrollDown}></button>
        </div>
    )
}



