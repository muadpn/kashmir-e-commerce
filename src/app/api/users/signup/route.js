// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

// connect();

// export async function POST(request) {
//   try {
//     const requestBody = await request.json();
//     const { username, email, password } = requestBody;

//     //check if username already exists
//     const user = await User.findOne({ email });
//     if (user) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     //hash password

//     const salt = await bcryptjs.genSalt(10);
//     const hashPassword = await bcryptjs.hash(password, salt);

//     //create a new user

//     const newUser = new User({
//       username,
//       email,
//       password: hashPassword,
//     });

//     const savedUser = await newUser.save();

//     return NextResponse.json({
//       message: "Created new user successfully",
//       status: 200,
//       Success: true,
//       savedUser,
//     });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
