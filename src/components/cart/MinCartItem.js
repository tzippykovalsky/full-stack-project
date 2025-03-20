import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

import { deleteProductFromOrderInState } from "../../features/orderSlice";
import baseUrl from "../../config/config";


const MinCartItem = ({ oneOrder }) => {

    let dispatch = useDispatch();
    const removeProductFromOrder = (event) => {
        event.stopPropagation()
        dispatch(deleteProductFromOrderInState(oneOrder.productCode))
    }

    return (<>
        <div className="min-cart-item">
             <div>
                <img src={`${baseUrl}/${oneOrder.imgUrl}`} className="min-cart-div-img" />
            </div>
            <div className="min-cart-details">
                <h4 className='min-cart-h4'>{oneOrder.name}</h4>
                <h4 className=''>כמות: {oneOrder.quantity} </h4>
                <h4 className=''>סהכ למוצר: {oneOrder.price * oneOrder.quantity} ש"ח</h4>

                <Button onClick={removeProductFromOrder}
                    sx={{ borderColor: "black", color: "black", borderRadius: "0px" }} variant="outlined">הסר מהסל
                </Button>
            </div>
           

        </div>
    </>);
}

export default MinCartItem;