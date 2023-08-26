// import connect from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";

// await connect();

// export async function GET(request, { params }) {
//   console.log(params)
//   try {
//     const { token } = await params;
//     console.log(token);
//     const user = await User.findOne({
//       verifyToken: token,
//       verifyTokenExpiration: { $gt: Date.now() },
//     });
//     if (!user) return NextResponse.redirect(new URL('/login',process.env.NEXTAUTH_URL));
//     user.isVerified = true;
//     user.verifyToken = undefined;
//     user.verifyTokenExpiration = undefined;
//     await User.save();

//    return NextResponse.redirect(new URL('/login',process.env.NEXTAUTH_URL));
//   } catch (error) {
//     return  NextResponse.redirect(new URL('/error',process.env.NEXTAUTH_URL));
//   }
// }

import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// http://localhost:3000/api/verification/verify-email/token?token=$2a$10$.A.WO.C4QNGW8z1kxwzV/uZNXviyq1N8tEUGXJQ/WsvE.Dk5BSXe2
export async function GET(request, { params }) {
  await connect();
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    console.log(token);
    // const { token } = await params;
    //     console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiration: { $gt: Date.now() },
    });
    if (!user) return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL));
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiration = undefined;
    // console.log(user)
    const saved = await user.save();
    console.log(saved)
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL));
  } catch (error) {
    return NextResponse.redirect(new URL("/error", process.env.NEXTAUTH_URL));
  }
}
