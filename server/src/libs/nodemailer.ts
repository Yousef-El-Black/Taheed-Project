import nodemailer from "nodemailer";
import { EMAIL_GMAIL, EMAIL_PASS } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_GMAIL,
    pass: EMAIL_PASS,
  },
});

// Send Email
export const sendMail = (email: string, subject: string, text: string) => {
  transporter.sendMail(
    { from: EMAIL_GMAIL, to: email, subject, text },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
