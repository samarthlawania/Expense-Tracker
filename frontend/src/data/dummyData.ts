export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'expense' | 'income';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface BudgetAlert {
  id: string;
  category: string;
  percentage: number;
  message: string;
  type: 'warning' | 'danger' | 'info';
}

export interface AIInsight {
  id: string;
  title: string;
  message: string;
  type: 'tip' | 'alert' | 'achievement';
  date: string;
}

// Dummy user data
export const currentUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: 'SJ'
};

// Dummy expenses data
export const dummyExpenses: Expense[] = [
  { id: '1', date: '2024-01-15', amount: 85.50, category: 'Food & Dining', description: 'Dinner at Italian restaurant', type: 'expense' },
  { id: '2', date: '2024-01-14', amount: 12.99, category: 'Entertainment', description: 'Netflix subscription', type: 'expense' },
  { id: '3', date: '2024-01-13', amount: 45.20, category: 'Transportation', description: 'Gas station', type: 'expense' },
  { id: '4', date: '2024-01-12', amount: 3200.00, category: 'Income', description: 'Salary deposit', type: 'income' },
  { id: '5', date: '2024-01-11', amount: 156.78, category: 'Shopping', description: 'Grocery shopping', type: 'expense' },
  { id: '6', date: '2024-01-10', amount: 29.99, category: 'Health & Fitness', description: 'Gym membership', type: 'expense' },
  { id: '7', date: '2024-01-09', amount: 75.00, category: 'Food & Dining', description: 'Weekend brunch', type: 'expense' },
  { id: '8', date: '2024-01-08', amount: 15.50, category: 'Transportation', description: 'Uber ride', type: 'expense' },
  { id: '9', date: '2024-01-07', amount: 234.67, category: 'Bills & Utilities', description: 'Electric bill', type: 'expense' },
  { id: '10', date: '2024-01-06', amount: 89.00, category: 'Shopping', description: 'Amazon order', type: 'expense' }
];

// Budget alerts
export const budgetAlerts: BudgetAlert[] = [
  { id: '1', category: 'Food & Dining', percentage: 85, message: 'You\'ve spent 85% of your dining budget this month', type: 'warning' },
  { id: '2', category: 'Entertainment', percentage: 95, message: 'You\'ve almost reached your entertainment budget limit', type: 'danger' },
];

// AI insights
export const aiInsights: AIInsight[] = [
  {
    id: '1',
    title: 'Spending Pattern Alert',
    message: 'You\'ve spent 23% more on food & dining this month compared to last month. Consider meal planning to reduce costs.',
    type: 'tip',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Savings Opportunity',
    message: 'Based on your spending patterns, you could save $150/month by cooking at home 3 more times per week.',
    type: 'tip',
    date: '2024-01-14'
  },
  {
    id: '3',
    title: 'Budget Achievement',
    message: 'Congratulations! You stayed within your transportation budget for the third month in a row.',
    type: 'achievement',
    date: '2024-01-13'
  }
];

// Categories
export const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Health & Fitness',
  'Travel',
  'Education',
  'Income',
  'Other'
];

// Monthly spending by category (for pie chart)
export const categorySpending = [
  { name: 'Food & Dining', value: 485.50, color: 'hsl(158, 64%, 52%)' },
  { name: 'Transportation', value: 180.70, color: 'hsl(142, 76%, 36%)' },
  { name: 'Shopping', value: 245.78, color: 'hsl(45, 93%, 58%)' },
  { name: 'Entertainment', value: 125.99, color: 'hsl(220, 14%, 96%)' },
  { name: 'Bills & Utilities', value: 334.67, color: 'hsl(215, 25%, 17%)' },
  { name: 'Health & Fitness', value: 89.99, color: 'hsl(158, 64%, 70%)' }
];

// Monthly spending trends (for line chart)
export const monthlyTrends = [
  { month: 'Jul', amount: 2450 },
  { month: 'Aug', amount: 2120 },
  { month: 'Sep', amount: 2580 },
  { month: 'Oct', amount: 2340 },
  { month: 'Nov', amount: 2890 },
  { month: 'Dec', amount: 2650 },
  { month: 'Jan', amount: 1462 }
];