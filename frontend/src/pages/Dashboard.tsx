import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, CreditCard, AlertTriangle } from "lucide-react";
import { StatCard } from "../components/ui/stat-card";
import { ExpensePieChart } from "../components/charts/ExpensePiechart";
import { SpendingTrendChart } from "../components/charts/SpendingTrenChart";
import { api } from "../services/api";

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await api.getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Calculate summary stats
  const currentMonthExpenses = expenses
    .filter((expense: any) => expense.type === 'expense')
    .reduce((sum: number, expense: any) => sum + parseFloat(String(expense.amount)), 0);

  const currentMonthIncome = expenses
    .filter((expense: any) => expense.type === 'income')
    .reduce((sum: number, expense: any) => sum + parseFloat(String(expense.amount)), 0);

  const remainingBudget = currentMonthIncome - currentMonthExpenses;
  
  // Calculate category spending
  const categorySpending = expenses
    .filter((expense: any) => expense.type === 'expense')
    .reduce((acc: any, expense: any) => {
      const category = expense.category || 'Other';
      acc[category] = (acc[category] || 0) + parseFloat(String(expense.amount));
      return acc;
    }, {});
  
  const topCategory = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)[0] || ['No expenses', 0];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview for January 2024.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Spent"
          value={`$${currentMonthExpenses.toLocaleString()}`}
          change="+12% from last month"
          changeType="negative"
          icon={DollarSign}
          variant="default"
        />
        <StatCard
          title="Remaining Budget"
          value={`$${remainingBudget.toLocaleString()}`}
          change="68% of monthly budget"
          changeType="positive"
          icon={TrendingUp}
          variant="success"
        />
        <StatCard
          title="Top Category"
          value={topCategory[0]}
          change={`$${topCategory[1].toLocaleString()} spent`}
          changeType="neutral"
          icon={CreditCard}
          variant="default"
        />
        <StatCard
          title="Budget Alerts"
          value="2 Active"
          change="Food & Entertainment"
          changeType="negative"
          icon={AlertTriangle}
          variant="warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ExpensePieChart />
        <SpendingTrendChart />
      </div>

      {/* Recent Transactions */}
      <div className="rounded-lg border card-gradient p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
              >
                <div className="space-y-1">
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {expense.category} • {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`font-semibold ${
                  expense.type === 'income' 
                    ? 'text-success' 
                    : 'text-foreground'
                }`}>
                  {expense.type === 'income' ? '+' : '-'}${parseFloat(expense.amount).toLocaleString()}
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No transactions yet. Add your first expense!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};