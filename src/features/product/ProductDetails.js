import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import { addProductToOrderInState } from "../order/orderSlice";
import "./productDetails.css";
import baseUrl from "../../config";
import useQty from "../../hooks/useQty";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import MinCart from "../order/MinCart";


const ProductDetails = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    let location = useLocation();
    let { name, price, imgUrl, color, size, inSale, category, description } = location.state;
    let dispatch = useDispatch();
    let { qty, removeQty, addQty } = useQty()


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (newOpen == true) {
            handleAddProductToOrder()
        }

    };

    const DrawerList = (
        <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
            <MinCart />
            <Divider />
        </Box>
    );


    const handleGoBack = () => {
        navigate(-1);
    };


    const handleAddProductToOrder = () => {
        let { _id, name, price, imgUrl, inSale } = location.state
        console.log(location.state);
        const updatedItemData = { ...{ productCode: _id, name, price, imgUrl }, quantity: qty };
        dispatch(addProductToOrderInState(updatedItemData));
    }

    return (<>

        <div className="div-details">


            <div className="div-img-product">
                <img className="img-product" src={`${baseUrl}/${imgUrl}`} />
            </div>

            <div className="div-details-wide">
                <h1 className="name-prod-h1">{name}</h1>
                <Divider />
                <h2 className="price-h2">  {price} ₪</h2>
                <div className="div-description">{description && <div>{description}</div>}</div>
                {/* {size && (<div>מידה: {size}</div>)}
                {color && (<div>צבע: {color} </div>)}              
                {category && (<div>{category}</div>)} */}

                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <div className="div-qty-addCart">
                    <div className="qty-product">
                        <IconButton onClick={addQty}><AddIcon sx={{ width: 20 }} /> </IconButton>
                        {qty}
                        <IconButton onClick={removeQty}><RemoveIcon sx={{ width: 20 }} /></IconButton>
                    </div>
                    <Button onClick={toggleDrawer(true)} className="btn"
                        sx={{
                            flex: 2,

                            backgroundColor: 'rgba(156, 136, 110)'
                            , color: "white", borderRadius: "0px",
                            '&:hover': {
                                backgroundColor: 'rgba(180, 164, 144)'
                            }
                        }}
                    >הוספה לסל</Button>
                </div>
                <button className="base-hover-button" onClick={handleGoBack}>חזרה לחנות</button>
            </div>
        </div>
    </>);
}

export default ProductDetails;