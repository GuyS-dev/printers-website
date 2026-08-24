
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Store drivers in memory (replace this with your actual print server integration)
let drivers = [
  'Microsoft Print To PDF',
  'Microsoft XPS Document Writer v4',
  'Microsoft enhanced Point and Print compatibility driver',
];

// Get all drivers
app.get('/get-drivers', (req, res) => {
  try {
    // Here you would typically query your actual print server
    // For now, we'll return the in-memory array
    res.json({ drivers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// Add a new driver
app.post('/add-driver', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Driver name is required' });
    }

    // Here you would typically add the driver to your actual print server
    // For now, we'll add it to our in-memory array
    if (!drivers.includes(name)) {
      drivers.push(name);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add driver' });
  }
});

// Submit printer form
app.post('/submit-form', (req, res) => {
  try {
    const { name, driver, ip } = req.body;
    if (!name || !driver || !ip) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Here you would typically add the printer to your actual print server
    // For now, we'll just return success
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add printer' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
