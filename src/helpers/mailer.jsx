import dotenv from "dotenv";
import { createTransport } from "nodemailer";
import { google } from "googleapis";
import connect from "@/dbConfig/dbConfig";
const OAuth2 = google.auth.OAuth2;
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
dotenv.config();
export const sendEmail = async ({ email, emailType, userId }) => {
  dotenv.config();
  await connect();
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    var saved;
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
    console.log("saved is :", saved, " BOOLEAN IS :", !saved);
    if (!saved) {
      return;
    }
    const createTransporter = async () => {
      try {
        const oauth2Client = new OAuth2(
          process.env.GOOGLE_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN,
        });

        const accessToken = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              console.log("*GET ACCESS TOKEN ERR: ", err);
              reject();
            }
            resolve(token);
          });
        });
        const transporter = createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.NODEMAILER_EMAIL_ADDRESS,
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken,
          },
        });
        return transporter;
      } catch (err) {
        return err;
      }
    };

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
    let emailTransporter = await createTransporter();
    const mailResponse = await emailTransporter?.sendMail(mailOptions);
    return mailResponse;
  } catch (err) {
    console.log("ERROR INSIDE sendMailFunction: ", err);
  }
};
