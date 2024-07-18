import {useState} from "react";
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from "@mui/material";



export default function Search(){
    // const theme = createTheme({
    //     components: {
    //         MuiButton: {
    //             styleOverrides:{
    //             root: {
    //                 width: "5px",
    //                 marginTop: "5px"
    //             }
    //         }
    //         }
    //     }
    // })
    const [query, setQuery] = useState("");
    return(<>
    {/* <ThemeProvider theme={theme}>
    </ThemeProvider> */}
    <div className="search-container">
    <form>
    <TextField id="outlined-basic" label="what are you looking for?" variant="outlined"
    sx={{width: "450px", marginTop: "10px", color: "white", '@media (max-width: 1200px)': {
        width: '200px'
      }, '@media (max-width: 450px)': {
        width: '150px'
      }
    , ".MuiInputBase-input": {backgroundColor: "white", height: "10px", borderRadius: "10px 0px 0px 10px"}
    }} className="text-field" value={query} onChange={e => setQuery(e.target.value)}/>
    <Button variant="contained" sx={{marginTop: "10px", height: "42px", borderRadius: "0px 10px 10px 0px"}}><SearchIcon /></Button>
    </form>
    </div>
   
    </>)
}