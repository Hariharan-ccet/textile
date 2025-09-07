const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file

const Challan = require('./challan.model');

// --- Pre-startup Check ---
// Ensure the database connection string is available before starting the server.
if (!process.env.MONGO_URI) {
  console.error("\nFATAL ERROR: MONGO_URI is not defined.");
  console.error("Please create a '.env' file in the '/server' directory and add your MongoDB connection string.");
  console.error("Example: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/yourDB\n");
  process.exit(1); // Exit the process with an error code
}

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for your frontend
app.use(cors()); 
// Enable the express server to parse JSON bodies in requests
app.use(express.json());

// --- Test Route ---
// Add a root route to easily check if the server is running
app.get('/', (req, res) => {
  res.send('<h1>Challan Backend is Running</h1><p>API endpoints are available at /api/challans</p>');
});


// --- API Routes ---

// GET: Fetch all challans
app.get('/api/challans', async (req, res) => {
  try {
    // Find all challans and sort them by creation date (newest first)
    const challans = await Challan.find().sort({ createdAt: -1 });
    res.json(challans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching challans: ' + err.message });
  }
});

// POST: Create a new challan
app.post('/api/challans', async (req, res) => {
  // Create a new Challan document from the request body
  const challan = new Challan(req.body);
  try {
    const newChallan = await challan.save();
    res.status(201).json(newChallan); // Respond with the newly created challan
  } catch (err) {
    res.status(400).json({ message: 'Error creating challan: ' + err.message });
  }
});

// DELETE: Delete a challan by its ID
app.delete('/api/challans/:id', async (req, res) => {
  try {
    const challan = await Challan.findByIdAndDelete(req.params.id);
    if (!challan) {
        return res.status(404).json({ message: 'Challan not found' });
    }
    res.json({ message: 'Successfully deleted challan' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting challan: ' + err.message });
  }
});


// --- Database Connection and Server Start ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });