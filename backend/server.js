require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/error.middleware');
const { sequelize } = require('./models'); // Sequelize models
const routes = require('./routes'); // Import your routes

// Middleware to parse JSON
app.use(express.json());

// Register your routes
app.use('/api', routes);

// Root route for quick check
app.get('/', (req, res) => {
  res.send('Smart Expense Tracker API running');
});

// 404 handler (must be after all routes)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
 
// Global error handler
app.use(errorHandler);

// Port from environment or default
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Sync Sequelize models and start server
// sequelize
//   .sync({ alter: true }) // change to { force: true } only if you want to drop tables
//   .then(() => {
//     console.log('Database synced successfully');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Unable to connect to database:', err);
//   });
