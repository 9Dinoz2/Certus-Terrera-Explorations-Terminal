npm init -y
npm install express mongoose
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your MongoDB Atlas connection string
mongoose.connect('mongodb+srv://9Dinoz:Jurass1cPark.@usernamesandpasswords.aelhn.mongodb.net/?retryWrites=true&w=majority&appName=UsernamesandPasswords', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

// Create account route
app.post('/createAccount', (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err) => {
    if (err) {
      res.status(500).send('Error creating account');
    } else {
      res.send('Account created successfully');
    }
  });
});

// Login route
app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
    if (err || !user) {
      res.status(401).send('Invalid credentials');
    } else {
      res.send('Login successful');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
