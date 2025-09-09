const { User, Expense, Budget } = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  const pass = await bcrypt.hash('password123', 10);
  const user = await User.create({ name: 'Alice Doe', email: 'alice@example.com', password: pass });

  await Expense.bulkCreate([
    { userId: user.id, date: '2025-08-01', description: 'Walmart groceries', amount: 45.20, category: 'Food' },
    { userId: user.id, date: '2025-08-05', description: 'Uber ride', amount: 12.50, category: 'Travel' },
    { userId: user.id, date: '2025-08-10', description: 'Netflix subscription', amount: 9.99, category: 'Other', isRecurring: true }
  ]);

  await Budget.create({ userId: user.id, month: 8, year: 2025, amount: 300.00 });

  console.log('Seed finished');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
