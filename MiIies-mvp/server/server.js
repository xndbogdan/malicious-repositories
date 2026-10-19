const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors())
// Connect Database
// connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/miningserver', require('./routes/api/miningserver'));
app.use('/api/faq', require('./routes/api/faq'));
app.use('/api/password', require('./routes/api/password'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
