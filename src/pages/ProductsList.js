import { useEffect, useState, useRef } from "react";
import ListItem from "../components/product/ProductItem";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentPageOnSiteToState, saveNumPagesToState } from "../features/productSlice";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import '../styles/productsList.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, CircularProgress, LinearProgress, Button, Drawer, List } from "@mui/material";
import { getNumPagesFromServer ,getAllProductsFromServer} from "../Api/productService";



const ProductsList = () => {

    let [searchParams]=useSearchParams();
    let category = searchParams.get("category")||"ללא";
    let [arr, setArr] = useState([]);//המוצרים באתר לפי עמוד
    let [search, setSearch] = useState("")
    let searchRef = useRef(null)
    let dispatch = useDispatch();
    let num = useSelector((state) => state.product.numberOfPages);//הולך להביא מספר עמודים מהסטייט הכללי
    let currentPage = useSelector((state) => state.product.currentPageOnSite);

    const [refreshFlag, setRefreshFlag] = useState(false);

    const handleRefresh = () => {
        setRefreshFlag(!refreshFlag);
    };


    const handlePageChange = (event, page) => {
        dispatch(saveCurrentPageOnSiteToState(page))

    };


    const fetchNumPages = async () => {
        try {
            let res = await getNumPagesFromServer(category);//הולך לשרת להביא מספר עמודים
            let roundedNumPages = Math.ceil(res?.data); // Round up the data
            dispatch(saveNumPagesToState(roundedNumPages))//ממלא את הסטייט הכללי 
        }
        catch (err) {
            console.log(err);
            alert(err.response?.data);
        }

    }



    //פונקציה שמביאה בפועל את המוצרים לפי עמוד
    const getProductToArr = async () => {
        try {
            let res = await getAllProductsFromServer(currentPage, search,category);

            setArr(res?.data);
            console.log(res?.data);
        }
        catch (err) {
            console.log(err);
            alert(err.response?.data);
        }
    }


    function handleSearch() {
        // alert(searchRef.current.value)
        let searchValue = searchRef.current.value;
        setSearch(searchValue);
        dispatch(saveCurrentPageOnSiteToState(1))
    }


    useEffect(() => {

       //????????????????איפה להפעיל אותו 
        getProductToArr();
        fetchNumPages();
    }, [search, currentPage, category, refreshFlag])

    useEffect(() => {

        dispatch(saveCurrentPageOnSiteToState(1))

    }, [category])

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };










    return (<>
        <div className="container-all-products-list">
            {!arr.length ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ marginBottom: "40vh" }} color="inherit" />
                </Box>

            ) :
                <>
                
                    <Paper
                        component="form"
                        sx={{marginLeft:"84vw", p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputRef={searchRef} />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch} >
                            <SearchIcon />
                        </IconButton>
                    </Paper>


                    <ul className="product-list">
                        {arr.map((item) => (
                            <li key={item._id}>


                                <ListItem oneProduct={item} onProductDelete={handleRefresh} />

                            </li>
                        ))}
                    </ul>

                    <Stack spacing={2} sx={{ marginBottom: "3vh", marginLeft: "42%" }}>

                        <style>
                            {` @keyframes slideIn {  0% { width: 0; }  100% {width: 100%; } }`}
                        </style>

                        <Pagination
                            count={num}//פה אמור להיות כתוב מספר העמודים הכללי באתר
                            renderItem={(item) => (
                                <PaginationItem
                                    // sx={{
                                    //     textDecoration: item.page === currentPage ? "underline" : "none",
                                    //     textDecorationThickness: "1px",
                                    //     textDecorationSkipInk: "11.5rem"
                                    // }}
                                    sx={{
                                        marginTop: "5vh",
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            height: "2px",
                                            backgroundColor: item.page === currentPage ? "black" : "transparent",
                                            zIndex: 1,
                                            animation: item.page === currentPage ? "slideIn 0.5s forwards" : "none",
                                        },
                                    }}
                                    slots={{ previous: KeyboardArrowLeftIcon, next: KeyboardArrowRightIcon }}
                                    {...item}
                                    selected={item.page === currentPage}
                                />
                            )}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </>}
            <Outlet />
        </div>
    </>);
}

export default ProductsList;    