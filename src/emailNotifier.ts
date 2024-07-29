import * as dotenv from "dotenv";
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
dotenv.config();


const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

export const sendEmailNotification = async (to: string, subject: string, text: string) => {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      text,
    });
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
