import {useState} from "react";
import Button from '@mui/material/Button';
import Navbar from "../components/Navbar";
import axios from "axios";
import {Alert} from "@mui/material";
import Footer from "../components/Footer";


export default function Form (){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [category, setCategory] = useState("Others");
    const [shelf, setShelf] = useState('');
    const [unit, setUnit] = useState('');
    const [ogPrice, setOgPrice] = useState('');
    
    const categories = ["Bakery", "Beverages", "Dairy", "Dry fruits", "Eggs & Meat", "Fruits",  "Household essentials", "Lentils",
    "Snacks", "Chocolates"
    ,"Utensils", "Vegetable",
    ,"Others"]
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("price", price);
        formData.append("ogPrice", ogPrice);
        formData.append("category", category);
        formData.append("image", image);
        formData.append("shelf", shelf);
        formData.append("unit", unit)
        console.log(formData.files);

        axios.post(`http://localhost:4200/v1/products/addProduct`, 
        formData, {
            headers: {
                'content-type': 'multipart/form-data'}}) //content-type is very imp. else your request won't work
        .then(res => {
            setSuccess(true);
            setName("");
            setDesc("");
            setPrice("");
            setOgPrice("");
            setCategory("Others")
            setImage([]);
            setShelf("");
            setUnit("");
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        })
        .catch((err) => {
            console.log(err)
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
        })
        
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    return(<>
    <Navbar />

        {
            success? <Alert severity="success">Hurrayyy! Product successfully uploaded.</Alert> : null
        }
        {
            error? <Alert severity="error">OOPS! Product can't be uploaded.</Alert>: null
        }
    <div className="form-container">
    <h3 className="add-form-heading">Add a product</h3>
    <form method="POST" encType="multipart/form-data" className="product-upload-form">
    <label htmlFor="name" className="form-label" >Product name:</label>
    <input type="text" name="name" className="form-input text-input" value={name} onChange={e => setName(e.target.value)} /><br />
    <label htmlFor="desc" className="form-label">Description:</label>
    <textarea name="desc" value={desc} className="form-input" rows="4" onChange={e => setDesc(e.target.value)}></textarea><br />
    <label htmlFor="category" className="form-label">Category:</label>
    <select name-="category" className="form-input" value={category} onChange={handleCategoryChange}>
        {
            categories.map((el) => {
                return <option value={el}>{el}</option>
            })
        }
    </select><br />
    <label htmlFor="price" className="form-label">Selling Price:</label>
    <input type="Number" name="price" className="form-input text-input" value={price} onChange={e => setPrice(e.target.value)}/><br />
    <label htmlFor="ogPrice" className="form-label">Original Price:</label>
    <input type="Number" name="ogPrice" className="form-input text-input" value={ogPrice} onChange={e=>setOgPrice(e.target.value)}/><br />
    <label htmlFor="shelf" className="form-label">Product shelf life:</label>
    <input type="text" name="shelf" className="form-input text-input" value={shelf} onChange={e => setShelf(e.target.value)}/><br />
    <label htmlFor="unit" className="form-label">Unit(e.g-500gm/1kg):</label>
    <input type="text" name="unit" className="form-input text-input" value={unit} onChange={e => setUnit(e.target.value)}/><br />
    <label htmlFor="name" className="form-label">Image upload:</label>
    <input multiple type="file" onChange={(e) => {setImage(e.target.files[0])}} name="image" /><br />
    <Button variant="contained" size="small" type="submit" sx={{maxWidth: "10px", marginTop: "10px", textTransform: "none" }} onClick={handleSubmit}>Submit</Button>
    </form>
    </div>
    <Footer />
    </>)
}