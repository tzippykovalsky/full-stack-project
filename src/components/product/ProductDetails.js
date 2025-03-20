import * as React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button, IconButton, Box, Drawer, Divider, CircularProgress } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { addProductToOrderInState } from "../../features/orderSlice";
import "../../styles/productDetails.css";
import baseUrl from "../../config/config";
import useQty from "../../hooks/useQty";
import MinCart from "../cart/MinCart";
import { getProductByIdFromServer } from '../../Api/productService';

const ProductDetails = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { item } = useParams();
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);  // מצב טעינה
    const dispatch = useDispatch();
    const { qty, removeQty, addQty } = useQty();

    //על מנת שיוכלו לשלוח קישורים הורדתי את התלות בלוקיישן
    //     let location = useLocation();
    //     let { name, price, imgUrl, color, size, inSale, category, description } = location?.state;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (newOpen) {
            handleAddProductToOrder();
        }
    };

    const getItemById = async () => {
        try {
            const response = await getProductByIdFromServer(item);
            setProduct(response.data);
        } catch (ex) {
            console.error(ex);
        }
        finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getItemById();
    }, [item]);

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
        if (product) {
            const updatedItemData = {
                productCode: product._id,
                name: product.name,
                price: product.price,
                imgUrl: product.imgUrl,
                quantity: qty
            };
            dispatch(addProductToOrderInState(updatedItemData));
        }
    };

    return (
        <div className="div-details">
            {loading ? (
                <div className="loading-container">
                    <CircularProgress />
                    <p>טעינה...</p>
                </div>
            ) : (
                <>
                    <div className="div-img-product">
                        <img className="img-product" src={`${baseUrl}/${product.imgUrl}`} alt={product.name} />
                    </div>

                    <div className="div-details-wide">
                        <h1 className="name-prod-h1">{product.name}</h1>
                        <Divider />
                        <h2 className="price-h2">{product.price} ₪</h2>
                        <div className="div-description">{product.description}</div>

                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>

                        <div className="div-qty-addCart">
                            <div className="qty-product">
                                <IconButton onClick={addQty}><AddIcon sx={{ width: 20 }} /></IconButton>
                                {qty}
                                <IconButton onClick={removeQty}><RemoveIcon sx={{ width: 20 }} /></IconButton>
                            </div>
                            <Button
                                onClick={toggleDrawer(true)}
                                className="btn"
                                sx={{
                                    flex: 2,
                                    backgroundColor: 'rgba(156, 136, 110)',
                                    color: "white",
                                    borderRadius: "0px",
                                    '&:hover': {
                                        backgroundColor: 'rgba(180, 164, 144)'
                                    }
                                }}
                            >
                                הוספה לסל
                            </Button>
                        </div>
                        <button className="base-hover-button" onClick={handleGoBack}>חזרה לחנות</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetails;
