import axios from "axios";
import baseUrl from "../config/config";


export const getAllOrdersFromServer=(token)=>{
    return axios.get(`${baseUrl}/api/orders/allOrders/`, {
        headers: { "access-token": token },
   })
}

export const getMyOrdersFromServer = (token) => {
    return axios.get(`${baseUrl}/api/orders/`, {
        headers: { "access-token": token },
   });
}

export const deleteOrdersFromServer = (id, token) => {
    return axios.delete(`${baseUrl}/api/orders/${id}`, {
          headers: { "access-token": token },
     })
 }

export const addOrderToServer = (order, token) => {
    return axios.post(`${baseUrl}/api/orders`, order, {
        headers: { "access-token": token }
    })
}
 
export const updateOrderInServer = (id, token) => {    
    return axios.put(
        `${baseUrl}/api/orders/${id}`,
        {}, // גוף הבקשה ריק (או אפשר לשים כאן מידע אם צריך)
        {
            headers: { "access-token": token }, // זה המקום הנכון להדרס
        }
    );
};
