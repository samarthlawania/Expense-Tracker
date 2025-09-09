const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');
const insightRoutes = require('./routes/insights');
const alertRoutes = require('./routes/alerts');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/budget', budgetRoutes);
app.use('/insights', insightRoutes);
app.use('/alerts', alertRoutes);

app.use(errorMiddleware);

module.exports = app;
