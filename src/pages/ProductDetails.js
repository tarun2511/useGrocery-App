import {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button, Alert } from "@mui/material";
import {Link} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import Footer from "../components/Footer";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import delivery5 from "../grocery-img/delivery5.png";
import location from "../grocery-img/location.png";
import {useSelect, useDispatch} from "react-redux";
import {addProduct} from "../features/cart/cartSlice"



export default function ProductDetails(){
    const params = useParams();
    const [details, setDetails] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [modal, setModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const fetchDetails = async () => {
        try{
        const resp = await axios.get(`http://localhost:4200/v1/products/product-details/${params.id}`)
        setDetails(resp.data)
        }
        catch(err){
            console.log(err)
        }
    }


    const handleDelete = async (e) => {
        try{
            const resp = await axios.delete(`http://localhost:4200/v1/products/delete-product/${params.id}`)
            if(resp.status === 204){
                setDeleteSuccess(true)
            }
        }

        catch(err){
            console.log(err)
        }
    }

    const handleAddToCart = () => {
        dispatch(addProduct({id: details._id, 
            productName: details.name, 
            image: details.image.data,
            price: details.sellingPrice * quantity,
            quantity: quantity}))
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const toggleModal = () => {
        setModal(!modal)
    }
    useEffect(() => {
        fetchDetails()
    }, [])

    return(<>
    <Navbar />
    { deleteSuccess ? <Alert severity="error">Product successfully deleted. <Link to="/">Back to home</Link></Alert> :
    <div className="details-container">
    <div className="details-img-container">
        <img src={details.image? `http://localhost:4200/images/${details.image.data}`: null} width="300px" height="300px" alt="img" style={{borderRadius: "4px"}}></img>
    </div>
    {modal? <div className="delete-modal">
        <div className="overlay">
        <Paper className="modal-content-container" elevation={3} sx={{margin: 'auto', marginTop: '300px', width: "40vw", height: "150px"}}>
    <button className="del-modal-close" sx={{width: "10px"}}><CloseIcon  fontSize="small" onClick={toggleModal}/></button>
      <p className="del-modal-p">Are you sure you want to delete this product?</p>
      <div className="delete-confirm-btn">
            <Button variant="outlined" color="success" className="product-delete-btn" sx={{textTransform: "none", marginTop: "10px", marginLeft: "10px"}} onClick={handleDelete}><CheckIcon /></Button>
            <Button variant="outlined" color="error" className="product-add-btn" sx={{textTransfor: "none", marginTop: "10px", marginLeft: "10px"}} onClick={toggleModal}><ClearIcon /></Button>
            </div>
        </Paper>
    </div>
    </div>: null}
    {modal? null :
    <div className="desc-button-container">
    <Button variant="contained" color="error" className="product-delete-btn" sx={{textTransform: "none", marginTop: "10px", marginLeft: "10px", borderRadius: "15px"}} onClick={toggleModal}><DeleteForeverIcon sx={{marginLeft: "5px"}}/></Button>
    </div>
    }

    <div className="details-desc-container">
    <h3>{details.name}</h3>
    <p>₹ {details.sellingPrice}</p>
    <p className="discount">{`${Math.round((details.ogPrice-details.sellingPrice) * 100/details.ogPrice)}`}% off</p>
    <p className="og-price">₹ {details.ogPrice}</p>
    <h4>About the item</h4>
    <p>{details.description}</p>
    </div>
    <div className="product-add-btn">
    <p style={{display: "inline-block", fontSize: "12px", marginRight: "5px"}}>Quantity:</p>
    <select value={quantity} onChange={handleQuantityChange} style={{lineHeight: "100px", width: "70px"}}>
    <option value="1">1</option> 
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select><br />
    <div style={{ position: "relative", marginTop: "10px"
    , marginBottom: "10px", width: "200px", height: "70px"}}>
    <img src={location} width="20px" height="20px" style={{position: "absolute", top: "10px", left: "5px"}}/>
    <p style={{fontSize: "10px", position: "absolute", top: "10px", left: "30px"}}>248001</p>
    <img src={delivery5} height="30px" width="30px" style={{position: "absolute", top: "40px", left: "5px"}}/>
    <p style={{fontSize: "11px", marginBottom: "30px", position: "absolute", top: "40px", left: "40px"}}> Delivery within 30 minutes.</p>
    </div>

    <Button variant="contained" className="product-add-btn" sx={{textTransform: "none", borderRadius: "15px",
     width: "150px", marginBottom: "10px", marginTop: "5px", backgroundColor: "#F47300", color: "#fff"}} onClick={handleAddToCart}>Add to cart   <AddShoppingCartIcon sx={{marginLeft: "5px"}}/></Button><br />
    <Button variant="contained" className="product-add-btn" sx={{textTransform: "none", borderRadius: "15px", width: "150px", backgroundColor: "#F47300", color: "#fff"}} onClick={handleAddToCart}>Buy now <ShoppingCartCheckoutIcon sx={{marginLeft: "5px"}}/></Button>
    </div>
    <div className="footer-container-product-details">
    <Footer />
    </div>
    </div>
    }
    </>)
}