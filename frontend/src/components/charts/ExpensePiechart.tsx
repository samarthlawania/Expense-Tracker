import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { api } from "../../services/api";

const COLORS = [
  'hsl(158, 64%, 52%)', // Primary teal
  'hsl(142, 76%, 36%)', // Success green
  'hsl(45, 93%, 58%)',  // Warning yellow
  'hsl(215, 25%, 17%)', // Dark gray
  'hsl(158, 64%, 70%)', // Light teal
  'hsl(220, 14%, 96%)'  // Light gray
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ${data.value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const ExpensePieChart = () => {
  const [categorySpending, setCategorySpending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await api.getExpenses();
        const categoryTotals = expenses
          .filter(expense => expense.type === 'expense')
          .reduce((acc, expense) => {
            const category = expense.category || 'Other';
            acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
            return acc;
          }, {});
        
        const chartData = Object.entries(categoryTotals).map(([name, value], index) => ({
          name,
          value,
          color: COLORS[index % COLORS.length]
        }));
        
        setCategorySpending(chartData);
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
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Loading chart data...
            </div>
          ) : categorySpending.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No expense data available
            </div>
          ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySpending}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categorySpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};