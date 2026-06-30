import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * NextAuth v5 конфигурация.
 *
 * Credentials provider + JWT session (без PrismaAdapter).
 * PrismaAdapter е за OAuth providers и създава конфликт с Credentials
 * при JWT session — причинява "Server error" при login.
 * Тук зареждаме потребителя директно от базата в authorize().
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/portal/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Добавяне на role в JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "CLIENT";
        token.id = user.id;
      }
      return token;
    },
    // Добавяне на role + id в сесията
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
    // Защита на /admin routes
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as { role?: string })?.role === "ADMIN";
      const path = nextUrl.pathname;
      // Админ зона — само за ADMIN
      if (path.startsWith("/admin")) {
        return isAdmin;
      }
      // Защитени клиентски routes
      if (
        path.startsWith("/portal/dashboard") ||
        path.startsWith("/portal/tickets/new")
      ) {
        return isLoggedIn;
      }
      return true;
    },
  },
});
