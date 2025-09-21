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
    origin: [ 'http://localhost:3000', 'https://expense-tracker-gamma-coral.vercel.app' ],
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

// For Vercel deployment

  const PORT = process.env.PORT || 3000;
  
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection established successfully.');
      return sequelize.sync();  
    })
    .then(() => {
      console.log('Database synced successfully');
      // app.listen(PORT, () => {
      //   console.log(`Server running on port ${PORT}`);
      //   console.log(`Environment: ${process.env.NODE_ENV}`);
      // });
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
      process.exit(1);
    });