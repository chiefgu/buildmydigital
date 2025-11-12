import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Simple in-memory user store - replace with database in production
const users = [
  {
    id: "1",
    email: "admin@buildmydigital.com",
    password: "admin123", // In production, this should be hashed with bcrypt
    name: "Admin User",
  },
  {
    id: "2",
    email: "henry@buildmydigital.com",
    password: "henry123",
    name: "Henry Guest",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          return null;
        }

        // Check password (in production, use bcrypt.compare)
        if (user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
