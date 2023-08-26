import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { google } from "googleapis";
import connect from "@/dbConfig/dbConfig";
// import { oauth2 } from "googleapis/build/src/apis/oauth2";
export const sendEmail = async ({ email, emailType, userId }) => {

  try {
    const OAuth2 = google.auth.OAuth2;
    await connect();
    console.log(email, emailType, userId);
    //create hash-token
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    var saved 
    if (emailType === "VERIFY") {
      saved = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            verifyToken: hashToken,
            verifyTokenExpiration: Date.now() + 24 * 60 * 60 * 1000,
          },
        }
      );
    } else if (emailType === "RESET") {
      saved = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            forgotPasswordToken: hashToken,
            forgotPasswordTokenExpiration: Date.now() + 24 * 60 * 60 * 1000,
          },
        }
      );
    }
    console.log("Saved is",saved)
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://localhost:3000/api/auth/signup"
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err)
          reject();
        }
        resolve(token); 
      });
    });
    if(!saved) {return}
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        accessToken,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL_ADDRESS,
      to: email,
      subject:
        emailType === "VERIFY" ? "Email Verification" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p> Click <a href='${process.env.DOMAIN}/api/verification/verify-email/token?token=${hashToken}'>here</a></p>`
          : `
          <p>
            {" "}
            Click{" "}
            <a href="${process.env.DOMAIN}/api/verification/reset-password/token?token=${hashToken}">
              here
            </a>
          </p>
          `,
    };
    // console.log("FROM MAILER",transporter)
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
