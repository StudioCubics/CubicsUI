import mongoose from "mongoose";

// Extend globalThis to include mongoose cache
interface MongooseGlobal {
  mongoose?: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

declare const global: MongooseGlobal;

const cached = global.mongoose || { conn: null, promise: null };

export default async function () {
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
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // Store the connection globally

  return cached.conn;
}
