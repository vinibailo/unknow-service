import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { users } from "./db";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Email({
      sendVerificationRequest({ identifier, url }) {
        console.log("Login link", identifier, url);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id || user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        const record = users.get(token.sub) || { plan: "FREE", usage: 0 };
        session.user.id = token.sub;
        session.user.plan = record.plan;
        session.user.usage = record.usage;
      }
      return session;
    },
  },
});
