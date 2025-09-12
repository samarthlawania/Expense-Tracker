const { User, Expense, Budget, sequelize } = require('../models');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Use force:true to drop existing tables for a fresh seed
    const pass = await bcrypt.hash('password123', 10);
    const user = await User.create({ name: 'Alice Doe', email: 'alice@example.com', password: pass });

    await Expense.bulkCreate([
      { userId: user.id, date: '2025-08-01', description: 'Walmart groceries', amount: 45.20, category: 'Food & Dining', type: 'expense' },
      { userId: user.id, date: '2025-08-05', description: 'Uber ride', amount: 12.50, category: 'Transportation', type: 'expense' },
      { userId: user.id, date: '2025-08-10', description: 'Netflix subscription', amount: 9.99, category: 'Entertainment', isRecurring: true, type: 'expense' },
      { userId: user.id, date: '2025-08-12', amount: 3200.00, category: 'Income', description: 'Salary deposit', type: 'income' },
      { userId: user.id, date: '2025-08-11', amount: 156.78, category: 'Shopping', description: 'Grocery shopping', type: 'expense' },
      { userId: user.id, date: '2025-08-10', amount: 29.99, category: 'Health & Fitness', description: 'Gym membership', type: 'expense' },
      { userId: user.id, date: '2025-08-09', amount: 75.00, category: 'Food & Dining', description: 'Weekend brunch', type: 'expense' },
      { userId: user.id, date: '2025-08-08', amount: 15.50, category: 'Transportation', description: 'Uber ride', type: 'expense' },
      { userId: user.id, date: '2025-08-07', amount: 234.67, category: 'Bills & Utilities', description: 'Electric bill', type: 'expense' },
      { userId: user.id, date: '2025-08-06', amount: 89.00, category: 'Shopping', description: 'Amazon order', type: 'expense' }
    ]);

    await Budget.create({ userId: user.id, month: 8, year: 2025, amount: 300.00 });

    console.log('Seed finished');
    process.exit(0);
  } catch (e) {
    console.error('Seed failed:', e);
    process.exit(1);
  }
}

seed();