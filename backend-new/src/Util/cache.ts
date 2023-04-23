import cache from "node-cache";
import nodemailer from "nodemailer";
const db = new cache();
export const sendEmailCrate = (
  email: string,
  password: string,
  name: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "support@tanwishlife.com",
      pass: "letsbagp#123A",
    },
  });
  transporter.sendMail({
    subject: "Username password",
    from: "support@tanwishlife.com",
    to: email,
    html: `
        Dear Participant ${name}<br/>
                Congratulations for your successful Creating your account <br/>
                Your Accounts details are as follows <br/>
                <ul><li>Link https://institute.tanwishlife.com/login</li>
                <li>ID :<b>${email}</b></li>
                <li>password :<b>${password}</b></li>
                </ul>
                If you have any queries feel free to reach out to us at<br/>
                support@tanwishlife.com <br/>
                Regards,<br/>
                Tanwish Institute of Health and Wellness
            `,
  });
};
const sendEmail = (otp: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "support@tanwishlife.com",
      pass: "letsbagp#123A",
    },
  });
  transporter.sendMail({
    subject: "OTP",
    from: "support@tanwishlife.com",
    to: email,
    html: `
              <h1>OTP</h1>
              <h5>${otp}</h5>
              <p>The OTP will be available for the next 10 minutes.</p>
              <br/>
              <br/>
              <br/>
              Regards,<br/>
              Tanwish Institute of Health and Wellness

        `,
  });
};
const otp = () => {
  const digits = "0123456789";
  let OTP = "";
  for (var i = 1; i <= 4; i++) {
    OTP += digits[Math.floor(Math.random() * digits.length)];
  }
  return OTP;
};
export const setCache = (data: string) => {
  const date = new Date();
  const next_10min = new Date().setMinutes(date.getMinutes() + 10);
  const otps = otp();
  sendEmail(otps, data);
  return db.set(data + "_otp", otps, next_10min);
};
export const getData = (email: string, otp: string) => {
  if (db.get(email + "_otp")) return db.get(email + "_otp") == otp;
  else "OTP is invalid or times up";
};
