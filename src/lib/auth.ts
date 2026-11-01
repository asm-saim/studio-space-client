import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI in .env.local");

// One client across hot reloads in dev.
const globalForMongo = globalThis as unknown as { _authMongoClient?: MongoClient };
const client = globalForMongo._authMongoClient ?? (globalForMongo._authMongoClient = new MongoClient(uri));

export const auth = betterAuth({
  // Uses the database named in MONGODB_URI. Point it at the same DB as the Express server.
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // after registering, send the user to /login
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()], // keep last
});