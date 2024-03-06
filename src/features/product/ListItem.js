import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProductFromServer } from "./productApi";
import "./listItem.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import baseUrl from '../../config';
import EditIcon from '@mui/icons-material/Edit';
import { addProductToOrderInState } from '../order/orderSlice';
import { Alarm } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MinCart from "../order/MinCart";




const ListItem = ({ oneProduct, onProductDelete }) => {



    const [openCart, setOpenCart] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [showAdditionalImage, setShowAdditionalImage] = useState(false);
    let currentUser = useSelector(state => state.user.currentUser)
    let dispatch = useDispatch()

    const handleMouseOver = () => {
        setShowAdditionalImage(true);
    };

    const handleMouseLeave = () => {
        setShowAdditionalImage(false);
    };

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {

            setOpen(false);
            await deleteProductFromServer(oneProduct._id, currentUser.token)
            onProductDelete();
        }
        catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    }

    const handleAddProductToOrder = () => {//יש פעמיים אפשר להפריד לדף פונקציות
        let { _id, name, price, imgUrl } = oneProduct
        const updatedItemData = { ...{ productCode: _id, name, price, imgUrl }, quantity: 1 };
        dispatch(addProductToOrderInState(updatedItemData));
    }


    const toggleDrawer = (newOpen) => () => {
        setOpenCart(newOpen);
        if (newOpen == true) {
            handleAddProductToOrder()
        }

    };

    const DrawerList = (
        <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
            <MinCart />
        </Box>
    );

    return (
        <>
            <div className="product-item" onMouseLeave={handleMouseLeave}>
                <Link to={`/all-products/details/${oneProduct.name}`} state={oneProduct}>
                    <div className="product-image">
                        {showAdditionalImage && oneProduct.imgUrl2 ? (
                            <img src={`${baseUrl}/${oneProduct.imgUrl2}`} alt={oneProduct.name} />
                        ) : (
                            <img src={`${baseUrl}/${oneProduct.imgUrl}`} alt={oneProduct.name} onMouseOver={handleMouseOver} />
                        )}
                    </div>
                </Link>
                <h3>{oneProduct.name}</h3>
                <p>₪ {oneProduct.price}</p>
                {currentUser && currentUser.role === 2 ? (
                    <>
                        <IconButton onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={handleClickOpen}>
                            <EditIcon />
                        </IconButton>
                    </>
                ) : (

                    <div>
                        <Button onClick={toggleDrawer(true)}
                            sx={{
                                borderColor: "black", color: "black", borderRadius: "0px", backgroundColor: 'rgba(180, 164, 144)', '&:hover': {
                                    backgroundColor: 'rgba(156, 136, 110)', borderColor: "black", color: "black"
                                }
                            }} variant="outlined">הוסף לסל</Button>

                        <Drawer open={openCart} onClose={toggleDrawer(false)}>
                            {DrawerList}

                        </Drawer>
                    </div>

                )}




                <Dialog sx={{ width: "20vw", marginLeft: "40%", direction: "rtl" }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h3>{oneProduct.name}</h3>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ margin: "3px" }}>
                            האם אתה בטוח שברצונך למחוק את המוצר  ?
                            <br />
                            שים לב פעולה זו תמחוק את המוצר לצמיתות.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>ביטול</Button>
                        <Button onClick={handleDelete} autoFocus>מחיקה </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>

    );
};

export default ListItem;
