import {useState} from "react";
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import {addProducts} from "../features/products/productsSlice";
import { useSelector } from "react-redux";
import { fetchSearchedProducts } from "../features/products/productsSlice";



export default function Search(){
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const searchFlag = useSelector((state) => state.products.searchFlag);

    const handleSearch = async (e) => {
      e.preventDefault();
      // const searchResults = await axios.get(`http://localhost:4200/v1/products/`, {
      //   params: {
      //     searchQuery
      //   }
      // });
      dispatch(fetchSearchedProducts(searchQuery));
      // dispatch(addProducts({
      //   searchResults
      // }))
    }

    return(<>
    {/* <ThemeProvider theme={theme}>
    </ThemeProvider> */}
    <div className="search-container">
    <form method="GET" onSubmit={handleSearch}>
    <TextField id="outlined-basic" label="what are you looking for?" variant="outlined"
    sx={{width: "450px", marginTop: "10px", color: "white", '@media (max-width: 1200px)': {
        width: '200px'
      }, '@media (max-width: 450px)': {
        width: '150px'
      }
    , ".MuiInputBase-input": {backgroundColor: "white", height: "10px", borderRadius: "10px 0px 0px 10px"}
    }} className="text-field" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
    <Button variant="contained" sx={{marginTop: "10px", height: "42px", borderRadius: "0px 10px 10px 0px"}} onClick={handleSearch}><SearchIcon /></Button>
    </form>
    </div>
   
    </>)
}