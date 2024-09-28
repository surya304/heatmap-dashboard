import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });

  console.log(session,"session index");
  

  if (!session || session.user.role !== 'owner') {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const users = await db.collection('users').find().toArray();

  res.status(200).json({ users });
  client.close();
}
