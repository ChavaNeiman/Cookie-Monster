import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import './About.css'

export default function About(props) {
    useEffect(() => {
        props.goToTop();
    }, [props])
    return (
        <div className="container about">
            <img className="pic" src={require("../../assets/images/misterCookie.png").default} alt="logo"></img>
            
            <div className="texts">Cookie Monster Cookies are decorated iced sugar cookies.<br/>
            Our cookies are the PERFECT custom cookies for all of your special occasions.<br/> They are made with fresh, quality ingredients.  They taste as good as they look!<br/>
            The delicious flavor and fun designs will be a hit at any event!<br/>
            So many delicious reasons to buy our cookies ~<br/>
            Thank you gifts for teachers, coaches, hair dressers, nurses,......<br/>
            Favors for baby showers, weddings, birthday parties, bridal showers....<br/>
            Treats for a barbecue, picnic, company party, college student......<br/>
            Browse through our <Link to="/AllItems">Store</Link> to get some ideas for your custom cookies.<br/>
            </div>
        </div>
    )
}
