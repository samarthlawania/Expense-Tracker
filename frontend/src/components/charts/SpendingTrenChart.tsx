import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { api } from "../../services/api";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const SpendingTrendChart = () => {
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await api.getExpenses();
        const monthlyData = expenses
          .filter((expense: any) => expense.type === 'expense')
          .reduce((acc: any, expense: any) => {
            const date = new Date(expense.date);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
            acc[monthKey] = (acc[monthKey] || 0) + parseFloat(String(expense.amount));
            return acc;
          }, {});
        
        const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
          month,
          amount: Math.round(amount as number)
        }));
        
        setMonthlyTrends(chartData);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);
  return (
    <Card className="card-gradient fade-in">
      <CardHeader>
        <CardTitle>Monthly Spending Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Loading chart data...
            </div>
          ) : monthlyTrends.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No expense data available
            </div>
          ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(215, 16%, 47%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(215, 16%, 47%)"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(158, 64%, 52%)"
                strokeWidth={3}
                dot={{ fill: "hsl(158, 64%, 52%)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(158, 64%, 52%)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};