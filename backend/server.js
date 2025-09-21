require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.middleware');
const routes = require('./routes');
const { sequelize } = require('./models');

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://expense-tracker-prly-fmbu2pc9s.vercel.app",
    ],
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Register routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Smart Expense Tracker API running', status: 'OK' });
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Start server first to satisfy Render port requirements
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Initialize database connection in background
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    console.log('Server running without database connection');
    // Set a flag to indicate database is unavailable
    global.dbAvailable = false;
  });

module.exports = app;