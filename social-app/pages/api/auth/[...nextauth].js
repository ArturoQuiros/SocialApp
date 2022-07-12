import NextAuth from "next-auth";
import Axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({

  providers: [
    CredentialsProvider({
      id: "login",
      name: "Username or Email",
      credentials: {
        username: {
          label: "Username or Email",
          type: "username",
          placeholder: "Username / email@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        //DESCOMENTAR ESTE POST Y COMENTAR LOS 2 GET cuando empiece a usar nuestro API
        // let user = await Axios.post(
        //   'http://localhost:3333/users/login', { email: credentials.username, password: credentials.password }
        // ).then((res) => {
        //   return res.data[0];
        // });

        let user = await Axios.get(
          `https://jsonplaceholder.typicode.com/users?username=${credentials.username}&address.zipcode=${credentials.password}`
        ).then((res) => {
          return res.data[0];
        });
        if(!user){
          user = await Axios.get(
            `https://jsonplaceholder.typicode.com/users?email=${credentials.username}&address.zipcode=${credentials.password}`
          ).then((res) => {
            return res.data[0];
          });
        }

        //console.log(user);
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
