import mongoose from 'mongoose';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // User's name
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Trim whitespace from the name
  },
  // User's email
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
    lowercase: true, // Convert email to lowercase
    trim: true, // Trim whitespace from the email
  },
  // User's password
  password: {
    type: String,
    required: true, // Password is required
  },
  // User's role (e.g., team, admin)
  role: {
    type: String,
    default: 'team', // Default role is 'team'
  },
  // Timestamp for when the user was created
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
  // Timestamp for when the user was last updated
  updatedAt: {
    type: Date,
    default: Date.now, // Default to the current date and time
  },
  // Flag to indicate if the user is deleted
  is_deleted: {
    type: Boolean,
    default: false, // Default to not deleted
  },
  // Flag to indicate if the user is active
  is_active: {
    type: Boolean,
    default: true, // Default to active
  }
});

// Create the User model if it doesn't already exist
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;