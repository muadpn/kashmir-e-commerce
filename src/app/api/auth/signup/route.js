// import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {
  EmailValidator,
  UsernameValidator,
  iSPasswordValid,
} from "@/validations/SignUpValidations";
import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request) {
  await connect();
  console.log("am here");
  try {
    const reqBody = await request.json();
    const { Username, Email, Password, ConfirmPassword } = reqBody;
    if ((!Username | !Email, !Password, !ConfirmPassword)) {
      return NextResponse.json(
        { error: "Invalid Input Details" },
        { status: 400 }
      );
    }
    const isEmailValid = EmailValidator(Email);
    const isUsernameValid = UsernameValidator(Username);
    const isPasswordValid = iSPasswordValid(Password, ConfirmPassword);
    const ExistingUser = await User.findOne({ email: Email });
    if (!isEmailValid || !isPasswordValid || !isUsernameValid) {
      return NextResponse.json(
        { error: "Invalid Input Details" },
        { status: 400 }
      );
    }
    if (ExistingUser?.hashedPassword) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    //HASHED PASSWORD
    const hashedPassword = await bcryptjs.hash(Password, salt);

    // what if user exists on Oauth and not signup
    // 1526punkZ,
    if (ExistingUser?.oauthProviders.provider === "google") {
      const user = await User.findByIdAndUpdate(
        {
          _id: ExistingUser._id,
        },
        {
          $set: {
            username:Username,
            hashedPassword,
          },
        }
      );
      if (user) {
        return NextResponse.json(
          {
            message: "Logged in successfully",
            success: true,
            user,
          },
          { status: 200 }
        );
      }
    }
    if (!ExistingUser) {
      const NewUser = new User({
        username: Username,
        email: Email,
        hashedPassword,
        image: "",
        isVerified: false,
      });

      var savedUser = await NewUser.save();
      //send Verification email to user
      const MailerResponse = await sendEmail({
        email: savedUser.email,
        emailType: "VERIFY",
        userId: savedUser._id,
      });
      if (MailerResponse) {
        return NextResponse.json(
          {
            message: "Verify Email",
            success: true,
            savedUser,
          },
          { status: 200 }
        );
      }
    }
    // console.log(MailerResponse)

    return NextResponse.json(
      {
        message: "Verification send email failed",
        success: false,
        savedUser,
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// muadpn4342!
// muadpn4342!@gmail.com
