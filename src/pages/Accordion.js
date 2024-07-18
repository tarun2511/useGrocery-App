import {useState, useEffect,useRef} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from "../components/Navbar";
import Feature from "../components/Feature";
import { LocalLaundryService } from "@mui/icons-material";
import Footer from "../components/Footer";

export default function Accordion(){
    const acc1 = useRef(null);
    const acc2 = useRef(null);
    const acc3 = useRef(null);

    const handleAccClose = (index) => {
        if(index === 0){
            acc1.current.children[3].classList.toggle("closed");
        }
        if(index === 1){
            acc2.current.children[3].classList.toggle("closed");
        }
        if(index === 2){
            acc3.current.children[3].classList.toggle("closed");
        }
        
    }

    return(
        <>
        <Navbar />
        <div className="accordion">
        <div className="acc-item" onClick={() => handleAccClose(0)} ref={acc1}>
        <p className="acc-number">01 </p>
        <p className="acc-text">How long do I have to return my product? </p>
        <p><ExpandMoreIcon /></p>
        <div className="hidden-box closed">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Neque dolores nobis, animi reprehenderit unde qui repudiandae ut, 
             iusto cupiditate voluptatum repellendus deserunt reiciendis veritatis tempora numquam quaerat. 
             Eligendi, voluptates aperiam?
        </p>
        </div>
        </div>

        <div className="acc-item" onClick={() => handleAccClose(1)} ref={acc2}>
        <p className="acc-number">02 </p>
        <p className="acc-text">What if I receive a broken product? </p>
        <p><ExpandMoreIcon /></p>
        <div className="hidden-box closed">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Neque dolores nobis, animi reprehenderit unde qui repudiandae ut, 
             iusto cupiditate voluptatum repellendus deserunt reiciendis veritatis tempora numquam quaerat. 
             Eligendi, voluptates aperiam?
        </p>
        </div>
        </div>

        <div className="acc-item" onClick={() => handleAccClose(2)} ref={acc3}>
        <p className="acc-number">03 </p>
        <p className="acc-text">Product hasn't been delivered yet? </p>
        <p><ExpandMoreIcon /></p>
        <div className="hidden-box closed">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Neque dolores nobis, animi reprehenderit unde qui repudiandae ut, 
             iusto cupiditate voluptatum repellendus deserunt reiciendis veritatis tempora numquam quaerat. 
             Eligendi, voluptates aperiam?
        </p>
        </div>
        </div>
        </div>
        <div>
            <Feature />
        </div>
        <Footer />
        </>
    )
}