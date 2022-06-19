import NextAuth from "next-auth";
import Axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "username-login",
      name: "Username",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "Bret",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await Axios.get(
          `https://jsonplaceholder.typicode.com/users?username=${credentials.username}&address.zipcode=${credentials.password}`
        ).then((res) => {
          return res.data[0];
        });
        return user ? user : null;
      },
    }),
    CredentialsProvider({
      id: "email-login",
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await Axios.get(
          `https://jsonplaceholder.typicode.com/users?email=${credentials.email}&address.zipcode=${credentials.password}`
        ).then((res) => {
          return res.data[0];
        });
        return user ? user : null;
      },
    }),
    
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#0284c7", // Hex color code
    logo: "/resources/logobig.svg" // Absolute URL to image
  }
});
