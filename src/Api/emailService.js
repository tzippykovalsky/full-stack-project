import axios from "axios";
import baseUrl from "../config";
import { generateEmailHtml } from "../utils/email/emailTemplates";

export const sendMailToServer = (mailDetails) => {
    const htmlContent = generateEmailHtml(mailDetails.subject, mailDetails.text);
    return axios.post(`${baseUrl}/api/email`, {...mailDetails, htmlContent})   
}