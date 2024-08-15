const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Import the User model
const authRoutes = require('./routes/auth');
const classroomRoutes = require('./routes/classroom');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors(
  {
    origin : [https://classroom-1-uigw.onrender.com],
    methods : ["POST", "GET"],
    credentials : true
  }
));
app.use(express.json());

// Updated connection code without deprecated options
mongoose.connect('mongodb+srv://jaswanth6365:jaswanth17@classproject.krfwahs.mongodb.net/?retryWrites=true&w=majority&appName=classproject')
  .then(() => {
    console.log('MongoDB connected');
    createPrincipalUser();  // Call the function to create the Principal user
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/classroom', classroomRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to create a Principal user if it doesn't exist
async function createPrincipalUser() {
  try {
    const principalEmail = 'principal@classroom.com';
    const principalPassword = 'Admin';

    // Check if the Principal user already exists
    const existingPrincipal = await User.findOne({ email: principalEmail, role: 'Principal' });
    if (existingPrincipal) {
      console.log('Principal user already exists');
      return;
    }

    // Create the Principal user without hashing (plaintext for simplicity, ensure to hash in production)
    const principalUser = new User({
      email: principalEmail,
      password: principalPassword,  // Store the password as plain text
      role: 'Principal',
    });

    await principalUser.save();
    console.log('Principal user created successfully');
  } catch (error) {
    console.error('Error creating Principal user:', error);
  }
}
