import { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../../../models/User.js';

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  // Handle POST requests only
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !email.includes('@') || !password || !name) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    try {
      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.status(422).json({ message: 'User already exists' });
        return;
      }

      // Hash the password before saving it to the database
      const hashedPassword = await hash(password, 12);

      // Create a new user with the provided details
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        is_active: false // New users are inactive by default
      });

      // Save the new user to the database
      await newUser.save();

      // Respond with a success message
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    // Respond with an error if the request method is not POST
    res.status(405).json({ message: 'Method not allowed' });
  }
}