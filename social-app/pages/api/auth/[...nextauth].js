import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',      
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const endpoint = `https://jsonplaceholder.typicode.com/users?email=${credentials.email}&address.zipcode=${credentials.password}` 
        console.log(endpoint)
        //non working
        axios.get(endpoint).then( res => {
        const data = res.data;  
        });

        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ]  
})