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
  const CUI_DB_URL = process.env.CUI_DB_URL;

  if (!CUI_DB_URL) {
    throw new Error("⛔ Please define the CUI_DB_URL environment variable.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(CUI_DB_URL)
      .then((mongoose) => {
        console.log("🔗 Connected to your MongoDB database.");
        return mongoose.connection;
      })
      .catch((error) => {
        cached.promise = null;
        throw error;
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
