// import  connect  from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/models/userModel";

// await connect();
// // http://localhost:3000/api/verification/verify-email?%242a%2410%24.A.WO.C4QNGW8z1kxwzV%2FuZNXviyq1N8tEUGXJQ%2FWsvE.Dk5BSXe2=
// export async function GET(request, {params}) {
//     try {
//       const { searchParams } = new URL(request.url)
//       const id = searchParams.get('id')
//     // const reqBody = await request.json();
//     // console.log(reqBody)
//     // const {token} = reqBody
//     // console.log(token); 
//     // return NextResponse.redirect(new URL('/login',process.env.NEXTAUTH_URL));
//     return NextResponse.json({ request }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
