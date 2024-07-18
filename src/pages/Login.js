import {useState} from "react";
import Button from '@mui/material/Button';
import Navbar from "../components/Navbar";
import Account from "../grocery-img/account.png";


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

    }

    return(<>
        <Navbar />
        <div className="register-form-container">
        <img src={Account} width="60px" height="60px" />
        <h3 style={{gridColumn: 2, gridRow: 1, marginTop: "30px"}}>Login</h3>
        <form className="register-form">
            <label htmlFor="email" className="register-label">Email</label>
            <input type="email" value={email} name="email" className="register-field" onChange={(e) => setEmail(e.target.value)}></input><br />
            <label htmlFor="pass" className="register-label">Password</label>
            <input type="password" value={password} name="pass" className="register-field" onChange={(e) => setPassword(e.target.value)}></input><br />
            <Button type="submit" variant="contained" size="small" sx={{backgroundColor: "#F47300", 
    textTransform: "none",marginLeft: "5px", 
    borderRadius: "2px", marginTop: "7px"}} onClick={handleLogin}>Submit</Button>
        </form>
    </div>
    </>)
}