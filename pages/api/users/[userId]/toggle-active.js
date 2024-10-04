import { getSession } from 'next-auth/react';
import { MongoClient, ObjectId } from 'mongodb';

// API route handler to toggle the active status of a user
export default async function handler(req, res) {
  // Get the current session
  const session = await getSession({ req });
  const { userId } = req.query;

  // Only allow PATCH requests
  if (req.method !== 'PATCH') {
    res.status(405).json({ message: 'Method not allowed: Only PATCH requests are allowed.' });
    return;
  }

  let client;
  try {
    // Connect to MongoDB
    client = await MongoClient.connect(process.env.MONGODB_URI);
  } catch (error) {
    // Handle database connection failure
    res.status(500).json({ message: 'Database connection failed.' });
    return;
  }

  const db = client.db();

  try {
    // Find the user by ID
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    console.log(user, "user toggle active");

    // If user is not found, return a 404 error
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Update the user's active status
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { is_active: req.body.isActive } }
    );

    // Respond with a success message
    res.status(200).json({ message: 'User active status updated.' });
  } catch (error) {
    // Handle any errors that occur during the update
    res.status(500).json({ message: 'Failed to update user active status.' });
  } finally {
    // Close the database connection
    client.close();
  }
}