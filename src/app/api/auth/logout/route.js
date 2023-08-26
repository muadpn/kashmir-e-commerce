// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const response = NextResponse.json({
//       message: "Logout Sucessfull",
//       sucess: true,
//     });

//     response.cookies.set('ACCESS_TOKEN',"",{
//         httpOnly: true,
//         expires: new Date(0)
//     })
//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
