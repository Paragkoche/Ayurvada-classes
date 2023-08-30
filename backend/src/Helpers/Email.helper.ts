import { createTransport } from "nodemailer";
import db from "@/Database";
import { User } from "@/Database/Entity/Users.entity";
import { OTP } from "@/Database/Entity/Otp.entity";

const userDB = db.getRepository(User);
const OtpDB = db.getRepository(OTP);

const mailer = createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@tanwishlife.com",
    pass: "letsbagp#123A",
  },
});

export const send_otp = async (email: string) => {
  const numbers = "1234567890";
  const otp = [...new Array(4)]
    .map(() => numbers[Math.floor(Math.random() * numbers.length)])
    .join("");
  await mailer.sendMail({
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

  const user = await userDB.findOne({
    where: {
      email,
    },
  });
  const _otp = await OtpDB.save(
    OtpDB.create({
      otp,
      User: user,
    })
  );

  return _otp;
};

export const re_send_otp = async (email: string) => {
  const numbers = "1234567890";
  const otp = [...new Array(4)]
    .map(() => numbers[Math.floor(Math.random() * numbers.length)])
    .join("");
  await mailer.sendMail({
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
  const user = await userDB.findOne({
    where: {
      email,
    },
  });
  const _otp_id = await OtpDB.findOne({
    where: {
      User: {
        id: user.id,
      },
    },
  });
  if (!_otp_id) {
    const user = await userDB.findOne({
      where: {
        email,
      },
    });
    const _otp = await OtpDB.save(
      OtpDB.create({
        otp,
        User: user,
      })
    );
    return _otp;
  } else {
    const _otp = await OtpDB.update(_otp_id.id, {
      otp,
    });

    return _otp;
  }
};
