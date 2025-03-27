
import { Navigate } from "react-router-dom";
import { sendMailToServer } from "../api/emailService";
import { getUnauthorizedAccessEmail } from "../utils/email/emailMessages";
import axios from "axios";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
  let user = localStorage.getItem('myUser')

  async function getUserIP() {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.log(error);
      return "לא ידוע";
    }
  }

  async function sendMail() {
    const ip = await getUserIP();
    const attemptedPage = window.location.pathname;
    try {
      let details = await getUnauthorizedAccessEmail(user?.email, ip, attemptedPage);
      console.log(details);

      await sendMailToServer(details);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user || JSON.parse(user).role === 1) {
      sendMail();
    }
  }, []);

  if (!user || JSON.parse(user).role === 1) {
    return <Navigate to='/login' />
  }
  return children;


}

export default ProtectedRoute;