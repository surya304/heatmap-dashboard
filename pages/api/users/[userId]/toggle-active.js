import { getSession } from 'next-auth/react';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { userId } = req.query;

  if (req.method !== 'PATCH') {
    res.status(405).json({ message: 'Method not allowed: Only PATCH requests are allowed.' });
    return;
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed.' });
    return;
  }

  const db = client.db();

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
console.log(user,"user toggle active");

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { is_active: req.body.isActive } }
    );

    res.status(200).json({ message: 'User active status updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user active status.' });
  } finally {
    client.close();
  }
}