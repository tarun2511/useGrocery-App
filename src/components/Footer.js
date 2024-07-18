import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import footerLogo from "../grocery-img/footerLogo.png";
import googlePlay from "../grocery-img/google-play.jpeg"

export default function Footer(){
    return(<>
        <div className="footer-container">
            <ul className="footer-logo">
                <li><InstagramIcon /></li>
                <li><FacebookIcon /></li>
            </ul>
            <ul className="footer-li-1">
                <li>Home</li>
                <li>Delivery areas</li>
                <li>Careers</li>
                <li>Support</li>
            </ul>
            <ul className="footer-li-2" >
                <li>Privacy policy</li>
                <li>Terms of use</li>
            </ul>
            <img src={googlePlay} alt="footer-img" width="200px" height="150px"/>
        </div>
        </>)
}