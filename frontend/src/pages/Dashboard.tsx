import { DollarSign, TrendingUp, CreditCard, AlertTriangle } from "lucide-react";
import { StatCard } from "../components/ui/stat-card";
import { ExpensePieChart } from "../components/charts/ExpensePiechart";
import { SpendingTrendChart } from "../components/charts/SpendingTrenChart";
import { dummyExpenses, categorySpending } from "../data/dummyData";

export const Dashboard = () => {
  // Calculate summary stats
  const currentMonthExpenses = dummyExpenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const currentMonthIncome = dummyExpenses
    .filter(expense => expense.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const remainingBudget = currentMonthIncome - currentMonthExpenses;
  const topCategory = categorySpending[0];

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
          value={topCategory.name}
          change={`$${topCategory.value.toLocaleString()} spent`}
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
            {dummyExpenses.slice(0, 5).map((expense) => (
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
                  {expense.type === 'income' ? '+' : '-'}${expense.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};