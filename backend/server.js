const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


connectDB();

const app = express();


app.get('/', (req, res) => {
  res.send('✅ Server is up and running! Connected to MongoDB.');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
