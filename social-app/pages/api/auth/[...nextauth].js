import NextAuth from "next-auth";
import Axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
});
