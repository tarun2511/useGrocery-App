import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Paper from '@mui/material/Paper';
import Footer from "../components/Footer";
import {useSelector, useDispatch} from "react-redux";
import { addProduct } from "../features/cart/cartSlice";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import { removeProduct } from "../features/cart/cartSlice";

export default function Cart(){
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    
    useEffect(() => {
        let sum = 0
        products.map(el => {
            sum = sum + el.price;
            setSubTotal(sum);
        })
    }, [products])

    const deleteProductCart = (index) => {
        dispatch(removeProduct({
            index
        }))
    }

    return(<>
    <Navbar />
    <div className="cart-container">
    
    <div className="cart-section-1">
    <h3 style={{marginTop: "10px", marginLeft: "10px"}}>Shopping Cart</h3>
    <Paper elevation={4} sx={{width: "70vw", height: "auto", marginLeft: "20px", marginTop: "30px"}}>
        {
            products.length === 0? 
            <div style={{marginLeft: "20px"}}><h3>Your cart is empty!</h3>
            <p>Browse the <Link to="/" >catalogue</Link> & add items.</p>
            </div> : null
        }
        <ul style={{}}>
            {products.map((el, index) => {
                return <><li key={`${index}-${el.id}`} style={{listStyle: "none"}} className="cart-list-flex">
                    <img src={el.image? `http://localhost:4200/images/${el.image}`: null} width="100px" 
                    height="100px" style={{borderRadius: "10px"}}/>
                    <p>{el.productName}</p>
                    <p style={{marginLeft: "15px"}}> <b>x{el.quantity}</b></p>
                    <p> <DeleteForeverIcon sx={{marginLeft: "5px"}} onClick={() => deleteProductCart(index)}/></p>
                    <p className="cart-list-price">₹{el.price}.00</p>
                    </li>
                    <div style={{borderTop:"1px solid #545863", width: "760px", margin: "auto", marginBottom: "15px", marginTop: "10px"}}></div>
                    </>
            })}
            {products.length > 0 &&
            <div style={{display: "flex"}}><p style={{marginLeft: "auto", marginRight: "50px"}}><b>{`Subtotal(${products.length})`}</b>: ₹ {subTotal}.00</p></div>
            }
        </ul>
    </Paper>
    </div>
    {products.length > 0 &&
    <Button variant="contained" size="small" sx={{backgroundColor: "#F47300", 
    textTransform: "none",marginLeft: "5px", 
    borderRadius: "2px", alignSelf: "start", gridRow: '3'
    , justifySelf: "end", marginTop: "7px"}}>Buy now</Button>}
    <div className="cart-section-2">
        <Paper elevation={4} sx={{height: "80px"}}>
            <label htmlFor="coupon-field" style={{fontSize:"12px", marginLeft: "5px"}}>Have a coupon?</label>
            <div style={{display: "flex", marginBottom:"4px", marginLeft: "5px"}}>
            <textarea name="coupon-field"></textarea>
            <Button variant="contained" size="small" sx={{backgroundColor: "#F47300", textTransform: "none",marginLeft: "5px", borderRadius: "2px"}}>Apply</Button>
            </div>
        </Paper>
    </div>
    </div>  
    <div>
    <Footer className="cart-footer"/>
    </div>
    </>)
}



