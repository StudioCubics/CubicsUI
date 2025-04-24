import mongoose from "mongoose";
/* eslint-disable no-var */
declare global {
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

const cached = global.mongoose || { conn: null, promise: null };

/**
 * Connect to MongoDB with caching to support serverless environments.
 */
export async function connectDB(): Promise<mongoose.Connection> {
  const CUI_DB_URI =
    process.env.CUI_DB_URI || "mongodb://localhost:27017/cubicsui";

  if (!CUI_DB_URI) {
    throw new Error("Please define the CUI_DB_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(CUI_DB_URI)
      .then((mongoose) => mongoose.connection)
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;

  return cached.conn;
}

/**
 * Disconnect from MongoDB and clear the global cache.
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    global.mongoose = cached;
  }
}
