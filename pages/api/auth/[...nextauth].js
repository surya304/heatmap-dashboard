import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import { compare } from 'bcryptjs';
import User from '../../../models/User'; // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default NextAuth({
  // Use JSON Web Tokens for session management
  session: {
    jwt: true,
  },
  // Custom sign-in page
  pages: {
    signIn: '/login',
  },
  // Define authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Find user by email
        const user = await User.findOne({ email: credentials.email });

        // If no user is found, throw an error
        if (!user) {
          throw new Error('No user found with this email');
        }

        // Check if the user is active
        if (!user.is_active) {
          throw new Error('Please wait until your admin grants you login privilege');
        }

        // Check if the password is valid
        const isValid = await compare(credentials.password, user.password);

        // If the password is incorrect, throw an error
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // Return user object if authentication is successful
        return { email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  // Define callbacks for session and JWT
  callbacks: {
    // Add user role to session object
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    // Add user role to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});