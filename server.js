const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const catRoutes = require('./controller/catRoutes');

const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve images from the images folder
app.use('/images', express.static('images'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://shariqsaleem06:UrV1I9fkbzVQsQ8m@cluster0.hmdoch7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// Use routes
app.use('/api', catRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
