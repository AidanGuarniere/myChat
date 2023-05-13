import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/UserSchema";
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
    return user;
  }

  return null;
}

const clientPromise = (async () => {
  const mongooseInstance = await dbConnect();
  let tries = 0;
  while (!mongooseInstance?.connection?.client && tries < 10) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    tries++;
  }
  return mongooseInstance.connection.client;
})();


const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    // }),
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
    async signIn({ account, profile }) {
      // if (account.provider === "google") {
      //   return profile.email_verified;
      // }
      return true;
    },
    async jwt({ token, trigger, user, session }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
        };
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
