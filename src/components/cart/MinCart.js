import * as React from 'react';
import { DialogContentText,Button, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import "../../styles/minCart.css";
import MinCartItem from './MinCartItem';
import Delivery from '../Delivey';



const MinCart = () => {

  let navigate = useNavigate();
  let ordersArr = useSelector((state) => state.order.ordersArr);

  const goToEndOrder = () => {
    navigate('/checkout/')
  }

  const backToShop=()=>{
    navigate(`/all-products/`)
  }

  return (

    <div className='cart-container-main'>
      <div className='cart-container'>
        <CloseIcon sx={{ marginTop: "1.5vw", marginLeft: "1.5vw" }} />
        <DialogTitle id="alert-dialog-title">{"Shopping Cart"}</DialogTitle>
         <Delivery/>
        <Divider />
        {ordersArr.length === 0 ? (
          <Typography variant="body1"  sx={{margin:"6px"}}>Your shopping cart is empty.</Typography>
        ) : (
          <div className='cart-products'>
            <ul className='min-cart-list'>
              {ordersArr.map((item) => (
                <li key={item.productCode}><MinCartItem oneOrder={item} /></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Divider />
      {ordersArr.length > 0 ? (
        <button onClick={goToEndOrder} className="base-hover-button btn-go-end-order">סיום הזמנה</button>
      ) :     <button onClick={backToShop} className="base-hover-button btn-go-end-order">המשך לחנות</button>}
    </div>

  );
};

export default MinCart;

