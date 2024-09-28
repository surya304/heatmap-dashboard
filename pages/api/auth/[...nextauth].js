import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import { compare } from 'bcryptjs';
import User from '../../../models/User'; // Adjust the path as necessary

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default NextAuth({
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Find user by email
        const user = await User.findOne({ email: credentials.email });
        

        if (!user) {
          throw new Error('No user found with this email');
        }

    // Check if the user is active
    if (!user.is_active) {
      throw new Error('Please wait until your admin grants you login privilege');
    }

        // Check if the password is valid
        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // Return user object
        return { email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
});
