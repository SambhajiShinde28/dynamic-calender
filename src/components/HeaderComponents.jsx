import { useRef } from 'react';
import '../styles/HeaderStyle.css'
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


const HeaderComponents = () => {

    const burgerRef = useRef()
    const crossRef = useRef()
    const navContainerRef = useRef()

    const burgerIconClicked=()=>{
        navContainerRef.current.style.transform="translateX(0px)"
        burgerRef.current.style.display="none"
        crossRef.current.style.display="block"
    }

    const crossIconClicked=()=>{
        navContainerRef.current.style.transform="translateX(201px)"
        burgerRef.current.style.display="block"
        crossRef.current.style.display="none"
    }


    return (
        <div className='main-container'>
            <div className="header-container">
                <h1>Dynamic Event Calendar Application</h1>
                <div className="navigation-container" ref={navContainerRef}>
                    <Link to="/">
                        Calender
                    </Link>
                    <Link to="/event">
                        Events
                    </Link>
                </div>
                <div className="hamBurger-container">
                    <i className="fa-solid fa-bars burger" ref={burgerRef} onClick={burgerIconClicked}></i>
                    <i className="fa-solid fa-xmark cross" ref={crossRef} onClick={crossIconClicked}></i>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default HeaderComponents