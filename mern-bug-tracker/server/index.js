const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);  // ✅ Route is active

app.use(errorHandler);           // ✅ Custom error handler

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));
