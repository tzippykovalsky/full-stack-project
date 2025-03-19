import axios from "axios";
import baseUrl from "../config";


export const addUserToServer = (user) => {
    return axios.post(`${baseUrl}/api/users/signup`, user)
     
}

export const signInUserToServer = (user) => {
    return axios.post(`${baseUrl}/api/users`, user)
     
}

export const signInWithGoogleToServer = (email) => {
    return axios.post(`${baseUrl}/api/users/signInGoogle`, email)
     
}

export const signUpWithGoogleToServer = (user) => {
    return axios.post(`${baseUrl}/api/users/signUpWithGoogle`, user)
     
}


export const sendMailToServer = (mailDetails) => {
    return axios.post(`${baseUrl}/api/users/sendMail`, mailDetails)
     
}