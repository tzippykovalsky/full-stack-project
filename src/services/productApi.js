import axios from "axios";
import baseUrl from "../config";



export const getAllProductsFromServer = (page, searchText, category) => {
    return axios.get(`${baseUrl}/api/products/?searchText=${searchText}&page=${page}&category=${category}`);
}

export const getProductByIdFromServer = (id) => {
    return axios.get(`${baseUrl}/api/products/${id}`);
}

export const deleteProductFromServer = (id, token) => {
    return axios.delete(`${baseUrl}/api/products/${id}`, {
        headers: { "access-token": token },
    })
}
export const addProductToServer = (product, token) => {
    return axios.post(`${baseUrl}/api/products`, product, {
        headers: {
            "access-token": token,
            'Content-Type': 'multipart/form-data'
        }
    })
}


export const updateProductInServer = (id, product, token) => {
    return axios.put(`${baseUrl}/api/products/${id}`, product, {
        headers: { "access-token": token }
    })
}

export const getNumPagesFromServer = (category) => {
    return axios.get(`${baseUrl}/api/products/numPages/?category=${category}`);
}
