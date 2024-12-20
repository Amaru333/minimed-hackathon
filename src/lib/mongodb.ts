import mongoose, { Connection, ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Extend the globalThis type to include the mongoose cache
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
      };
    }
  }
}

// Cast `global` to `NodeJS.Global` to access the `mongoose` property
const cached =
  (global as unknown as NodeJS.Global).mongoose ||
  ((global as unknown as NodeJS.Global).mongoose = { conn: null, promise: null });

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
