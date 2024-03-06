import { Button, Divider, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProductToOrderInState, deleteProductFromOrderInState } from "./orderSlice";
import baseUrl from "../../config";
import { useState } from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CartItem = ({ oneOrder }) => {


    let dispatch = useDispatch();
    let arr = useSelector((state) => state.order.ordersArr)
    const currentProduct = arr.find(item => item.productCode === oneOrder.productCode);


    let [qty, setQty] = useState(currentProduct?.quantity)///check

    const addQty = () => {// להעביר להוק
        if (qty < 10) {
            setQty(qty + 1)
            const updateQuantity = { ...oneOrder, quantity: 1 };
            dispatch(addProductToOrderInState(updateQuantity));
        }
    }

    const removeQty = () => {
        if (qty > 1) {
            setQty(qty - 1)
            const updateQuantity = { ...oneOrder, quantity: -1 };
            dispatch(addProductToOrderInState(updateQuantity));
        }
    }


    const removeProductFromOrder = () => {

        dispatch(deleteProductFromOrderInState(oneOrder.productCode))
    }

    return (<>

     
        <Divider sx={{ width: "50vw", marginLeft: "25vw" }} />
        <tr className="container-items-cart">
            <td className="item-cart-product">
                <img src={`${baseUrl}/${oneOrder.imgUrl}`} width='100vw' />
                <div>
                    <h2 >{oneOrder.name} </h2>
                    <h2>{oneOrder.price} ₪</h2>
                </div>
            </td>

            <td className="item-cart-qty">
                <div  className="qty-cart">
                    <IconButton onClick={addQty}><AddIcon sx={{ width: 20 }} /> </IconButton>
                    {qty}
                    <IconButton onClick={removeQty}><RemoveIcon sx={{ width: 20 }} /></IconButton>
                </div>
                <button class="custom-button" onClick={removeProductFromOrder}
                  >הסר מהסל
                </button>
            </td>

            <td className="item-cart-total"><h2>{oneOrder.price * oneOrder.quantity} ₪</h2></td>
        </tr>

    </>);
}

export default CartItem;