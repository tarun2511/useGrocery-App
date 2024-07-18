import {useState} from "react";
import Navbar from "../components/Navbar";
import Button from '@mui/material/Button';
import axios from "axios";
import Alert from '@mui/material/Alert';

export default function Register(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
        const resp = await axios.post("http://localhost:4200/v1/users/register", {
            data: {
                firstName,
                lastName,
                email,
                password
            }
        })
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        },1800)
    }
    catch(err){
        setIsError(true);
        setErrorMsg(err.response.data.msg);
        console.log(err);
        setTimeout(() => {
            setIsError(false);
        }, 1800)
    }
    }

    return <>
    <Navbar />
    {isError? <Alert severity="error">{errorMsg}</Alert>:null}
    {isSuccess? <Alert severity="success">User successfully registered.</Alert>: null}
    <div className="register-form-container">
        <h3 style={{gridColumn: 2, gridRow: 1, marginTop: "30px"}}>Sign up</h3>
        <form className="register-form">
            <label htmlFor="firstName" className="register-label">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" className="register-field"></input><br/>
            <label htmlFor="lastName" className="register-label">Last Name</label>
            <input type="text" value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} className="register-field"></input><br/>
            <label htmlFor="email" className="register-label">Email</label>
            <input type="email" value={email} name="email" className="register-field" onChange={(e) => setEmail(e.target.value)}></input><br />
            <label htmlFor="pass" className="register-label">Password</label>
            <input type="password" value={password} name="pass" className="register-field" onChange={(e) => setPassword(e.target.value)}></input><br />
            <Button type="submit" variant="contained" size="small" sx={{backgroundColor: "#F47300", 
    textTransform: "none",marginLeft: "5px", 
    borderRadius: "2px", marginTop: "7px"}} onClick={handleRegister}>Submit</Button>
        </form>
    </div>
    </>
}