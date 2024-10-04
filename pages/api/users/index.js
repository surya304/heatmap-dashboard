import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

// API route handler to fetch all users
export default async function handler(req, res) {
  // Get the current session
  const session = await getSession({ req });

 
  // // Check if the user is authenticated and has the 'owner' role
  // if (!session || session.user.role !== 'owner') {
  //   // If not, respond with a 403 Forbidden status
  //   res.status(403).json({ message: 'Forbidden' });
  //   return;
  // }

  // Connect to MongoDB using the URI from environment variables
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  // Fetch all users from the 'users' collection
  const users = await db.collection('users').find().toArray();

  // Respond with the list of users
  res.status(200).json({ users });

  // Close the database connection
  client.close();
}