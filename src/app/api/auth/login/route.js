import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { UsernameValidator } from "@/validations/SignUpValidations";
import jwt from "jsonwebtoken";

import { connect } from "@/dbConfig/dbConfig";
import { signIn } from "next-auth/react";


export async function POST(request) {
 await connect();
  try {
    const reqBody = await request.json();
    const { Username, Password } = reqBody.FormData;
    if (UsernameValidator(Username) !== true) {
      return NextResponse.json("Not a valid Username", { status: 401 });
    }
    const user = await User.findOne({ username: Username });

    if (!user) {
      return NextResponse.json("User Does Not Exist", { status: 401 });
    }
    const passwordRegix =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%,*#?&])[A-Za-z\d@$!%*#?,&]{8,}$/;
    //check for valid credentials before Fetching from database

    //Checking for Password
    if (!Password.match(passwordRegix)) {
      return NextResponse.json("Not a valid Password", { status: 401 });
    }
    //Checking if Password is Correct
    const isPasswordCorrect = await bcryptjs.compare(Password, user.hashPassword);
    console.log("Reached Here!!!");
    if (!isPasswordCorrect) {
      return NextResponse.json("Invalid Password", { status: 401 });
    }
    //Create Token Data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // Create Token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });
    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });
    
    response.cookies.set("ACCESS_TOKEN", token, {
      httpOnly: true,
    });
    
    // console.log("This is From Backend",response)
    return response;
  } catch (error) {
    console.log("THIS IS ERROR!", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
