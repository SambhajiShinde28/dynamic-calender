import '../styles/HeaderStyle.css'
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


const HeaderComponents = () => {
    return (
        <div className='main-container'>
            <div className="header-container">
                <h1>Dynamic Event Calendar Application</h1>
                <div className="navigation-container">
                    <Link to="/" className="navMenu viewMenu">
                        View
                    </Link>
                    <Link to="/event" className="navMenu createMenu">
                        Events
                    </Link>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default HeaderComponents