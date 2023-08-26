// import mongoose from "mongoose";

// export async function connect() {
//   try {
//     mongoose.connect(process.env.MONGODB_URL);
//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully");

//     });

//     connection.on("error", (err) => {
//       console.log("MongoDB connection error: " + err);
//       process.exit();
//     });
//   } catch (err) {
//     console.log("something went wrong during connect to mongoDb");
//     console.log("from dbConfig", err);
//     process.exit();
//   }
// }
// /lib/dbConnect.js
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
import mongoose from "mongoose";

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default  async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true,
    };

    cached.promise = await mongoose
      .connect(MONGODB_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// export default connect

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
