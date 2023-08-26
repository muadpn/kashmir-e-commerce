import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { EmailValidator, UsernameValidator } from "@/validations/SignUpValidations";
import jwt from "jsonwebtoken";
import connect from "@/dbConfig/dbConfig";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/dbConfig/dbAdapterConfig";
// import OAuth from "@/models/OauthModel";
// import { data } from "autoprefixer";
await connect();
const options = {
  providers: [
    GoogleProvider({
      clientId: process?.env.GOOGLE_ID,
      clientSecret: process?.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        
        if ((!credentials.Email, !credentials.Password)) {
          throw new Error("Please provide a username and password");
        }
        const { Email, Password } = credentials;
        //check for valid credentials
        const passwordRegix =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%,*#?&])[A-Za-z\d@$!%*#?,&]{8,}$/;

        //Checking for Password
        if (!Password.match(passwordRegix)) {
          throw new Error("Not a valid Password");
        }
        if (EmailValidator(Email) !== true) {
          throw new Error("Not a valid Username");
        }
        
        const isUserExist = await User.findOne({ email: Email });

        if(!isUserExist.isVerified) throw new Error("Please Verify the Email Address");
        
        // User Do not Exists Entirly
        // User Does Not Have a Password (Means Google authenticated)
        // return Error
        // else return True

        if (!isUserExist || !isUserExist?.hashedPassword) {
          throw new Error("User does not exists");
        }
        //Checking if Password is Correct
        const isPasswordCorrect = await bcryptjs.compare(
          Password,
          isUserExist.hashedPassword
        );

        if (!isPasswordCorrect) {
          throw new Error("Username or password is incorrect");
        }

        // console.log("authorize Returned");
        const user = {
          id: isUserExist._id.toString(),
          name: isUserExist.username,
          email: isUserExist.email,
          image: isUserExist?.image,
          role: isUserExist.isAdmin ? "admin" : "user" 
        };
        
        return user;
      },
    }),
  ],

  callbacks: {
    
    async signIn({ account, profile, user, credentials }) {

      try {
        // console.log(profile.picture);
        const UserData = await User.findOne({ email: user.email });
          if(account.provider !=='google' && !UserData.isVerified) {
            return '/login?Message=Please Verify your account And try Again'
          }


        if (account.provider === "google") {
          
          if(!profile.email_verified)  return '/login?Message=Please Verify your account And try Again'
          if (UserData) {
            await User.findByIdAndUpdate(
              {
                _id: UserData._id,
              },
              {
                $set: {
                  isVerified: profile.email_verified,
                  image:profile.picture,
                  verifyToken: undefined,
                  verifyTokenExpiration: undefined,
                  oauthProviders: {
                    provider: account.provider,
                    providerId: account.providerAccountId,
                    Tokens: {
                      accessToken: account.access_token,
                      refreshToken: account.id_token,
                    },
                  },
                },
              }
            );
          }
          if (!UserData) {
            // console.log(
            //   "User doesnt Exist, Here is the google Account:",
            //   account
            // );
            //add random Number to the Username
            const randomNumber = Math.random().toString().slice(2, 6);
            const profileName = profile.name.replace(" ", "") + randomNumber;
            const NewUser = new User({
              username: profileName,
              email: profile.email,
              image: profile.picture,
              oauthProviders: {
                provider: account.provider,
                providerId: account.providerAccountId,
                Tokens: {
                  accessToken: account.access_token,
                  refreshToken: account.id_token,
                },
              },
              isverified: profile.email_verified,
            });
            await NewUser.save();
          }
        }
        return true;
      } catch (err) {
        return err;
      }
    },
    async jwt({ token, user }) {
      try {
        console.log("this is jwt Callback");
        const dbUser = await User.findOne({ email: token.email });
        // console.log("dbUser from jwt callBack :", dbUser);
        const {
          oauthProviders,
          hashedPassword,
          refreshToken,
          forgotPasswordToken,
          forgotPasswordTokenExpiration,
          verifyToken,
          verifyTokenExpiration,
          ...other
        } = dbUser?._doc;
        token = {
          ...token,
          id: other._id,
          name: other.username,
          email: other.email,
          picture: other.image,
          role: other.isAdmin ? "admin" : "user",
        };
        return token;
      } catch (error) {
        console.log(error);
      }
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token?.role,
      };
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
    Error: "/",
  },
};

export default options;
