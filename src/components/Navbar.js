import {useState, useEffect} from "react";
import Search from "./Search";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import {Link} from "react-router-dom";
import footerLogo from "../grocery-img/footerLogo.png"
import close from "../grocery-img/close.svg";
import open from "../grocery-img/open.svg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import faq5 from "../grocery-img/faq5.png"
import QuizIcon from '@mui/icons-material/Quiz';

export default function Navbar(){

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const resizeWindow = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight)

    }


    useEffect(() => {
        resizeWindow();
        window.addEventListener('resize', resizeWindow);
        return () => window.removeEventListener('resize', resizeWindow) 
    }, [])
    
    return(
        <>
        <nav className="navbar">
        <Link to="/" style={{textDecoration: "none", color: "white"}}>
            <ul className="nav-header">
            <li><img src={footerLogo} width="60px" height="60px" alt="footer-logo" style={{display: "inline", marginTop: "10px"}}/> </li>
            {width >=800?
            <li><h2>useGrocery</h2></li> : null
            }
            </ul></Link>
        <div style={{marginTop: "15px", width: "200px"}}>
            <LocationOnIcon sx={{display: "inline-block"}}/>
            <p style={{fontSize: "12px", display: "inline-block"}}>Deliver to</p><br />
            <p style={{fontSize: "14px", fontWeight: "700", display: "inline-block"}}>Dehradun 248001</p>
        </div>
        <Search/>
       
       
        {width <=950? null :
            <ul className="nav-list-left">
            
            <Link to="/faq" style={{textDecoration: "none", color: "white"}}><li className="nav-item"><QuizIcon fontSize="large"/></li></Link>
            <Link to="/register" style={{textDecoration: "none", color: "white"}}><li className="nav-item"><AccountCircleIcon fontSize="large"/></li></Link>
            <Link to="/addGrocery" style={{textDecoration: "none", color: "white"}}><li className="nav-item"><AddBusinessIcon fontSize="large"/></li></Link>
            
            <Link to="/cart" style={{textDecoration: "none", color:"white"}}><LocalGroceryStoreIcon className="nav-item" fontSize="large"/></Link>
            </ul>
        
        }
        {/* <button class="nav-close">
            <img src={close} alt="" width="28" height="27" />
        </button> */}
        {width <= 950?
        <button class="nav-open">
            <img src={open} alt="" width="28" height="27" />
        </button> : null
        }
        </nav>
        </>
    )
}