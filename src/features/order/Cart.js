import { useSelector } from "react-redux";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { getTotalQuantity, getTotalSum } from "../../calcOnArr";
import { Divider } from "@mui/material";
import BlessingComponent from "../../components/BlessingComponent";

const Cart = () => {
  let navigate = useNavigate();

  const backToShop = () => {
    navigate('/all-products/')
  }
  const goToEndOrder = () => {
    navigate('/endOfOrder')
  }

  let ordersArr = useSelector((state) => state.order.ordersArr);
  const totalSum = getTotalSum(ordersArr);
  const totalQuantity = getTotalQuantity(ordersArr);
  return (<>  
    <h2 className="title-cart"> עגלת קניות</h2>
    <div style={{ display: "flex", direction: "rtl" }}>

      {ordersArr.length > 0 ? (
        <table className="table-cart">
          <tr className="table-title">   
            {/* <div className="table-title"> */}
            <th className="title-item">מוצר</th>
            <th className="title-item">כמות</th>
            <th className="title-item">סה"כ</th>
            {/* </div> */}
          </tr>

          <ul className="cart-details">
            {ordersArr.map((item) => (
              <li key={item.productCode}><CartItem oneOrder={item} /></li>
            ))}
          </ul>
        </table>) : <div className="div-empy-cart">העגלה שלך ריקה</div>}

      <div className="div-total">
        <BlessingComponent />
        <Divider sx={{ marginTop: "5vh", width: "16.5vw" }} />
        <h2 className="total-h2">סה"כ: ₪{totalSum} </h2>
        <h2 className="total-h2"> סך המוצרים:{totalQuantity}</h2>
        {ordersArr.length > 0 ? (<button onClick={goToEndOrder} className="base-hover-button"> סיום הזמנה</button>) : <button onClick={backToShop} className="base-hover-button ">המשך לחנות </button>}
      </div>
      {/* <Divider sx={{ width: "50vw", marginLeft: "40vw" }} /> */}

    </div>
  </>);
}

export default Cart;