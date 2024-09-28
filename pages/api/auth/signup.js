import { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../../../models/User.js';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!email || !email.includes('@') || !password || !name) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(422).json({ message: 'User already exists' });
        return;
      }

      const hashedPassword = await hash(password, 12);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        is_active:false
      });

      await newUser.save();

      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}