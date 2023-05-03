import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/UserSchema";
const { decrypt } = require('../../../utils/crypto');
import bcrypt from "bcrypt";

const events = {
  error: async (message, object) => {
    console.error("NextAuth error:", message, object);
  },
};

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function validateUser(username, password) {
  const user = await User.findOne({ username });

  if (user && (await comparePasswords(password, user.password))) {
    // Decrypt the API key before returning the user object
    return user;
  }

  return null;
}

const clientPromise = (async () => {
  const connection = await dbConnect();
  while (!connection?.s?.client) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return connection.s.client;
})();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await validateUser(
          credentials.username,
          credentials.password
        );

        if (user) {
          const formattedUser = {
            id: user._id.toString(),
            username: user.username,
            apiKey: user.apiKey,
          };
          return Promise.resolve(formattedUser);
        } else {
          return Promise.reject(new Error("Invalid username or password."));
        }
      },
    }),
  ],
  events,
  errors: {
    async session() {
      return new Error("An error occurred while retrieving the session.");
    },
    async jwt() {
      return new Error("An error occurred while handling JWT.");
    },
  },
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async jwt({ token, trigger, user, session }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
          apiKey: user.apiKey,
        };
      }
      if (trigger === "update" && session.apiKey) {
        token.user.apiKey = session.apiKey;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  pages: {
    error: "/auth/error",
  },
};
export default NextAuth(authOptions);

export { authOptions };
