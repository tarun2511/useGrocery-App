import {useState, useEffect} from "react";
import axios from "axios";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import Paper from '@mui/material/Paper';
import PetCare from "../grocery-img/PetCare.avif";
import pharmacyWEB from "../grocery-img/pharmacyWEB.avif";
import babycare from "../grocery-img/babycare.avif";
import print from "../grocery-img/print.avif";
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../features/cart/cartSlice";
import {addProducts} from "../features/products/productsSlice";
import { fetchProducts } from "../features/products/productsSlice";



export default function Home(){
    const products = useSelector(state => state.products.products);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const searchFlag = useSelector(state => state.products.searchFlag);

    // const fetchProducts = async() => {
    //     try{
    //         const res = await axios.get("http://localhost:4200/v1/products/");
    //         const fetchedProducts = res.data.products;
    //         //dispatch(fetchedProducts.data.products)
    //         dispatch(addProducts({
    //             fetchedProducts
    //         }))
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }

    const handleFetch = () => {
        dispatch(fetchProducts()) //action creator
    } 

    console.log(products);

    useEffect(() => {
        setIsLoading(true);
        handleFetch();
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [])

    return(
        <>
        <div className="home-container">
         
            <div className="category-banner-home">
                <img src={PetCare} alt="banner" width="350px" height="200px"/>
                <img src={pharmacyWEB} alt="banner" width="350px" height="200px"/>
                <img src={print} alt="banner" width="350px" height="200px"/>
                <img src={babycare} alt="banner" width="350px" height="200px"/>
            </div>

            {/* {searchFlag? <p>Search</p> : */}
            {isLoading? <CircularProgress className="loading-icon"/> : 
            searchFlag? <div className="searched-products">
                <h1>Search results</h1>
                <ul>
                {
                    products.length > 0? products.map(el => {
                     return <Paper elevation={2} className="flex-item-home" sx={{width: "200px", height: "277px"}}><Link to={`/product-details/${el._id}`} style={{textDecoration: "none", color: "black"}}><li className="product-list-item">
                        <img src={el.image? `http://localhost:4200/images/${el.image.data}`: null} 
                        alt="cover-img" width="170" height="170" style={{borderRadius: "4px"}}></img>
                        <p> {el.name.length > 30? `${el.name.substring(0,31)}...`: el.name}</p>
                        <p className="product-list-price">₹{el.sellingPrice}</p>
                        <p className="og-price">{el.ogPrice}</p>
                        <p className="discount">{`${Math.round((el.ogPrice-el.sellingPrice) * 100/el.ogPrice)}`}% off</p>
                        </li> 

                        </Link></Paper>
                    }) : null
                }
                </ul>
            </div> :
            <div>
            <div className="products-for-u">
            <h4>Products for you</h4>
            <ul className="product-list-container">
            {
            products.length > 0? 
                products.map(el => {
                    return <Paper elevation={2} className="flex-item-home" sx={{width: "200px", height: "277px"}}><Link to={`/product-details/${el._id}`} style={{textDecoration: "none", color: "black"}}><li className="product-list-item">
                        <img src={el.image? `http://localhost:4200/images/${el.image.data}`: null} 
                        alt="cover-img" width="170" height="170" style={{borderRadius: "4px"}}></img>
                        <p> {el.name.length > 30? `${el.name.substring(0,31)}...`: el.name}</p>
                        <p className="product-list-price">₹{el.sellingPrice}</p>
                        <p className="og-price">{el.ogPrice}</p>
                        <p className="discount">{`${Math.round((el.ogPrice-el.sellingPrice) * 100/el.ogPrice)}`}% off</p>
                        </li> 

                        </Link></Paper>
                }) : null
            }
            </ul>
            </div>
            <div className="products-for-u">
                <h4>Dairy</h4>
                <ul className="product-list-container">
                {
                    products.length > 0? 
                    products.filter(el => el.category === "Dairy").map(el => {
                        return <Paper elevation={2} className="flex-item-home" sx={{width: "200px", height: "277px"}}><Link to={`/product-details/${el._id}`} style={{textDecoration: "none", color: "black"}}>
                            <li className="product-list-item">
                            <img src={el.image? `http://localhost:4200/images/${el.image.data}`: null} 
                            alt="cover-img" width="170" height="170" style={{borderRadius: "4px"}}></img>
                        <p> {el.name.length > 30? `${el.name.substring(0,31)}...`: el.name}</p>
                        <p className="product-list-price">₹{el.sellingPrice}</p>
                        <p className="og-price">{el.ogPrice}</p>
                        <p className="discount">{`${Math.round((el.ogPrice-el.sellingPrice) * 100/el.ogPrice)}`}% off</p>
                            </li>
                            </Link>
                        </Paper>
                    }) : null
                }
                </ul>
            </div>
            <div className="products-for-u">
                <h4>Vegetables</h4>
                <ul className="product-list-container">
                {
                    products.length > 0? 
                    products.filter(el => el.category === "Vegetable").map(el => {
                        return <Paper elevation={2} className="flex-item-home" sx={{width: "200px", height: "277px"}}><Link to={`/product-details/${el._id}`} style={{textDecoration: "none", color: "black"}}>
                            <li className="product-list-item">
                            <img src={el.image? `http://localhost:4200/images/${el.image.data}`: null} 
                            alt="cover-img" width="170" height="170" style={{borderRadius: "4px"}}></img>
                        <p> {el.name.length > 30? `${el.name.substring(0,31)}...`: el.name}</p>
                        <p className="product-list-price">₹{el.sellingPrice}</p>
                        <p className="og-price">{el.ogPrice}</p>
                        <p className="discount">{`${Math.round((el.ogPrice-el.sellingPrice) * 100/el.ogPrice)}`}% off</p>
                            </li>
                            </Link>
                        </Paper>
                    }) : null
                }
                </ul>
            </div>
            </div>
            }
        </div>
        <Footer/>
       
        </>
    )
}